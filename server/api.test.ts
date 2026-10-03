import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { spawn, type ChildProcess } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const port = 4327
const origin = `http://127.0.0.1:${port}`
let processHandle: ChildProcess
let dataDir: string

async function request(route: string, method = 'GET', body?: unknown) {
  const response = await fetch(`${origin}/api${route}`, {
    method,
    headers: { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  return { status: response.status, data: await response.json() as any }
}

const buy = (overrides: Record<string, unknown> = {}) => ({
  symbol: 'AAPL', name: 'Apple', market: 'US', currency: 'USD', side: 'BUY',
  trade_date: '2026-01-05', quantity: 10, price: 20, fee: 2, target_price: 30,
  ...overrides,
})

beforeAll(async () => {
  dataDir = await mkdtemp(path.join(os.tmpdir(), 'folio-test-'))
  processHandle = spawn(path.resolve('node_modules/.bin/tsx'), ['server/index.ts'], {
    cwd: process.cwd(), env: { ...process.env, PORT: String(port), FOLIO_DATA_DIR: dataDir }, stdio: 'ignore',
  })
  const deadline = Date.now() + 10000
  while (Date.now() < deadline) {
    try { if ((await fetch(`${origin}/api/health`)).ok) return } catch { /* server is starting */ }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error('test server did not start')
}, 15000)

beforeEach(async () => {
  await request('/restore','POST',{trades:[],quotes:[],snapshots:[]})
})

afterAll(async () => {
  processHandle?.kill('SIGTERM')
  if (dataDir) await rm(dataDir, { recursive: true, force: true })
})

describe('local portfolio API', () => {
  it('reports a missing market-data API key without making an external request', async () => {
    expect((await request('/settings')).data.hasApiKey).toBe(false)
    const refresh = await request('/quotes/refresh', 'POST', {})
    expect(refresh.status).toBe(400)
    expect(refresh.data.error).toMatch(/APIキー/)
  })

  it('creates a holding with fee-inclusive average cost and rejects overselling', async () => {
    const created = await request('/trades', 'POST', buy())
    expect(created.status).toBe(201)
    const positions = await request('/positions')
    expect(positions.data[0]).toMatchObject({ quantity: 10, basis: 202, average_cost: 20.2 })

    const oversell = await request('/trades', 'POST', buy({ side: 'SELL', quantity: 11, price: 21 }))
    expect(oversell.status).toBe(400)
    expect((await request('/positions')).data[0].quantity).toBe(10)
  })

  it('imports CSV rows atomically and edits/deletes trades', async () => {
    await request('/trades','POST',buy())
    const invalidImport = await request('/trades/import', 'POST', { trades: [
      buy({ symbol: 'MSFT', name: 'Microsoft' }), buy({ symbol: 'BAD', market: 'JP', currency: 'USD' }),
    ] })
    expect(invalidImport.status).toBe(400)
    expect((await request('/trades')).data).toHaveLength(1)

    const imported = await request('/trades/import', 'POST', { trades: [buy({ symbol: 'MSFT', name: 'Microsoft' })] })
    expect(imported.status).toBe(201)
    const id = imported.data.find((trade: any) => trade.symbol === 'AAPL').id
    const edited = await request(`/trades/${id}`, 'PUT', buy({ quantity: 12 }))
    expect(edited.status).toBe(200)
    expect((await request('/positions')).data.find((position: any) => position.symbol === 'AAPL').quantity).toBe(12)

    expect((await request(`/trades/${id}`, 'DELETE')).status).toBe(200)
    expect((await request('/trades')).data).toHaveLength(1)
  })

  it('exports and restores a local JSON backup', async () => {
    await request('/trades','POST',buy())
    const backup = await request('/backup')
    expect(backup.data.version).toBe(1)
    expect(backup.data.trades).toHaveLength(1)
    const restored = await request('/restore', 'POST', { ...backup.data, trades: [buy({ symbol: 'NVDA', name: 'NVIDIA' })], snapshots: [{ day: '2026-03-01', value_jpy: 12345, recorded_at: '2026-03-01T00:00:00.000Z' }] })
    expect(restored.status).toBe(200)
    expect((await request('/trades')).data[0].symbol).toBe('NVDA')
    expect((await request('/snapshots')).data[0].value_jpy).toBe(12345)
  })

  it('imports PDF-style opening balances, mutual-fund units, cash, and manual quotes', async () => {
    const imported = await request('/trades/import', 'POST', { trades: [
      { symbol:'9432',name:'NTT',market:'JP',currency:'JPY',side:'BUY',trade_date:'2026-10-03',quantity:300,price:156,fee:0,target_price:null,asset_type:'STOCK',entry_type:'OPENING',quote_price:169.9,quote_fetched_at:'2026-10-03T00:57:00+09:00',quote_source:'PDF import' },
      { symbol:'FUND-NISSEI',name:'Nissei balance fund',market:'JP',currency:'JPY',side:'BUY',trade_date:'2026-10-03',quantity:216489,price:18938.61,fee:0,target_price:null,asset_type:'FUND',entry_type:'OPENING',quote_price:22300,quote_fetched_at:'2026-10-03T00:57:00+09:00',quote_source:'PDF import' },
      { symbol:'CASH_JPY',name:'Cash balance',market:'JP',currency:'JPY',side:'BUY',trade_date:'2026-10-03',quantity:1,price:35000,fee:0,target_price:null,asset_type:'CASH',entry_type:'OPENING',quote_price:35000,quote_fetched_at:'2026-10-03T00:57:00+09:00',quote_source:'PDF import' },
    ] })
    expect(imported.status).toBe(201)
    const positions = (await request('/positions')).data
    expect(positions.find((p:any)=>p.symbol==='FUND-NISSEI')).toMatchObject({ quantity:216489, average_cost:18938.61, asset_type:'FUND' })
    expect((await request('/quotes')).data.find((q:any)=>q.symbol==='FUND-NISSEI').price).toBe(22300)
    const snapshot=(await request('/snapshots')).data.find((s:any)=>s.day==='2026-10-03')
    expect(Math.round(snapshot.value_jpy)).toBe(Math.round(300*169.9+216489*22300/10000+35000))

    const manual=await request('/quotes/manual','PUT',{symbol:'FUND-NISSEI',currency:'JPY',price:23000})
    expect(manual.status).toBe(200)
    expect(manual.data.quotes.find((q:any)=>q.symbol==='FUND-NISSEI').price).toBe(23000)
  })
})
