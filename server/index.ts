import express, { type Request, type Response } from 'express'
import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'

const PORT = Number(process.env.PORT || 4317)
const DATA_DIR = path.resolve(process.env.FOLIO_DATA_DIR || './data')
fs.mkdirSync(DATA_DIR, { recursive: true })
const db = new Database(path.join(DATA_DIR, 'folio.sqlite'))
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')
db.exec(`
  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT, symbol TEXT NOT NULL, name TEXT NOT NULL,
    market TEXT NOT NULL CHECK(market IN ('JP','US')), currency TEXT NOT NULL CHECK(currency IN ('JPY','USD')),
    side TEXT NOT NULL CHECK(side IN ('BUY','SELL')), trade_date TEXT NOT NULL,
    quantity REAL NOT NULL CHECK(quantity > 0), price REAL NOT NULL CHECK(price >= 0),
    fee REAL NOT NULL DEFAULT 0 CHECK(fee >= 0), target_price REAL,
    asset_type TEXT NOT NULL DEFAULT 'STOCK', entry_type TEXT NOT NULL DEFAULT 'TRADE', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS quotes (symbol TEXT NOT NULL, currency TEXT NOT NULL, price REAL NOT NULL, change_pct REAL, fetched_at TEXT NOT NULL, source TEXT NOT NULL, PRIMARY KEY(symbol,currency));
  CREATE TABLE IF NOT EXISTS snapshots (day TEXT PRIMARY KEY, value_jpy REAL NOT NULL, recorded_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS api_usage (day TEXT PRIMARY KEY, requests INTEGER NOT NULL DEFAULT 0);
`)
const tradeColumns = db.pragma('table_info(trades)') as {name:string}[]
if (!tradeColumns.some(column=>column.name==='asset_type')) db.exec("ALTER TABLE trades ADD COLUMN asset_type TEXT NOT NULL DEFAULT 'STOCK'")
if (!tradeColumns.some(column=>column.name==='entry_type')) db.exec("ALTER TABLE trades ADD COLUMN entry_type TEXT NOT NULL DEFAULT 'TRADE'")

const app = express()
app.use((req,res,next)=>{
  const host=req.headers.host||''
  if (!['127.0.0.1','localhost'].some(name=>host===`${name}:${PORT}`)) return res.status(403).json({error:'ローカルからのみ利用できます'})
  next()
})
app.use(express.json({ limit: '5mb' }))
const dbError = (res: Response, error: unknown) => res.status(400).json({ error: error instanceof Error ? error.message : '入力を確認してください' })
const allTrades = () => db.prepare('SELECT * FROM trades ORDER BY trade_date DESC, id DESC').all() as Trade[]
type AssetType = 'STOCK'|'FUND'|'CASH'
type Trade = { id: number; symbol: string; name: string; market: 'JP'|'US'; currency: 'JPY'|'USD'; side: 'BUY'|'SELL'; trade_date: string; quantity: number; price: number; fee: number; target_price: number|null; asset_type: AssetType; entry_type:'TRADE'|'OPENING' }

function positions() {
  const grouped = new Map<string, { symbol:string; name:string; market:'JP'|'US'; currency:'JPY'|'USD'; quantity:number; basis:number; target_price:number|null; asset_type:AssetType }>()
  const ordered = (db.prepare('SELECT * FROM trades ORDER BY trade_date ASC, id ASC').all() as Trade[])
  for (const t of ordered) {
    const key = `${t.market}:${t.symbol.toUpperCase()}`
    const p = grouped.get(key) ?? { symbol:t.symbol, name:t.name, market:t.market, currency:t.currency, quantity:0, basis:0, target_price:t.target_price, asset_type:t.asset_type||'STOCK' }
    const unitScale=t.asset_type==='FUND'?10000:1
    if (t.side === 'BUY') { p.basis += t.quantity * t.price / unitScale + t.fee; p.quantity += t.quantity }
    else {
      if (t.quantity > p.quantity + 1e-8) throw new Error(`${t.symbol} の売却数量が保有数量を超えています`)
      const avg = p.quantity ? p.basis / p.quantity : 0
      p.basis = Math.max(0, p.basis - avg * t.quantity); p.quantity -= t.quantity
    }
    p.name = t.name || p.name
    if (t.target_price != null) p.target_price = t.target_price
    grouped.set(key, p)
  }
  return [...grouped.values()].filter(p => p.quantity > 1e-8).map(p => ({ ...p, average_cost:p.basis/p.quantity*(p.asset_type==='FUND'?10000:1) }))
}

app.get('/api/health', (_req,res) => res.json({ ok:true }))
app.get('/api/trades', (_req,res) => res.json(allTrades()))
app.post('/api/trades', (req,res) => {
  try {
    const t = validateTrade(req.body)
    const insert = db.prepare('INSERT INTO trades(symbol,name,market,currency,side,trade_date,quantity,price,fee,target_price,asset_type,entry_type) VALUES (@symbol,@name,@market,@currency,@side,@trade_date,@quantity,@price,@fee,@target_price,@asset_type,@entry_type)')
    const tx = db.transaction(() => { insert.run(t); positions() })
    tx()
    res.status(201).json(allTrades())
  } catch(e) { dbError(res,e) }
})
app.post('/api/trades/import', (req,res) => {
  try {
    if (!Array.isArray(req.body?.trades) || req.body.trades.length>1000) throw new Error('CSVの取引データを確認してください（最大1,000件）')
    const raw=req.body.trades as any[]
    const rows=raw.map(validateTrade)
    const insert=db.prepare('INSERT INTO trades(symbol,name,market,currency,side,trade_date,quantity,price,fee,target_price,asset_type,entry_type) VALUES (@symbol,@name,@market,@currency,@side,@trade_date,@quantity,@price,@fee,@target_price,@asset_type,@entry_type)')
    const putQuote=db.prepare('INSERT INTO quotes(symbol,currency,price,change_pct,fetched_at,source) VALUES(?,?,?,NULL,?,?) ON CONFLICT(symbol,currency) DO UPDATE SET price=excluded.price,change_pct=NULL,fetched_at=excluded.fetched_at,source=excluded.source')
    const tx=db.transaction(()=>{ for (let i=0;i<rows.length;i++) {insert.run(rows[i]);const price=Number(raw[i].quote_price);if(Number.isFinite(price)&&price>0)putQuote.run(rows[i].symbol,rows[i].currency,price,String(raw[i].quote_fetched_at||`${rows[i].trade_date}T00:00:00.000Z`),String(raw[i].quote_source||'CSV import · Manual'))} positions(); const openingDay=rows.find(t=>t.entry_type==='OPENING')?.trade_date;recordSnapshot(openingDay) })
    tx(); res.status(201).json(allTrades())
  } catch(e) { dbError(res,e) }
})
app.put('/api/trades/:id', (req,res) => {
  try {
    const id = Number(req.params.id); const t = validateTrade(req.body)
    const tx = db.transaction(() => { db.prepare('UPDATE trades SET symbol=@symbol,name=@name,market=@market,currency=@currency,side=@side,trade_date=@trade_date,quantity=@quantity,price=@price,fee=@fee,target_price=@target_price,asset_type=@asset_type,entry_type=@entry_type WHERE id=@id').run({ ...t,id }); if (!(db.prepare('SELECT changes() n').get() as {n:number}).n) throw new Error('取引が見つかりません'); positions() })
    tx(); res.json(allTrades())
  } catch(e) { dbError(res,e) }
})
app.delete('/api/trades/:id', (req,res) => {
  try { const tx = db.transaction(() => { db.prepare('DELETE FROM trades WHERE id=?').run(Number(req.params.id)); positions() }); tx(); res.json(allTrades()) } catch(e) { dbError(res,e) }
})
function validateTrade(v: any) {
  const asset_type=(v.asset_type||'STOCK') as AssetType
  const entry_type=(v.entry_type||'TRADE') as 'TRADE'|'OPENING'
  const t = { symbol:String(v.symbol||'').trim().toUpperCase(), name:String(v.name||'').trim(), market:v.market, currency:v.currency, side:v.side, trade_date:String(v.trade_date||''), quantity:Number(v.quantity), price:Number(v.price), fee:Number(v.fee||0), target_price:v.target_price === '' || v.target_price == null ? null : Number(v.target_price),asset_type,entry_type }
  if (!t.symbol || !t.name || !['JP','US'].includes(t.market) || !['JPY','USD'].includes(t.currency) || !['BUY','SELL'].includes(t.side) || !['STOCK','FUND','CASH'].includes(asset_type) || !['TRADE','OPENING'].includes(entry_type)) throw new Error('必須項目を入力してください')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trade_date) || !Number.isFinite(t.quantity) || t.quantity <= 0 || !Number.isFinite(t.price) || t.price < 0 || !Number.isFinite(t.fee) || t.fee < 0 || (t.target_price != null && (!Number.isFinite(t.target_price)||t.target_price<=0))) throw new Error('日付・数量・価格を確認してください')
  if ((t.market==='JP' && t.currency!=='JPY') || (t.market==='US' && t.currency!=='USD')) throw new Error('市場と通貨の組み合わせが一致しません')
  if (asset_type!=='STOCK' && (t.market!=='JP'||t.currency!=='JPY')) throw new Error('投資信託・現金は円建て国内商品として登録してください')
  return t
}
app.get('/api/positions', (_req,res) => { try { res.json(positions()) } catch(e) { dbError(res,e) } })
app.get('/api/settings', (_req,res) => res.json({ hasApiKey:!!db.prepare("SELECT value FROM settings WHERE key='av_key'").get(), provider:'Alpha Vantage' }))
app.put('/api/settings', (req,res) => {
  const key = String(req.body.apiKey||'').trim()
  if (key) db.prepare("INSERT INTO settings(key,value) VALUES('av_key',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(key)
  if (req.body.clear === true) db.prepare("DELETE FROM settings WHERE key='av_key'").run()
  res.json({ hasApiKey:!!db.prepare("SELECT value FROM settings WHERE key='av_key'").get() })
})
app.get('/api/quotes', (_req,res) => res.json(db.prepare('SELECT symbol,currency,price,change_pct,fetched_at,source FROM quotes').all()))
function quoteSymbol(symbol:string, market:'JP'|'US') { if(market!=='JP')return symbol;const normalized=symbol.replace(/\.T$/i,'.TSE');return normalized.includes('.')?normalized:`${normalized}.TSE` }
async function avCall(params:Record<string,string>, key:string) {
  const day = new Date().toISOString().slice(0,10)
  const usage = db.prepare('SELECT requests FROM api_usage WHERE day=?').get(day) as {requests:number}|undefined
  if ((usage?.requests ?? 0) >= 25) throw new Error('Alpha Vantageの本日の無料枠（25件）に達しました。保存済み価格を表示します。')
  db.prepare('INSERT INTO api_usage(day,requests) VALUES(?,1) ON CONFLICT(day) DO UPDATE SET requests=requests+1').run(day)
  const url = new URL('https://www.alphavantage.co/query')
  for (const [k,v] of Object.entries(params)) url.searchParams.set(k,v)
  url.searchParams.set('apikey',key)
  const response = await fetch(url)
  if (!response.ok) throw new Error(`価格サービスに接続できません (${response.status})`)
  const body:any = await response.json()
  if (body.Note || body.Information || body['Error Message']) throw new Error(body.Note || body.Information || body['Error Message'])
  return body
}
app.post('/api/quotes/refresh', async (_req,res) => {
  const key = (db.prepare("SELECT value FROM settings WHERE key='av_key'").get() as {value:string}|undefined)?.value
  if (!key) return res.status(400).json({ error:'APIキーを設定してください' })
  const ps = positions(); const results:any[] = []; const errors:string[]=[]
  const candidates=[...ps.filter(p=>p.asset_type==='STOCK').map(p=>({symbol:p.symbol,currency:p.currency,market:p.market})),...['SPY','QQQ','EWJ','VGK'].map(symbol=>({symbol,currency:'USD',market:'US' as const}))]
  for (const p of candidates) {
    const old = db.prepare('SELECT fetched_at FROM quotes WHERE symbol=? AND currency=?').get(p.symbol,p.currency) as {fetched_at:string}|undefined
    if (old && Date.now()-new Date(old.fetched_at).getTime() < 4*60*60*1000) continue
    try {
      const body = await avCall({function:'GLOBAL_QUOTE',symbol:quoteSymbol(p.symbol,p.market)},key)
      const q = body['Global Quote']; const price = Number(q?.['05. price']);
      if (!Number.isFinite(price) || price<=0) throw new Error(`${p.symbol}: 株価が返りませんでした。ティッカー表記を確認してください。`)
      const change = Number(q['10. change percent']?.replace('%',''))
      const fetchedAt = new Date().toISOString()
      db.prepare('INSERT INTO quotes(symbol,currency,price,change_pct,fetched_at,source) VALUES(?,?,?,?,?,?) ON CONFLICT(symbol,currency) DO UPDATE SET price=excluded.price,change_pct=excluded.change_pct,fetched_at=excluded.fetched_at,source=excluded.source').run(p.symbol,p.currency,price,Number.isFinite(change)?change:null,fetchedAt,'Alpha Vantage · GLOBAL_QUOTE')
      results.push({symbol:p.symbol,price,fetched_at:fetchedAt})
    } catch(e) { errors.push(e instanceof Error?e.message:'価格取得エラー') }
  }
  // Refresh a small set of JPY crosses, then cache the result for four hours.
  for (const pair of ['USD/JPY','EUR/JPY','GBP/JPY','AUD/JPY']) {
    const old=db.prepare('SELECT fetched_at,price FROM quotes WHERE symbol=? AND currency=\'FX\'').get(pair) as {fetched_at:string;price:number}|undefined
    if(old && Date.now()-new Date(old.fetched_at).getTime()<4*60*60*1000) continue
    try {
      const [from,to]=pair.split('/')
      const b:any=await avCall({function:'CURRENCY_EXCHANGE_RATE',from_currency:from,to_currency:to},key)
      const rate=Number(b['Realtime Currency Exchange Rate']?.['5. Exchange Rate']); if(!Number.isFinite(rate)) throw new Error(`${pair}が取得できません`)
      const now=new Date().toISOString();const change=old?.price?(rate-old.price)/old.price*100:null
      db.prepare('INSERT INTO quotes(symbol,currency,price,change_pct,fetched_at,source) VALUES(?,\'FX\',?,?,?,\'Alpha Vantage · FX\') ON CONFLICT(symbol,currency) DO UPDATE SET price=excluded.price,change_pct=excluded.change_pct,fetched_at=excluded.fetched_at,source=excluded.source').run(pair,rate,change,now);results.push({symbol:pair,price:rate,fetched_at:now})
    } catch(e) { errors.push(e instanceof Error?e.message:`${pair}の取得エラー`) }
  }
  recordSnapshot()
  res.json({ quotes:db.prepare('SELECT symbol,currency,price,change_pct,fetched_at,source FROM quotes').all(), refreshed:results, errors })
})
function recordSnapshot(dayOverride?:string) {
  const ps=positions(); const fx=(db.prepare("SELECT price FROM quotes WHERE symbol='USD/JPY'").get() as {price:number}|undefined)?.price
  const entries=ps.map(p=>({p,q:db.prepare('SELECT price FROM quotes WHERE symbol=? AND currency=?').get(p.symbol,p.currency) as {price:number}|undefined}))
  if (entries.some(({p,q})=>!q || (p.currency==='USD'&&!fx))) return
  const sum=entries.reduce((total,{p,q})=>total+p.quantity*q!.price/(p.asset_type==='FUND'?10000:1)*(p.currency==='USD'?fx!:1),0)
  if (sum>0) { const day=dayOverride||new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()); db.prepare('INSERT INTO snapshots(day,value_jpy,recorded_at) VALUES(?,?,?) ON CONFLICT(day) DO UPDATE SET value_jpy=excluded.value_jpy,recorded_at=excluded.recorded_at').run(day,sum,new Date().toISOString()) }
}
app.get('/api/snapshots', (_req,res)=>res.json(db.prepare('SELECT day,value_jpy,recorded_at FROM snapshots ORDER BY day ASC').all()))
app.put('/api/quotes/manual', (req,res)=>{
  try {
    const {symbol,currency,price}=req.body||{};const p=positions().find(x=>x.symbol===String(symbol).toUpperCase()&&x.currency===currency)
    const amount=Number(price);if(!p||p.asset_type!=='FUND')throw new Error('手動価格を設定できる投資信託が見つかりません')
    if(!Number.isFinite(amount)||amount<=0)throw new Error('価格を確認してください')
    const now=new Date().toISOString();db.prepare('INSERT INTO quotes(symbol,currency,price,change_pct,fetched_at,source) VALUES(?,?,?,NULL,?,?) ON CONFLICT(symbol,currency) DO UPDATE SET price=excluded.price,change_pct=NULL,fetched_at=excluded.fetched_at,source=excluded.source').run(p.symbol,p.currency,amount,now,'Manual price')
    recordSnapshot();res.json({ok:true,quotes:db.prepare('SELECT symbol,currency,price,change_pct,fetched_at,source FROM quotes').all()})
  }catch(e){dbError(res,e)}
})
app.get('/api/backup', (_req,res)=>res.json({ version:1, exportedAt:new Date().toISOString(), trades:allTrades(), quotes:db.prepare('SELECT * FROM quotes').all(), snapshots:db.prepare('SELECT * FROM snapshots').all() }))
app.post('/api/restore', (req,res)=>{
  try {
    const b=req.body; if(!Array.isArray(b.trades)) throw new Error('バックアップ形式が正しくありません')
    const tx=db.transaction(()=>{db.prepare('DELETE FROM trades').run(); const st=db.prepare('INSERT INTO trades(symbol,name,market,currency,side,trade_date,quantity,price,fee,target_price,asset_type,entry_type) VALUES(@symbol,@name,@market,@currency,@side,@trade_date,@quantity,@price,@fee,@target_price,@asset_type,@entry_type)'); for(const t of b.trades) st.run(validateTrade(t)); positions(); if(Array.isArray(b.quotes)){db.prepare('DELETE FROM quotes').run();const qs=db.prepare('INSERT INTO quotes(symbol,currency,price,change_pct,fetched_at,source) VALUES(@symbol,@currency,@price,@change_pct,@fetched_at,@source)');for(const q of b.quotes)qs.run(q)} if(Array.isArray(b.snapshots)){db.prepare('DELETE FROM snapshots').run();const ss=db.prepare('INSERT INTO snapshots(day,value_jpy,recorded_at) VALUES(?,?,?)');for(const s of b.snapshots)ss.run(s.day,s.value_jpy,s.recorded_at)}})
    tx();res.json({ok:true,trades:allTrades()})
  }catch(e){dbError(res,e)}
})

if (process.env.NODE_ENV === 'production') { const dist=path.resolve('dist'); app.use(express.static(dist)); app.get('/{*splat}',(_req,res)=>res.sendFile(path.join(dist,'index.html'))) }
app.listen(PORT,'127.0.0.1',()=>console.log(`folio local server listening at http://127.0.0.1:${PORT}`))
