"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var lucide_vue_next_1 = require("lucide-vue-next");
var colors = ['#638c6b', '#8b7dc2', '#e2a46a', '#7b9ab8', '#cc7d78'];
exports.default = await (function () { return __awaiter(void 0, void 0, void 0, function () {
    function api(path, init) {
        return __awaiter(this, void 0, void 0, function () { var r, data; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api".concat(path), __assign(__assign({}, init), { headers: __assign({ 'Content-Type': 'application/json' }, ((init === null || init === void 0 ? void 0 : init.headers) || {})) }))];
                case 1:
                    r = _a.sent();
                    return [4 /*yield*/, r.json()];
                case 2:
                    data = _a.sent();
                    if (!r.ok)
                        throw new Error(data.error || '処理に失敗しました');
                    return [2 /*return*/, data];
            }
        }); });
    }
    function loadAll() {
        return __awaiter(this, void 0, void 0, function () { var _a, t, p, q, s, settings, e_1; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loading.value = true;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, Promise.all([api('/trades'), api('/positions'), api('/quotes'), api('/snapshots'), api('/settings')])];
                case 2:
                    _a = _b.sent(), t = _a[0], p = _a[1], q = _a[2], s = _a[3], settings = _a[4];
                    trades.value = t;
                    positions.value = p;
                    quotes.value = q;
                    snapshots.value = s;
                    keyState.value = settings.hasApiKey;
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _b.sent();
                    notify(e_1.message);
                    return [3 /*break*/, 5];
                case 4:
                    loading.value = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        }); });
    }
    function refreshQuotes() {
        return __awaiter(this, void 0, void 0, function () { var result, _a, e_2; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    refreshing.value = true;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, api('/quotes/refresh', { method: 'POST', body: '{}' })];
                case 2:
                    result = _b.sent();
                    quotes.value = result.quotes;
                    _a = snapshots;
                    return [4 /*yield*/, api('/snapshots')];
                case 3:
                    _a.value = _b.sent();
                    if (result.errors.length)
                        notify(result.errors[0]);
                    else
                        notify('価格を更新しました');
                    return [3 /*break*/, 6];
                case 4:
                    e_2 = _b.sent();
                    notify(e_2.message);
                    return [3 /*break*/, 6];
                case 5:
                    refreshing.value = false;
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        }); });
    }
    function openAdd() { editing.value = null; form.value = blankForm(); formError.value = ''; modal.value = true; }
    function openEdit(t) { editing.value = t.id; form.value = { symbol: t.symbol, name: t.name, market: t.market, currency: t.currency, side: t.side, trade_date: t.trade_date, quantity: String(t.quantity), price: String(t.price), fee: String(t.fee), target_price: t.target_price == null ? '' : String(t.target_price) }; formError.value = ''; modal.value = true; }
    function saveTrade() {
        return __awaiter(this, void 0, void 0, function () { var f, body, _a, _b, e_3; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    formError.value = '';
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    f = form.value;
                    body = __assign(__assign({}, f), { quantity: Number(f.quantity), price: Number(f.price), fee: Number(f.fee), target_price: f.target_price ? Number(f.target_price) : null });
                    _a = trades;
                    return [4 /*yield*/, api(editing.value ? "/trades/".concat(editing.value) : '/trades', { method: editing.value ? 'PUT' : 'POST', body: JSON.stringify(body) })];
                case 2:
                    _a.value = _c.sent();
                    _b = positions;
                    return [4 /*yield*/, api('/positions')];
                case 3:
                    _b.value = _c.sent();
                    modal.value = false;
                    notify(editing.value ? '取引を更新しました' : '取引を登録しました');
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _c.sent();
                    formError.value = e_3.message;
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        }); });
    }
    function deleteTrade(id) {
        return __awaiter(this, void 0, void 0, function () { var _a, _b, e_4; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!confirm('この取引を削除しますか？'))
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    _a = trades;
                    return [4 /*yield*/, api("/trades/".concat(id), { method: 'DELETE' })];
                case 2:
                    _a.value = _c.sent();
                    _b = positions;
                    return [4 /*yield*/, api('/positions')];
                case 3:
                    _b.value = _c.sent();
                    notify('取引を削除しました');
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _c.sent();
                    notify(e_4.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        }); });
    }
    function storeKey() {
        return __awaiter(this, void 0, void 0, function () { var r, e_5; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api('/settings', { method: 'PUT', body: JSON.stringify({ apiKey: apiKey.value }) })];
                case 1:
                    r = _a.sent();
                    keyState.value = r.hasApiKey;
                    apiKey.value = '';
                    settingsOpen.value = false;
                    notify('APIキーを保存しました');
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    notify(e_5.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        }); });
    }
    function clearKey() {
        return __awaiter(this, void 0, void 0, function () { var e_6; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api('/settings', { method: 'PUT', body: JSON.stringify({ clear: true }) })];
                case 1:
                    _a.sent();
                    keyState.value = false;
                    apiKey.value = '';
                    notify('APIキーを削除しました');
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    notify(e_6.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        }); });
    }
    function download(name, content, type) {
        if (type === void 0) { type = 'text/plain'; }
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([content], { type: type }));
        a.download = name;
        a.click();
        URL.revokeObjectURL(a.href);
    }
    function exportCsv() { var rows = __spreadArray([['symbol', 'name', 'market', 'currency', 'side', 'trade_date', 'quantity', 'price', 'fee', 'target_price']], trades.value.map(function (t) { var _a; return [t.symbol, t.name, t.market, t.currency, t.side, t.trade_date, t.quantity, t.price, t.fee, (_a = t.target_price) !== null && _a !== void 0 ? _a : '']; }), true); download('folio-trades.csv', '\ufeff' + rows.map(function (r) { return r.map(function (x) { return "\"".concat(String(x).replaceAll('"', '""'), "\""); }).join(','); }).join('\r\n'), 'text/csv'); }
    function parseCsv(text) { var lines = text.replace(/^\ufeff/, '').split(/\r?\n/).filter(Boolean); var parse = function (s) { var a = []; var x = '', quoted = false; for (var i = 0; i < s.length; i++) {
        if (s[i] === '"' && s[i + 1] === '"' && quoted) {
            x += '"';
            i++;
        }
        else if (s[i] === '"')
            quoted = !quoted;
        else if (s[i] === ',' && !quoted) {
            a.push(x);
            x = '';
        }
        else
            x += s[i];
    } a.push(x); return a; }; var headers = parse(lines[0]).map(function (x) { return x.trim(); }); return lines.slice(1).map(function (line) { var cells = parse(line); return Object.fromEntries(headers.map(function (h, i) { var _a; return [h, (_a = cells[i]) !== null && _a !== void 0 ? _a : '']; })); }); }
    function importCsv(e) {
        return __awaiter(this, void 0, void 0, function () { var file, rows, _a, count, _i, rows_1, row, e_7; var _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    file = (_b = e.target.files) === null || _b === void 0 ? void 0 : _b[0];
                    if (!file)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 8, 9, 10]);
                    _a = parseCsv;
                    return [4 /*yield*/, file.text()];
                case 2:
                    rows = _a.apply(void 0, [_c.sent()]);
                    count = 0;
                    _i = 0, rows_1 = rows;
                    _c.label = 3;
                case 3:
                    if (!(_i < rows_1.length)) return [3 /*break*/, 6];
                    row = rows_1[_i];
                    return [4 /*yield*/, api('/trades', { method: 'POST', body: JSON.stringify(__assign(__assign({}, row), { quantity: Number(row.quantity), price: Number(row.price), fee: Number(row.fee || 0), target_price: row.target_price ? Number(row.target_price) : null })) })];
                case 4:
                    _c.sent();
                    count++;
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, loadAll()];
                case 7:
                    _c.sent();
                    notify("".concat(count, "\u4EF6\u306E\u53D6\u5F15\u3092\u53D6\u308A\u8FBC\u307F\u307E\u3057\u305F"));
                    return [3 /*break*/, 10];
                case 8:
                    e_7 = _c.sent();
                    notify(e_7.message);
                    return [3 /*break*/, 10];
                case 9:
                    e.target.value = '';
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        }); });
    }
    function exportBackup() {
        return __awaiter(this, void 0, void 0, function () { var b; return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api('/backup')];
                case 1:
                    b = _a.sent();
                    download('folio-backup.json', JSON.stringify(b, null, 2), 'application/json');
                    return [2 /*return*/];
            }
        }); });
    }
    function restoreBackup(e) {
        return __awaiter(this, void 0, void 0, function () { var file, b, _a, _b, e_8; var _c; return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    file = (_c = e.target.files) === null || _c === void 0 ? void 0 : _c[0];
                    if (!file)
                        return [2 /*return*/];
                    if (!confirm('現在の取引・推移データを置き換えて復元しますか？'))
                        return [2 /*return*/];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, 6, 7]);
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, file.text()];
                case 2:
                    b = _b.apply(_a, [_d.sent()]);
                    return [4 /*yield*/, api('/restore', { method: 'POST', body: JSON.stringify(b) })];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, loadAll()];
                case 4:
                    _d.sent();
                    notify('バックアップを復元しました');
                    return [3 /*break*/, 7];
                case 5:
                    e_8 = _d.sent();
                    notify(e_8.message);
                    return [3 /*break*/, 7];
                case 6:
                    e.target.value = '';
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        }); });
    }
    function downloadTemplate() { download('folio-template.csv', 'symbol,name,market,currency,side,trade_date,quantity,price,fee,target_price\n7203.T,トヨタ自動車,JP,JPY,BUY,2026-01-15,100,3200,0,3600\nAAPL,Apple,US,USD,BUY,2026-02-01,5,225,1,250\n', 'text/csv'); }
    var trades, positions, quotes, snapshots, keyState, apiKey, loading, refreshing, toast, modal, settingsOpen, csvInput, backupInput, search, period, page, today, blankForm, form, editing, formError, quoteMap, fx, computedPositions, totalValue, totalCost, totalPnl, totalPct, capturedAt, filtered, filteredTrades, holdingCount, chartPoints, chartPath, chartArea, chartChange, markets, formatMoney, formatYen, formatNum, formatDate, since, notify, __VLS_ctx, __VLS_components, __VLS_directives, __VLS_0, __VLS_1, __VLS_2, __VLS_4, __VLS_5, __VLS_6, __VLS_8, __VLS_9, __VLS_10, __VLS_12, __VLS_13, __VLS_14, __VLS_16, __VLS_17, __VLS_18, __VLS_20, __VLS_21, __VLS_22, __VLS_24, __VLS_25, __VLS_26, __VLS_28, __VLS_29, __VLS_30, __VLS_32, __VLS_33, __VLS_34, __VLS_36, __VLS_37, __VLS_38, __VLS_40, __VLS_41, __VLS_42, __VLS_44, __VLS_45, __VLS_46, __VLS_48, __VLS_49, __VLS_50, __VLS_52, __VLS_53, __VLS_54, __VLS_56, __VLS_57, __VLS_58, __VLS_60, __VLS_61, __VLS_62, __VLS_64, __VLS_65, __VLS_66, __VLS_68, __VLS_69, __VLS_70, __VLS_72, __VLS_73, __VLS_74, __VLS_76, __VLS_77, __VLS_78, __VLS_80, __VLS_81, __VLS_82, _loop_2, _i, _a, p, __VLS_84, __VLS_85, __VLS_86, _b, _c, n, __VLS_88, __VLS_89, __VLS_90, __VLS_92, __VLS_93, __VLS_94, __VLS_96, __VLS_97, __VLS_98, __VLS_100, __VLS_101, __VLS_102, __VLS_104, __VLS_105, __VLS_106, _d, _e, _f, p, i, __VLS_108, __VLS_109, __VLS_110, __VLS_112, __VLS_113, __VLS_114, __VLS_116, __VLS_117, __VLS_118, __VLS_120, __VLS_121, __VLS_122, __VLS_124, __VLS_125, __VLS_126, __VLS_128, __VLS_129, __VLS_130, __VLS_132, __VLS_133, __VLS_134, _loop_3, _g, _h, p, __VLS_140, __VLS_141, __VLS_142, __VLS_144, __VLS_145, __VLS_146, __VLS_148, __VLS_149, __VLS_150, __VLS_152, __VLS_153, __VLS_154, __VLS_156, __VLS_157, __VLS_158, _j, _k, m, __VLS_160, __VLS_161, __VLS_162, __VLS_164, __VLS_165, __VLS_166, __VLS_168, __VLS_169, __VLS_170, __VLS_172, __VLS_173, __VLS_174, __VLS_176, __VLS_177, __VLS_178, _l, _m, t, __VLS_180, __VLS_181, __VLS_182, __VLS_184, __VLS_185, __VLS_186, __VLS_188, __VLS_189, __VLS_190;
    var _o, _p, _q, _r, _s;
    return __generator(this, function (_t) {
        trades = (0, vue_1.ref)([]), positions = (0, vue_1.ref)([]), quotes = (0, vue_1.ref)([]), snapshots = (0, vue_1.ref)([]);
        keyState = (0, vue_1.ref)(false), apiKey = (0, vue_1.ref)(''), loading = (0, vue_1.ref)(true), refreshing = (0, vue_1.ref)(false), toast = (0, vue_1.ref)(''), modal = (0, vue_1.ref)(false), settingsOpen = (0, vue_1.ref)(false), csvInput = (0, vue_1.ref)(), backupInput = (0, vue_1.ref)(), search = (0, vue_1.ref)(''), period = (0, vue_1.ref)('1M'), page = (0, vue_1.ref)('overview');
        today = new Date().toISOString().slice(0, 10);
        blankForm = function () { return ({ symbol: '', name: '', market: 'JP', currency: 'JPY', side: 'BUY', trade_date: today, quantity: '', price: '', fee: '0', target_price: '' }); };
        form = (0, vue_1.ref)(blankForm()), editing = (0, vue_1.ref)(null), formError = (0, vue_1.ref)('');
        quoteMap = (0, vue_1.computed)(function () { return new Map(quotes.value.map(function (q) { return ["".concat(q.symbol, ":").concat(q.currency), q]; })); });
        fx = (0, vue_1.computed)(function () { var _a; return ((_a = quoteMap.value.get('USD/JPY:FX')) === null || _a === void 0 ? void 0 : _a.price) || 0; });
        computedPositions = (0, vue_1.computed)(function () { return positions.value.map(function (p) { var _a; var q = quoteMap.value.get("".concat(p.symbol, ":").concat(p.currency)); var price = (_a = q === null || q === void 0 ? void 0 : q.price) !== null && _a !== void 0 ? _a : 0; var value = price * p.quantity; var cost = p.basis; var pnl = value - cost; var pct = cost ? pnl / cost * 100 : 0; return __assign(__assign({}, p), { price: price, value: value, cost: cost, pnl: pnl, pct: pct, quote: q }); }).filter(function (p) { return p.quantity > 0; }); });
        totalValue = (0, vue_1.computed)(function () { return computedPositions.value.reduce(function (s, p) { return s + (p.currency === 'USD' ? p.value * fx.value : p.value); }, 0); });
        totalCost = (0, vue_1.computed)(function () { return computedPositions.value.reduce(function (s, p) { return s + (p.currency === 'USD' ? p.cost * fx.value : p.cost); }, 0); });
        totalPnl = (0, vue_1.computed)(function () { return totalValue.value - totalCost.value; });
        totalPct = (0, vue_1.computed)(function () { return totalCost.value ? totalPnl.value / totalCost.value * 100 : 0; });
        capturedAt = (0, vue_1.computed)(function () { return quotes.value.reduce(function (latest, q) { return q.fetched_at > latest ? q.fetched_at : latest; }, ''); });
        filtered = (0, vue_1.computed)(function () { return computedPositions.value.filter(function (p) { return "".concat(p.name, " ").concat(p.symbol).toLowerCase().includes(search.value.toLowerCase()); }); });
        filteredTrades = (0, vue_1.computed)(function () { return __spreadArray([], trades.value, true).slice(0, 7); });
        holdingCount = (0, vue_1.computed)(function () { return computedPositions.value.length; });
        chartPoints = (0, vue_1.computed)(function () {
            var rows = snapshots.value;
            if (!rows.length)
                return [];
            var cutoff = new Date();
            if (period.value === '1W')
                cutoff.setDate(cutoff.getDate() - 7);
            else if (period.value === '1M')
                cutoff.setMonth(cutoff.getMonth() - 1);
            else if (period.value === '3M')
                cutoff.setMonth(cutoff.getMonth() - 3);
            else
                cutoff.setFullYear(cutoff.getFullYear() - 1);
            var filteredRows = rows.filter(function (x) { return new Date(x.day) >= cutoff; });
            return filteredRows.length > 1 ? filteredRows : rows;
        });
        chartPath = (0, vue_1.computed)(function () { var a = chartPoints.value; if (a.length < 2)
            return ''; var lo = Math.min.apply(Math, a.map(function (x) { return x.value_jpy; })), hi = Math.max.apply(Math, a.map(function (x) { return x.value_jpy; })); return a.map(function (p, i) { return "".concat(i ? 'L' : 'M', " ").concat((i / (a.length - 1)) * 100, " ").concat((hi === lo ? 50 : 95 - (p.value_jpy - lo) / (hi - lo) * 85)); }).join(' '); });
        chartArea = (0, vue_1.computed)(function () { return chartPath.value ? "".concat(chartPath.value, " L 100 100 L 0 100 Z") : ''; });
        chartChange = (0, vue_1.computed)(function () { return chartPoints.value.length > 1 ? chartPoints.value.at(-1).value_jpy - chartPoints.value[0].value_jpy : 0; });
        markets = [{ symbol: 'SPY', name: '米国大型株', region: 'UNITED STATES', flag: '🇺🇸', currency: 'USD' }, { symbol: 'QQQ', name: '米国テック株', region: 'NASDAQ 100 PROXY', flag: '◉', currency: 'USD' }, { symbol: 'EWJ', name: '日本株', region: 'JAPAN EQUITY PROXY', flag: '🇯🇵', currency: 'USD' }, { symbol: 'VGK', name: '欧州株', region: 'EUROPE EQUITY PROXY', flag: '🇪🇺', currency: 'USD' }];
        formatMoney = function (n, currency, compact) {
            if (currency === void 0) { currency = 'JPY'; }
            if (compact === void 0) { compact = false; }
            return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: currency, notation: compact ? 'compact' : 'standard', maximumFractionDigits: currency === 'JPY' ? 0 : 2 }).format(Number.isFinite(n) ? n : 0);
        };
        formatYen = function (n, compact) {
            if (compact === void 0) { compact = false; }
            return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', notation: compact ? 'compact' : 'standard', maximumFractionDigits: 0 }).format(Number.isFinite(n) ? n : 0);
        };
        formatNum = function (n, d) {
            if (d === void 0) { d = 2; }
            return new Intl.NumberFormat('ja-JP', { maximumFractionDigits: d }).format(n);
        };
        formatDate = function (s) { return s ? new Intl.DateTimeFormat('ja-JP', { month: 'short', day: 'numeric' }).format(new Date(s)) : ''; };
        since = function (s) { if (!s)
            return '未取得'; var d = Math.max(0, Math.floor((Date.now() - new Date(s).getTime()) / 60000)); return d < 1 ? 'たった今' : d < 60 ? "".concat(d, "\u5206\u524D") : d < 1440 ? "".concat(Math.floor(d / 60), "\u6642\u9593\u524D") : formatDate(s); };
        notify = function (s) { toast.value = s; setTimeout(function () { toast.value = ''; }, 3200); };
        (0, vue_1.onMounted)(loadAll);
        debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
        __VLS_ctx = {};
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "app-shell" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)(__assign({ class: "sidebar" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "brand" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "brand-mark" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "brand-name" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "brand-dot" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "workspace" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "avatar" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
        __VLS_0 = {}.ChevronDown;
        /** @type {[typeof __VLS_components.ChevronDown, ]} */ ;
        __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ size: (15) }, { class: "muted-icon" })));
        __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ size: (15) }, { class: "muted-icon" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "nav-label" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.page = 'overview';
            } }, { class: ({ active: __VLS_ctx.page === 'overview' }) }));
        __VLS_4 = {}.LayoutDashboard;
        /** @type {[typeof __VLS_components.LayoutDashboard, ]} */ ;
        __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            size: (17),
        }));
        __VLS_6 = __VLS_5.apply(void 0, __spreadArray([{
                size: (17),
            }], __VLS_functionalComponentArgsRest(__VLS_5), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.page = 'holdings';
            } }, { class: ({ active: __VLS_ctx.page === 'holdings' }) }));
        __VLS_8 = {}.BriefcaseBusiness;
        /** @type {[typeof __VLS_components.BriefcaseBusiness, ]} */ ;
        __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            size: (17),
        }));
        __VLS_10 = __VLS_9.apply(void 0, __spreadArray([{
                size: (17),
            }], __VLS_functionalComponentArgsRest(__VLS_9), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "nav-count" }));
        (__VLS_ctx.holdingCount);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.page = 'activity';
            } }, { class: ({ active: __VLS_ctx.page === 'activity' }) }));
        __VLS_12 = {}.ArrowLeftRight;
        /** @type {[typeof __VLS_components.ArrowLeftRight, ]} */ ;
        __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            size: (17),
        }));
        __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{
                size: (17),
            }], __VLS_functionalComponentArgsRest(__VLS_13), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "nav-label market-nav-label" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a;
                var _b = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _b[_i] = arguments[_i];
                }
                var $event = _b[0];
                __VLS_ctx.page = 'overview';
                (_a = __VLS_ctx.document.getElementById('markets')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
            } }));
        __VLS_16 = {}.Globe2;
        /** @type {[typeof __VLS_components.Globe2, ]} */ ;
        __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
            size: (17),
        }));
        __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{
                size: (17),
            }], __VLS_functionalComponentArgsRest(__VLS_17), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "sidebar-bottom" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "privacy-note" }));
        __VLS_20 = {}.ShieldCheck;
        /** @type {[typeof __VLS_components.ShieldCheck, ]} */ ;
        __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            size: (17),
        }));
        __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
                size: (17),
            }], __VLS_functionalComponentArgsRest(__VLS_21), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.settingsOpen = true;
            } }, { class: "settings-nav" }));
        __VLS_24 = {}.Settings2;
        /** @type {[typeof __VLS_components.Settings2, ]} */ ;
        __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            size: (17),
        }));
        __VLS_26 = __VLS_25.apply(void 0, __spreadArray([{
                size: (17),
            }], __VLS_functionalComponentArgsRest(__VLS_25), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "user-row" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "user-avatar" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
        __VLS_28 = {}.MoreHorizontal;
        /** @type {[typeof __VLS_components.MoreHorizontal, ]} */ ;
        __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28(__assign({ size: (18) }, { class: "muted-icon" })));
        __VLS_30 = __VLS_29.apply(void 0, __spreadArray([__assign({ size: (18) }, { class: "muted-icon" })], __VLS_functionalComponentArgsRest(__VLS_29), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(__assign({ class: "main-area" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: "topbar" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "breadcrumbs" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_32 = {}.ChevronRight;
        /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
        __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
            size: (14),
        }));
        __VLS_34 = __VLS_33.apply(void 0, __spreadArray([{
                size: (14),
            }], __VLS_functionalComponentArgsRest(__VLS_33), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
        (__VLS_ctx.page === 'holdings' ? '保有資産' : __VLS_ctx.page === 'activity' ? '取引履歴' : '概要');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "top-actions" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "market-open" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.settingsOpen = true;
            } }, { class: "icon-button" }), { title: "設定" }));
        __VLS_36 = {}.SlidersHorizontal;
        /** @type {[typeof __VLS_components.SlidersHorizontal, ]} */ ;
        __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
            size: (17),
        }));
        __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{
                size: (17),
            }], __VLS_functionalComponentArgsRest(__VLS_37), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ class: "avatar top-avatar" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "welcome-row" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "eyebrow" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
        (__VLS_ctx.page === 'holdings' ? '保有資産' : __VLS_ctx.page === 'activity' ? '取引履歴' : 'おかえりなさい');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "subhead" }));
        (__VLS_ctx.page === 'overview' ? '資産の今を、ひと目で。' : __VLS_ctx.page === 'holdings' ? '保有銘柄の評価額とパフォーマンス。' : '取引記録を整理して、資産の流れを把握。');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "header-buttons" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.exportBackup) }, { class: "button button-quiet" }));
        __VLS_40 = {}.Download;
        /** @type {[typeof __VLS_components.Download, ]} */ ;
        __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            size: (16),
        }));
        __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
                size: (16),
            }], __VLS_functionalComponentArgsRest(__VLS_41), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.openAdd) }, { class: "button button-dark" }));
        __VLS_44 = {}.Plus;
        /** @type {[typeof __VLS_components.Plus, ]} */ ;
        __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            size: (16),
        }));
        __VLS_46 = __VLS_45.apply(void 0, __spreadArray([{
                size: (16),
            }], __VLS_functionalComponentArgsRest(__VLS_45), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "notice-strip" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "notice-icon" }));
        __VLS_48 = {}.ShieldCheck;
        /** @type {[typeof __VLS_components.ShieldCheck, ]} */ ;
        __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            size: (15),
        }));
        __VLS_50 = __VLS_49.apply(void 0, __spreadArray([{
                size: (15),
            }], __VLS_functionalComponentArgsRest(__VLS_49), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.settingsOpen = true;
            } }));
        __VLS_52 = {}.ChevronRight;
        /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
        __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
            size: (14),
        }));
        __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{
                size: (14),
            }], __VLS_functionalComponentArgsRest(__VLS_53), false));
        if (__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "summary-grid" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ class: "summary-card hero-card" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-top" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon-box pale-green" }));
            __VLS_56 = {}.Wallet;
            /** @type {[typeof __VLS_components.Wallet, ]} */ ;
            __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
                size: (17),
            }));
            __VLS_58 = __VLS_57.apply(void 0, __spreadArray([{
                    size: (17),
                }], __VLS_functionalComponentArgsRest(__VLS_57), false));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "value-row" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (__VLS_ctx.formatYen(__VLS_ctx.totalValue, true));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "unit" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "summary-foot" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "change-pill" }, { class: (__VLS_ctx.totalPnl >= 0 ? 'positive' : 'negative') }));
            __VLS_60 = ((__VLS_ctx.totalPnl >= 0 ? __VLS_ctx.ArrowUpRight : __VLS_ctx.ArrowDownRight));
            __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
                size: (14),
            }));
            __VLS_62 = __VLS_61.apply(void 0, __spreadArray([{
                    size: (14),
                }], __VLS_functionalComponentArgsRest(__VLS_61), false));
            (__VLS_ctx.totalPnl >= 0 ? '+' : '');
            (__VLS_ctx.formatYen(__VLS_ctx.totalPnl, true));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "foot-copy" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "hero-spark" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                viewBox: "0 0 150 48",
                preserveAspectRatio: "none",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
                d: "M0 37 C14 34 17 38 28 29 S46 33 56 23 S74 32 86 18 S100 23 111 15 S130 23 150 5",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.path)(__assign({ class: "spark-fill" }, { d: "M0 37 C14 34 17 38 28 29 S46 33 56 23 S74 32 86 18 S100 23 111 15 S130 23 150 5 L150 48 L0 48Z" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ class: "summary-card" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-top" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon-box pale-purple" }));
            __VLS_64 = {}.TrendingUp;
            /** @type {[typeof __VLS_components.TrendingUp, ]} */ ;
            __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
                size: (17),
            }));
            __VLS_66 = __VLS_65.apply(void 0, __spreadArray([{
                    size: (17),
                }], __VLS_functionalComponentArgsRest(__VLS_65), false));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "value-row" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)(__assign({ class: (__VLS_ctx.totalPnl >= 0 ? 'ink-green' : 'ink-red') }));
            (__VLS_ctx.totalPnl >= 0 ? '+' : '');
            (__VLS_ctx.formatYen(__VLS_ctx.totalPnl, true));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "summary-foot" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "change-pill" }, { class: (__VLS_ctx.totalPct >= 0 ? 'positive' : 'negative') }));
            __VLS_68 = ((__VLS_ctx.totalPct >= 0 ? __VLS_ctx.ArrowUpRight : __VLS_ctx.ArrowDownRight));
            __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
                size: (14),
            }));
            __VLS_70 = __VLS_69.apply(void 0, __spreadArray([{
                    size: (14),
                }], __VLS_functionalComponentArgsRest(__VLS_69), false));
            (__VLS_ctx.totalPct >= 0 ? '+' : '');
            (__VLS_ctx.formatNum(__VLS_ctx.totalPct));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "foot-copy" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-decoration decor-purple" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ class: "summary-card" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-top" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon-box pale-blue" }));
            __VLS_72 = {}.BriefcaseBusiness;
            /** @type {[typeof __VLS_components.BriefcaseBusiness, ]} */ ;
            __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
                size: (17),
            }));
            __VLS_74 = __VLS_73.apply(void 0, __spreadArray([{
                    size: (17),
                }], __VLS_functionalComponentArgsRest(__VLS_73), false));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "value-row" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (__VLS_ctx.holdingCount);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)(__assign({ class: "inline-unit" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "summary-foot" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "dot-marker" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "foot-copy" }));
            (__VLS_ctx.computedPositions.filter(function (p) { return p.market === 'JP'; }).length);
            (__VLS_ctx.computedPositions.filter(function (p) { return p.market === 'US'; }).length);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-decoration decor-blue" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ class: "summary-card fx-card" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "card-top" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "icon-box pale-orange" }));
            __VLS_76 = {}.ArrowLeftRight;
            /** @type {[typeof __VLS_components.ArrowLeftRight, ]} */ ;
            __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
                size: (17),
            }));
            __VLS_78 = __VLS_77.apply(void 0, __spreadArray([{
                    size: (17),
                }], __VLS_functionalComponentArgsRest(__VLS_77), false));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "fx-big" }));
            (__VLS_ctx.fx ? __VLS_ctx.formatNum(__VLS_ctx.fx, 2) : '—');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "summary-foot" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "currency-pair" }));
            __VLS_80 = {}.ArrowLeftRight;
            /** @type {[typeof __VLS_components.ArrowLeftRight, ]} */ ;
            __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
                size: (11),
            }));
            __VLS_82 = __VLS_81.apply(void 0, __spreadArray([{
                    size: (11),
                }], __VLS_functionalComponentArgsRest(__VLS_81), false));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "foot-copy" }));
            (__VLS_ctx.fx ? __VLS_ctx.since(((_o = __VLS_ctx.quoteMap.get('USD/JPY:FX')) === null || _o === void 0 ? void 0 : _o.fetched_at) || '') : '未取得');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "fx-wave" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                viewBox: "0 0 130 36",
                preserveAspectRatio: "none",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
                d: "M0 25 Q11 28 19 21T38 23T57 15T77 21T99 10T130 8",
            });
        }
        if (__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "main-grid" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ class: "panel chart-panel" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "panel-heading" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "period-switch" }));
            _loop_2 = function (p) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
                        var _a = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            _a[_i] = arguments[_i];
                        }
                        var $event = _a[0];
                        if (!(__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings'))
                            return;
                        __VLS_ctx.period = p;
                    } }, { key: (p) }), { class: ({ selected: __VLS_ctx.period === p }) }));
                (p);
            };
            for (_i = 0, _a = __VLS_getVForSourceType((['1W', '1M', '3M', '1Y', 'ALL'])); _i < _a.length; _i++) {
                p = _a[_i][0];
                _loop_2(p);
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-big-row" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (__VLS_ctx.formatYen(__VLS_ctx.totalValue));
            if (__VLS_ctx.chartPoints.length > 1) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: (__VLS_ctx.chartChange >= 0 ? 'chart-positive' : 'chart-negative') }));
                __VLS_84 = ((__VLS_ctx.chartChange >= 0 ? __VLS_ctx.ArrowUpRight : __VLS_ctx.ArrowDownRight));
                __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
                    size: (15),
                }));
                __VLS_86 = __VLS_85.apply(void 0, __spreadArray([{
                        size: (15),
                    }], __VLS_functionalComponentArgsRest(__VLS_85), false));
                (__VLS_ctx.chartChange >= 0 ? '+' : '');
                (__VLS_ctx.formatYen(__VLS_ctx.chartChange));
            }
            else {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "chart-empty-hint" }));
            }
            if (__VLS_ctx.chartPoints.length > 1) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-wrap" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-y" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (__VLS_ctx.formatYen(Math.max.apply(Math, __VLS_ctx.chartPoints.map(function (x) { return x.value_jpy; })), true));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (__VLS_ctx.formatYen((Math.max.apply(Math, __VLS_ctx.chartPoints.map(function (x) { return x.value_jpy; })) + Math.min.apply(Math, __VLS_ctx.chartPoints.map(function (x) { return x.value_jpy; }))) / 2, true));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (__VLS_ctx.formatYen(Math.min.apply(Math, __VLS_ctx.chartPoints.map(function (x) { return x.value_jpy; })), true));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(__assign({ viewBox: "0 0 100 100", preserveAspectRatio: "none" }, { class: "portfolio-chart" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.defs, __VLS_intrinsicElements.defs)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.linearGradient, __VLS_intrinsicElements.linearGradient)({
                    id: "area",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
                    offset: "0%",
                    'stop-color': "#6a9a76",
                    'stop-opacity': ".19",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.stop)({
                    offset: "100%",
                    'stop-color': "#6a9a76",
                    'stop-opacity': "0",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
                    d: (__VLS_ctx.chartArea),
                    fill: "url(#area)",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
                    d: (__VLS_ctx.chartPath),
                    fill: "none",
                    stroke: "#638a6c",
                    'stroke-width': ".72",
                    'vector-effect': "non-scaling-stroke",
                    'stroke-linecap': "round",
                    'stroke-linejoin': "round",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-x" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (__VLS_ctx.formatDate(((_p = __VLS_ctx.chartPoints[0]) === null || _p === void 0 ? void 0 : _p.day) || ''));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (__VLS_ctx.formatDate(((_q = __VLS_ctx.chartPoints[Math.floor(__VLS_ctx.chartPoints.length / 2)]) === null || _q === void 0 ? void 0 : _q.day) || ''));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (__VLS_ctx.formatDate(((_r = __VLS_ctx.chartPoints.at(-1)) === null || _r === void 0 ? void 0 : _r.day) || ''));
            }
            else {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-placeholder" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "placeholder-grid" }));
                for (_b = 0, _c = __VLS_getVForSourceType((4)); _b < _c.length; _b++) {
                    n = _c[_b][0];
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                        key: (n),
                    });
                }
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "placeholder-zero" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "placeholder-icon" }));
                __VLS_88 = {}.Activity;
                /** @type {[typeof __VLS_components.Activity, ]} */ ;
                __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
                    size: (20),
                }));
                __VLS_90 = __VLS_89.apply(void 0, __spreadArray([{
                        size: (20),
                    }], __VLS_functionalComponentArgsRest(__VLS_89), false));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.refreshQuotes) }, { class: "text-action" }), { disabled: (__VLS_ctx.refreshing) }));
                if (__VLS_ctx.refreshing) {
                    __VLS_92 = {}.LoaderCircle;
                    /** @type {[typeof __VLS_components.LoaderCircle, ]} */ ;
                    __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92(__assign({ size: (14) }, { class: "spin" })));
                    __VLS_94 = __VLS_93.apply(void 0, __spreadArray([__assign({ size: (14) }, { class: "spin" })], __VLS_functionalComponentArgsRest(__VLS_93), false));
                }
                else {
                    __VLS_96 = {}.Activity;
                    /** @type {[typeof __VLS_components.Activity, ]} */ ;
                    __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
                        size: (14),
                    }));
                    __VLS_98 = __VLS_97.apply(void 0, __spreadArray([{
                            size: (14),
                        }], __VLS_functionalComponentArgsRest(__VLS_97), false));
                }
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-x" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-bottom" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "legend" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "chart-meta" }));
            __VLS_100 = {}.Clock3;
            /** @type {[typeof __VLS_components.Clock3, ]} */ ;
            __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
                size: (13),
            }));
            __VLS_102 = __VLS_101.apply(void 0, __spreadArray([{
                    size: (13),
                }], __VLS_functionalComponentArgsRest(__VLS_101), false));
            (__VLS_ctx.snapshots.length ? "\u6700\u7D42\u8A18\u9332 ".concat(__VLS_ctx.formatDate(__VLS_ctx.snapshots.at(-1).day)) : '記録なし');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ class: "panel allocation-panel" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "panel-heading" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings'))
                        return;
                    __VLS_ctx.page = 'holdings';
                } }, { class: "more-button" }));
            __VLS_104 = {}.MoreHorizontal;
            /** @type {[typeof __VLS_components.MoreHorizontal, ]} */ ;
            __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
                size: (19),
            }));
            __VLS_106 = __VLS_105.apply(void 0, __spreadArray([{
                    size: (19),
                }], __VLS_functionalComponentArgsRest(__VLS_105), false));
            if (__VLS_ctx.computedPositions.length) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "allocation-body" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "donut" }, { style: (__VLS_ctx.donutStyle) }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "donut-center" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                (__VLS_ctx.computedPositions.length);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "allocation-list" }));
                for (_d = 0, _e = __VLS_getVForSourceType((__spreadArray([], __VLS_ctx.computedPositions, true).sort(function (a, b) { return b.value - a.value; }).slice(0, 4))); _d < _e.length; _d++) {
                    _f = _e[_d], p = _f[0], i = _f[1];
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (p.symbol) }, { class: "allocation-row" }));
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ style: ({ background: __VLS_ctx.colors[i % __VLS_ctx.colors.length] }) }));
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "alloc-name" }));
                    (p.name);
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                    (__VLS_ctx.totalValue ? __VLS_ctx.formatNum((p.value * (p.currency === 'USD' ? __VLS_ctx.fx : 1)) / __VLS_ctx.totalValue * 100, 0) : 0);
                }
            }
            else {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "allocation-empty" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "allocation-empty-donut" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings'))
                        return;
                    __VLS_ctx.page = 'holdings';
                } }, { class: "allocation-link" }));
            __VLS_108 = {}.ChevronRight;
            /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
            __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
                size: (14),
            }));
            __VLS_110 = __VLS_109.apply(void 0, __spreadArray([{
                    size: (14),
                }], __VLS_functionalComponentArgsRest(__VLS_109), false));
        }
        if (__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "panel holdings-panel" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-heading" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            (__VLS_ctx.page === 'holdings' ? '保有資産' : '保有銘柄');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-tools" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "search-box" }));
            __VLS_112 = {}.Search;
            /** @type {[typeof __VLS_components.Search, ]} */ ;
            __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
                size: (15),
            }));
            __VLS_114 = __VLS_113.apply(void 0, __spreadArray([{
                    size: (15),
                }], __VLS_functionalComponentArgsRest(__VLS_113), false));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                placeholder: "銘柄を検索",
            });
            (__VLS_ctx.search);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                    var _a;
                    var _b = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _b[_i] = arguments[_i];
                    }
                    var $event = _b[0];
                    if (!(__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings'))
                        return;
                    (_a = __VLS_ctx.csvInput) === null || _a === void 0 ? void 0 : _a.click();
                } }, { class: "button button-outline" }));
            __VLS_116 = {}.Upload;
            /** @type {[typeof __VLS_components.Upload, ]} */ ;
            __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
                size: (14),
            }));
            __VLS_118 = __VLS_117.apply(void 0, __spreadArray([{
                    size: (14),
                }], __VLS_functionalComponentArgsRest(__VLS_117), false));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)(__assign({ onChange: (__VLS_ctx.importCsv) }, { ref: "csvInput", type: "file", accept: ".csv,text/csv", hidden: true }));
            /** @type {typeof __VLS_ctx.csvInput} */ ;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.exportCsv) }, { class: "button button-outline" }));
            __VLS_120 = {}.Download;
            /** @type {[typeof __VLS_components.Download, ]} */ ;
            __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
                size: (14),
            }));
            __VLS_122 = __VLS_121.apply(void 0, __spreadArray([{
                    size: (14),
                }], __VLS_functionalComponentArgsRest(__VLS_121), false));
            if (__VLS_ctx.page === 'overview') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.openAdd) }, { class: "button button-mini-dark" }));
                __VLS_124 = {}.Plus;
                /** @type {[typeof __VLS_components.Plus, ]} */ ;
                __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
                    size: (15),
                }));
                __VLS_126 = __VLS_125.apply(void 0, __spreadArray([{
                        size: (15),
                    }], __VLS_functionalComponentArgsRest(__VLS_125), false));
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-scroll" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.refreshQuotes) }, { class: "refresh-inline" }), { disabled: (__VLS_ctx.refreshing), title: ('更新 · ' + __VLS_ctx.since(__VLS_ctx.capturedAt)) }));
            if (__VLS_ctx.refreshing) {
                __VLS_128 = {}.LoaderCircle;
                /** @type {[typeof __VLS_components.LoaderCircle, ]} */ ;
                __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128(__assign({ size: (12) }, { class: "spin" })));
                __VLS_130 = __VLS_129.apply(void 0, __spreadArray([__assign({ size: (12) }, { class: "spin" })], __VLS_functionalComponentArgsRest(__VLS_129), false));
            }
            else {
                __VLS_132 = {}.Activity;
                /** @type {[typeof __VLS_components.Activity, ]} */ ;
                __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
                    size: (12),
                }));
                __VLS_134 = __VLS_133.apply(void 0, __spreadArray([{
                        size: (12),
                    }], __VLS_functionalComponentArgsRest(__VLS_133), false));
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
            _loop_3 = function (p) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                    key: (p.symbol),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "asset-cell" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "asset-logo" }, { class: (p.market === 'US' ? 'logo-us' : 'logo-jp') }));
                (p.symbol.slice(0, 1));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                (p.name);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
                (p.symbol);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "market-badge" }, { class: (p.market === 'JP' ? 'badge-jp' : 'badge-us') }));
                (p.market === 'JP' ? '🇯🇵 東証' : '🇺🇸 US');
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "num-cell" }));
                (__VLS_ctx.formatNum(p.quantity, 4));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "num-cell" }));
                (__VLS_ctx.formatMoney(p.average_cost, p.currency));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "num-cell" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                (p.price ? __VLS_ctx.formatMoney(p.price, p.currency) : '—');
                __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)(__assign({ class: "quote-age" }));
                (p.quote ? __VLS_ctx.since(p.quote.fetched_at) : '未取得');
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "num-cell" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                (p.price ? __VLS_ctx.formatMoney(p.value, p.currency) : '—');
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "num-cell" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: (p.pnl >= 0 ? 'positive-text' : 'negative-text') }));
                (p.price ? "".concat(p.pnl >= 0 ? '+' : '').concat(__VLS_ctx.formatMoney(p.pnl, p.currency), " (").concat(p.pct >= 0 ? '+' : '').concat(__VLS_ctx.formatNum(p.pct), "%)") : '—');
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
                        var _a = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            _a[_i] = arguments[_i];
                        }
                        var $event = _a[0];
                        if (!(__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings'))
                            return;
                        __VLS_ctx.form.value = __assign(__assign({}, __VLS_ctx.blankForm()), { symbol: p.symbol, name: p.name, market: p.market, currency: p.currency, side: 'BUY' });
                        __VLS_ctx.editing = null;
                        __VLS_ctx.modal = true;
                    } }, { class: "row-action" }), { title: (p.name + 'の取引を追加') }));
                var __VLS_136 = {}.Plus;
                /** @type {[typeof __VLS_components.Plus, ]} */ ;
                // @ts-ignore
                var __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
                    size: (15),
                }));
                var __VLS_138 = __VLS_137.apply(void 0, __spreadArray([{
                        size: (15),
                    }], __VLS_functionalComponentArgsRest(__VLS_137), false));
            };
            for (_g = 0, _h = __VLS_getVForSourceType((__VLS_ctx.filtered.slice(0, __VLS_ctx.page === 'overview' ? 5 : 100))); _g < _h.length; _g++) {
                p = _h[_g][0];
                _loop_3(p);
            }
            if (!__VLS_ctx.filtered.length) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    colspan: "8",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-table" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-art" }));
                __VLS_140 = {}.Wallet;
                /** @type {[typeof __VLS_components.Wallet, ]} */ ;
                __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({
                    size: (22),
                }));
                __VLS_142 = __VLS_141.apply(void 0, __spreadArray([{
                        size: (22),
                    }], __VLS_functionalComponentArgsRest(__VLS_141), false));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.openAdd) }, { class: "button button-dark" }));
                __VLS_144 = {}.Plus;
                /** @type {[typeof __VLS_components.Plus, ]} */ ;
                __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({
                    size: (15),
                }));
                __VLS_146 = __VLS_145.apply(void 0, __spreadArray([{
                        size: (15),
                    }], __VLS_functionalComponentArgsRest(__VLS_145), false));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)(__assign({ onClick: (__VLS_ctx.downloadTemplate) }));
            }
            if (__VLS_ctx.page === 'overview' && __VLS_ctx.filtered.length > 5) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-footer" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (__VLS_ctx.filtered.length);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                        var _a = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            _a[_i] = arguments[_i];
                        }
                        var $event = _a[0];
                        if (!(__VLS_ctx.page === 'overview' || __VLS_ctx.page === 'holdings'))
                            return;
                        if (!(__VLS_ctx.page === 'overview' && __VLS_ctx.filtered.length > 5))
                            return;
                        __VLS_ctx.page = 'holdings';
                    } }));
                __VLS_148 = {}.ArrowUpRight;
                /** @type {[typeof __VLS_components.ArrowUpRight, ]} */ ;
                __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({
                    size: (14),
                }));
                __VLS_150 = __VLS_149.apply(void 0, __spreadArray([{
                        size: (14),
                    }], __VLS_functionalComponentArgsRest(__VLS_149), false));
            }
        }
        if (__VLS_ctx.page === 'overview') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ id: "markets" }, { class: "market-section" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "section-title" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "eyebrow" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.refreshQuotes) }, { class: "button button-quiet" }), { disabled: (__VLS_ctx.refreshing) }));
            if (__VLS_ctx.refreshing) {
                __VLS_152 = {}.LoaderCircle;
                /** @type {[typeof __VLS_components.LoaderCircle, ]} */ ;
                __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152(__assign({ size: (15) }, { class: "spin" })));
                __VLS_154 = __VLS_153.apply(void 0, __spreadArray([__assign({ size: (15) }, { class: "spin" })], __VLS_functionalComponentArgsRest(__VLS_153), false));
            }
            else {
                __VLS_156 = {}.Activity;
                /** @type {[typeof __VLS_components.Activity, ]} */ ;
                __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
                    size: (15),
                }));
                __VLS_158 = __VLS_157.apply(void 0, __spreadArray([{
                        size: (15),
                    }], __VLS_functionalComponentArgsRest(__VLS_157), false));
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "market-grid" }));
            for (_j = 0, _k = __VLS_getVForSourceType((__VLS_ctx.markets)); _j < _k.length; _j++) {
                m = _k[_j][0];
                __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ key: (m.symbol) }, { class: "market-card" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "market-card-head" }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "flag" }));
                (m.flag);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                (m.name);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
                (m.region);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.refreshQuotes) }, { title: "価格を更新" }));
                __VLS_160 = {}.ExternalLink;
                /** @type {[typeof __VLS_components.ExternalLink, ]} */ ;
                __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({
                    size: (14),
                }));
                __VLS_162 = __VLS_161.apply(void 0, __spreadArray([{
                        size: (14),
                    }], __VLS_functionalComponentArgsRest(__VLS_161), false));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "market-price" }));
                (__VLS_ctx.quoteMap.get("".concat(m.symbol, ":USD")) ? __VLS_ctx.formatMoney(__VLS_ctx.quoteMap.get("".concat(m.symbol, ":USD")).price, 'USD') : '—');
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "market-card-foot" }));
                if (((_s = __VLS_ctx.quoteMap.get("".concat(m.symbol, ":USD"))) === null || _s === void 0 ? void 0 : _s.change_pct) != null) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: (__VLS_ctx.quoteMap.get("".concat(m.symbol, ":USD")).change_pct >= 0 ? 'positive-text' : 'negative-text') }));
                    __VLS_164 = ((__VLS_ctx.quoteMap.get("".concat(m.symbol, ":USD")).change_pct >= 0 ? __VLS_ctx.ArrowUpRight : __VLS_ctx.ArrowDownRight));
                    __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
                        size: (14),
                    }));
                    __VLS_166 = __VLS_165.apply(void 0, __spreadArray([{
                            size: (14),
                        }], __VLS_functionalComponentArgsRest(__VLS_165), false));
                    (__VLS_ctx.formatNum(__VLS_ctx.quoteMap.get("".concat(m.symbol, ":USD")).change_pct));
                }
                else {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "missing-quote" }));
                }
                __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
                (__VLS_ctx.quoteMap.get("".concat(m.symbol, ":USD")) ? __VLS_ctx.since(__VLS_ctx.quoteMap.get("".concat(m.symbol, ":USD")).fetched_at) : '—');
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "market-footnote" }));
            __VLS_168 = {}.CircleHelp;
            /** @type {[typeof __VLS_components.CircleHelp, ]} */ ;
            __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({
                size: (14),
            }));
            __VLS_170 = __VLS_169.apply(void 0, __spreadArray([{
                    size: (14),
                }], __VLS_functionalComponentArgsRest(__VLS_169), false));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.page === 'overview'))
                        return;
                    __VLS_ctx.settingsOpen = true;
                } }));
            __VLS_172 = {}.ChevronRight;
            /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
            __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({
                size: (12),
            }));
            __VLS_174 = __VLS_173.apply(void 0, __spreadArray([{
                    size: (12),
                }], __VLS_functionalComponentArgsRest(__VLS_173), false));
        }
        if (__VLS_ctx.page === 'overview') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "bottom-grid" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ class: "panel activity-panel" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "panel-heading" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.page === 'overview'))
                        return;
                    __VLS_ctx.page = 'activity';
                } }, { class: "inline-link" }));
            __VLS_176 = {}.ArrowUpRight;
            /** @type {[typeof __VLS_components.ArrowUpRight, ]} */ ;
            __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({
                size: (14),
            }));
            __VLS_178 = __VLS_177.apply(void 0, __spreadArray([{
                    size: (14),
                }], __VLS_functionalComponentArgsRest(__VLS_177), false));
            if (__VLS_ctx.filteredTrades.length) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "activity-list" }));
                for (_l = 0, _m = __VLS_getVForSourceType((__VLS_ctx.filteredTrades.slice(0, 4))); _l < _m.length; _l++) {
                    t = _m[_l][0];
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (t.id) }, { class: "activity-row" }));
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "activity-logo" }, { class: (t.market === 'JP' ? 'logo-jp' : 'logo-us') }));
                    (t.symbol.slice(0, 1));
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "activity-info" }));
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                    (t.name);
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
                    (t.symbol);
                    (__VLS_ctx.formatDate(t.trade_date));
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "side-badge" }, { class: (t.side === 'BUY' ? 'side-buy' : 'side-sell') }));
                    (t.side === 'BUY' ? '買付' : '売却');
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "activity-value" }));
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
                    (__VLS_ctx.formatMoney(t.quantity * t.price, t.currency));
                }
                /b><small>{{formatNum(t.quantity,4));
            }
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "activity-empty" }));
            __VLS_180 = {}.CalendarDays;
            /** @type {[typeof __VLS_components.CalendarDays, ]} */ ;
            __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({
                size: (19),
            }));
            __VLS_182 = __VLS_181.apply(void 0, __spreadArray([{
                    size: (19),
                }], __VLS_functionalComponentArgsRest(__VLS_181), false));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)(__assign({ class: "insight-card" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "insight-glow" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "insight-head" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "insight-icon" }));
        __VLS_184 = {}.Sparkles;
        /** @type {[typeof __VLS_components.Sparkles, ]} */ ;
        __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
            size: (16),
        }));
        __VLS_186 = __VLS_185.apply(void 0, __spreadArray([{
                size: (16),
            }], __VLS_functionalComponentArgsRest(__VLS_185), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.holdingCount ? '投資の全体像を<br>チェックしましょう' : '自分の資産を<br>ひとつの場所に。');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.holdingCount ? '保有銘柄の目標価格を設定すると、価格との差を一覧で確認できます。AIによる投資判断は行いません。' : '買付価格や数量を登録するだけで、損益や円換算の評価額をまとめて確認できます。');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(__VLS_ctx.page === 'overview'))
                    return;
                __VLS_ctx.holdingCount ? (__VLS_ctx.page = 'holdings') : __VLS_ctx.openAdd();
            } }));
        (__VLS_ctx.holdingCount ? '保有資産を確認' : '最初の取引を登録');
        __VLS_188 = {}.ArrowUpRight;
        /** @type {[typeof __VLS_components.ArrowUpRight, ]} */ ;
        __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({
            size: (14),
        }));
        __VLS_190 = __VLS_189.apply(void 0, __spreadArray([{
                size: (14),
            }], __VLS_functionalComponentArgsRest(__VLS_189), false));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "insight-squiggle" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            viewBox: "0 0 160 65",
            preserveAspectRatio: "none",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
            d: "M0 57 Q18 50 29 42 T51 39 T72 25 T93 32 T112 16 T135 20 T160 3",
        });
        return [2 /*return*/];
    });
}); });
if (__VLS_ctx.page === 'activity') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "panel activity-table-panel" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-heading" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.trades.length);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-tools" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a;
            var _b = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _b[_i] = arguments[_i];
            }
            var $event = _b[0];
            if (!(__VLS_ctx.page === 'activity'))
                return;
            (_a = __VLS_ctx.csvInput) === null || _a === void 0 ? void 0 : _a.click();
        } }, { class: "button button-outline" }));
    var __VLS_192 = {}.Upload;
    /** @type {[typeof __VLS_components.Upload, ]} */ ;
    // @ts-ignore
    var __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({
        size: (14),
    }));
    var __VLS_194 = __VLS_193.apply(void 0, __spreadArray([{
            size: (14),
        }], __VLS_functionalComponentArgsRest(__VLS_193), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.exportCsv) }, { class: "button button-outline" }));
    var __VLS_196 = {}.Download;
    /** @type {[typeof __VLS_components.Download, ]} */ ;
    // @ts-ignore
    var __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({
        size: (14),
    }));
    var __VLS_198 = __VLS_197.apply(void 0, __spreadArray([{
            size: (14),
        }], __VLS_functionalComponentArgsRest(__VLS_197), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.openAdd) }, { class: "button button-dark" }));
    var __VLS_200 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    var __VLS_201 = __VLS_asFunctionalComponent(__VLS_200, new __VLS_200({
        size: (15),
    }));
    var __VLS_202 = __VLS_201.apply(void 0, __spreadArray([{
            size: (15),
        }], __VLS_functionalComponentArgsRest(__VLS_201), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "table-scroll" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    var _loop_1 = function (t) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)(__assign(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(__VLS_ctx.page === 'activity'))
                    return;
                __VLS_ctx.openEdit(t);
            } }, { key: (t.id) }), { class: "clickable-row" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "asset-cell" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "asset-logo" }, { class: (t.market === 'US' ? 'logo-us' : 'logo-jp') }));
        (t.symbol.slice(0, 1));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
        (t.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
        (t.symbol);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "side-badge" }, { class: (t.side === 'BUY' ? 'side-buy' : 'side-sell') }));
        (t.side === 'BUY' ? '買付' : '売却');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (__VLS_ctx.formatDate(t.trade_date));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "num-cell" }));
        (__VLS_ctx.formatNum(t.quantity, 4));
    };
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.trades)); _i < _a.length; _i++) {
        var t = _a[_i][0];
        _loop_1(t);
    }
    /td><td class="num-cell">{{formatMoney(t.price,t.currency));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "num-cell" }));
    (__VLS_ctx.formatMoney(t.fee, t.currency));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)(__assign({ class: "num-cell" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    (__VLS_ctx.formatMoney(t.quantity * t.price, t.currency));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.page === 'activity'))
                return;
            __VLS_ctx.deleteTrade(t.id);
        } }, { class: "row-action" }), { title: "削除" }));
    var __VLS_204 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    var __VLS_205 = __VLS_asFunctionalComponent(__VLS_204, new __VLS_204({
        size: (14),
    }));
    var __VLS_206 = __VLS_205.apply(void 0, __spreadArray([{
            size: (14),
        }], __VLS_functionalComponentArgsRest(__VLS_205), false));
}
if (!__VLS_ctx.trades.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        colspan: "8",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-table" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "empty-art" }));
    var __VLS_208 = {}.ArrowLeftRight;
    /** @type {[typeof __VLS_components.ArrowLeftRight, ]} */ ;
    // @ts-ignore
    var __VLS_209 = __VLS_asFunctionalComponent(__VLS_208, new __VLS_208({
        size: (22),
    }));
    var __VLS_210 = __VLS_209.apply(void 0, __spreadArray([{
            size: (22),
        }], __VLS_functionalComponentArgsRest(__VLS_209), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.openAdd) }, { class: "button button-dark" }));
    var __VLS_212 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    var __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({
        size: (15),
    }));
    var __VLS_214 = __VLS_213.apply(void 0, __spreadArray([{
            size: (15),
        }], __VLS_functionalComponentArgsRest(__VLS_213), false));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)(__assign({ class: "app-footer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_216 = {}.ShieldCheck;
/** @type {[typeof __VLS_components.ShieldCheck, ]} */ ;
// @ts-ignore
var __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
    size: (13),
}));
var __VLS_218 = __VLS_217.apply(void 0, __spreadArray([{
        size: (13),
    }], __VLS_functionalComponentArgsRest(__VLS_217), false));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({});
if (__VLS_ctx.modal) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.modal))
                return;
            __VLS_ctx.modal = false;
        } }, { class: "modal-backdrop" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "modal-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-head" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "eyebrow" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.editing ? '取引を編集' : 'PORTFOLIO ACTIVITY');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.editing ? '取引を編集' : '取引を追加');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.modal))
                return;
            __VLS_ctx.modal = false;
        } }, { class: "icon-button" }));
    var __VLS_220 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    var __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({
        size: (18),
    }));
    var __VLS_222 = __VLS_221.apply(void 0, __spreadArray([{
            size: (18),
        }], __VLS_functionalComponentArgsRest(__VLS_221), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "modal-copy" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "side-toggle" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.modal))
                return;
            __VLS_ctx.form.side = 'BUY';
        } }, { class: ({ chosen: __VLS_ctx.form.side === 'BUY' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.modal))
                return;
            __VLS_ctx.form.side = 'SELL';
        } }, { class: ({ chosen: __VLS_ctx.form.side === 'SELL' }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "form-grid" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "wide" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        placeholder: "例: 7203.T / AAPL",
        autocomplete: "off",
    });
    (__VLS_ctx.form.symbol);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "wide" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        placeholder: "例: トヨタ自動車",
    });
    (__VLS_ctx.form.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(__assign({ onChange: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.modal))
                return;
            __VLS_ctx.form.currency = __VLS_ctx.form.market === 'JP' ? 'JPY' : 'USD';
        } }, { value: (__VLS_ctx.form.market) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "JP",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "US",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.form.currency),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "JPY",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "USD",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "date",
    });
    (__VLS_ctx.form.trade_date);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        step: "any",
        min: "0",
        placeholder: "100",
    });
    (__VLS_ctx.form.quantity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        step: "any",
        min: "0",
        placeholder: "3,250",
    });
    (__VLS_ctx.form.price);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        step: "any",
        min: "0",
        placeholder: "0",
    });
    (__VLS_ctx.form.fee);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "wide" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)(__assign({ class: "optional" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        step: "any",
        min: "0",
        placeholder: "設定すると目標との差を確認できます",
    });
    (__VLS_ctx.form.target_price);
    if (__VLS_ctx.formError) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "form-error" }));
        (__VLS_ctx.formError);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-foot" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    var __VLS_224 = {}.ShieldCheck;
    /** @type {[typeof __VLS_components.ShieldCheck, ]} */ ;
    // @ts-ignore
    var __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
        size: (14),
    }));
    var __VLS_226 = __VLS_225.apply(void 0, __spreadArray([{
            size: (14),
        }], __VLS_functionalComponentArgsRest(__VLS_225), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.modal))
                return;
            __VLS_ctx.modal = false;
        } }, { class: "button button-quiet" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.saveTrade) }, { class: "button button-dark" }));
    var __VLS_228 = {}.Check;
    /** @type {[typeof __VLS_components.Check, ]} */ ;
    // @ts-ignore
    var __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({
        size: (15),
    }));
    var __VLS_230 = __VLS_229.apply(void 0, __spreadArray([{
            size: (15),
        }], __VLS_functionalComponentArgsRest(__VLS_229), false));
    (__VLS_ctx.editing ? '変更を保存' : '取引を保存');
}
if (__VLS_ctx.settingsOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.settingsOpen))
                return;
            __VLS_ctx.settingsOpen = false;
        } }, { class: "modal-backdrop" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(__assign({ class: "modal-card settings-modal" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "modal-head" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "eyebrow" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.settingsOpen))
                return;
            __VLS_ctx.settingsOpen = false;
        } }, { class: "icon-button" }));
    var __VLS_232 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    var __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
        size: (18),
    }));
    var __VLS_234 = __VLS_233.apply(void 0, __spreadArray([{
            size: (18),
        }], __VLS_functionalComponentArgsRest(__VLS_233), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "modal-copy" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "provider-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "provider-logo" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "provider-status" }, { class: (__VLS_ctx.keyState ? 'is-connected' : '') }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({});
    (__VLS_ctx.keyState ? '設定済み' : '未設定');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "settings-label" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "password",
        placeholder: "APIキーを入力",
        autocomplete: "new-password",
    });
    (__VLS_ctx.apiKey);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "settings-actions" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: "https://www.alphavantage.co/support/#api-key",
        target: "_blank",
        rel: "noreferrer",
    });
    var __VLS_236 = {}.ExternalLink;
    /** @type {[typeof __VLS_components.ExternalLink, ]} */ ;
    // @ts-ignore
    var __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
        size: (13),
    }));
    var __VLS_238 = __VLS_237.apply(void 0, __spreadArray([{
            size: (13),
        }], __VLS_functionalComponentArgsRest(__VLS_237), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.storeKey) }, { class: "button button-dark" }));
    var __VLS_240 = {}.Check;
    /** @type {[typeof __VLS_components.Check, ]} */ ;
    // @ts-ignore
    var __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
        size: (15),
    }));
    var __VLS_242 = __VLS_241.apply(void 0, __spreadArray([{
            size: (15),
        }], __VLS_functionalComponentArgsRest(__VLS_241), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "settings-divider" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "settings-block" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.b, __VLS_intrinsicElements.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "settings-actions" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.exportBackup) }, { class: "button button-outline" }));
    var __VLS_244 = {}.Download;
    /** @type {[typeof __VLS_components.Download, ]} */ ;
    // @ts-ignore
    var __VLS_245 = __VLS_asFunctionalComponent(__VLS_244, new __VLS_244({
        size: (14),
    }));
    var __VLS_246 = __VLS_245.apply(void 0, __spreadArray([{
            size: (14),
        }], __VLS_functionalComponentArgsRest(__VLS_245), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a;
            var _b = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _b[_i] = arguments[_i];
            }
            var $event = _b[0];
            if (!(__VLS_ctx.settingsOpen))
                return;
            (_a = __VLS_ctx.backupInput) === null || _a === void 0 ? void 0 : _a.click();
        } }, { class: "button button-outline" }));
    var __VLS_248 = {}.FileUp;
    /** @type {[typeof __VLS_components.FileUp, ]} */ ;
    // @ts-ignore
    var __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({
        size: (14),
    }));
    var __VLS_250 = __VLS_249.apply(void 0, __spreadArray([{
            size: (14),
        }], __VLS_functionalComponentArgsRest(__VLS_249), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)(__assign({ onChange: (__VLS_ctx.restoreBackup) }, { ref: "backupInput", type: "file", accept: ".json,application/json", hidden: true }));
    /** @type {typeof __VLS_ctx.backupInput} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "settings-disclaimer" }));
    var __VLS_252 = {}.CircleHelp;
    /** @type {[typeof __VLS_components.CircleHelp, ]} */ ;
    // @ts-ignore
    var __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
        size: (15),
    }));
    var __VLS_254 = __VLS_253.apply(void 0, __spreadArray([{
            size: (15),
        }], __VLS_functionalComponentArgsRest(__VLS_253), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    if (__VLS_ctx.keyState) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.clearKey) }, { class: "clear-key" }));
    }
}
var __VLS_256 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
var __VLS_257 = __VLS_asFunctionalComponent(__VLS_256, new __VLS_256({
    name: "toast",
}));
var __VLS_258 = __VLS_257.apply(void 0, __spreadArray([{
        name: "toast",
    }], __VLS_functionalComponentArgsRest(__VLS_257), false));
__VLS_259.slots.default;
if (__VLS_ctx.toast) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "toast" }));
    var __VLS_260 = {}.Check;
    /** @type {[typeof __VLS_components.Check, ]} */ ;
    // @ts-ignore
    var __VLS_261 = __VLS_asFunctionalComponent(__VLS_260, new __VLS_260({
        size: (16),
    }));
    var __VLS_262 = __VLS_261.apply(void 0, __spreadArray([{
            size: (16),
        }], __VLS_functionalComponentArgsRest(__VLS_261), false));
    (__VLS_ctx.toast);
}
var __VLS_259;
/** @type {__VLS_StyleScopedClasses['app-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-mark']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-name']} */ ;
/** @type {__VLS_StyleScopedClasses['brand-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['workspace']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['muted-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-label']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-count']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-label']} */ ;
/** @type {__VLS_StyleScopedClasses['market-nav-label']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['privacy-note']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['user-row']} */ ;
/** @type {__VLS_StyleScopedClasses['user-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['muted-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['main-area']} */ ;
/** @type {__VLS_StyleScopedClasses['topbar']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumbs']} */ ;
/** @type {__VLS_StyleScopedClasses['top-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['market-open']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['top-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['welcome-row']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['subhead']} */ ;
/** @type {__VLS_StyleScopedClasses['header-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-quiet']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-strip']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-card']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-top']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-box']} */ ;
/** @type {__VLS_StyleScopedClasses['pale-green']} */ ;
/** @type {__VLS_StyleScopedClasses['value-row']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-foot']} */ ;
/** @type {__VLS_StyleScopedClasses['change-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['foot-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-spark']} */ ;
/** @type {__VLS_StyleScopedClasses['spark-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-top']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-box']} */ ;
/** @type {__VLS_StyleScopedClasses['pale-purple']} */ ;
/** @type {__VLS_StyleScopedClasses['value-row']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-foot']} */ ;
/** @type {__VLS_StyleScopedClasses['change-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['foot-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['card-decoration']} */ ;
/** @type {__VLS_StyleScopedClasses['decor-purple']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-top']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-box']} */ ;
/** @type {__VLS_StyleScopedClasses['pale-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['value-row']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-foot']} */ ;
/** @type {__VLS_StyleScopedClasses['dot-marker']} */ ;
/** @type {__VLS_StyleScopedClasses['foot-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['card-decoration']} */ ;
/** @type {__VLS_StyleScopedClasses['decor-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-card']} */ ;
/** @type {__VLS_StyleScopedClasses['fx-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-top']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-box']} */ ;
/** @type {__VLS_StyleScopedClasses['pale-orange']} */ ;
/** @type {__VLS_StyleScopedClasses['fx-big']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-foot']} */ ;
/** @type {__VLS_StyleScopedClasses['currency-pair']} */ ;
/** @type {__VLS_StyleScopedClasses['foot-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['fx-wave']} */ ;
/** @type {__VLS_StyleScopedClasses['main-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['period-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['selected']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-big-row']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-empty-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-y']} */ ;
/** @type {__VLS_StyleScopedClasses['portfolio-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-x']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-zero']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['text-action']} */ ;
/** @type {__VLS_StyleScopedClasses['spin']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-x']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['legend']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['allocation-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['more-button']} */ ;
/** @type {__VLS_StyleScopedClasses['allocation-body']} */ ;
/** @type {__VLS_StyleScopedClasses['donut']} */ ;
/** @type {__VLS_StyleScopedClasses['donut-center']} */ ;
/** @type {__VLS_StyleScopedClasses['allocation-list']} */ ;
/** @type {__VLS_StyleScopedClasses['allocation-row']} */ ;
/** @type {__VLS_StyleScopedClasses['alloc-name']} */ ;
/** @type {__VLS_StyleScopedClasses['allocation-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['allocation-empty-donut']} */ ;
/** @type {__VLS_StyleScopedClasses['allocation-link']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['holdings-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['table-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['table-tools']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-mini-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['table-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['refresh-inline']} */ ;
/** @type {__VLS_StyleScopedClasses['spin']} */ ;
/** @type {__VLS_StyleScopedClasses['asset-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['asset-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['market-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['num-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['num-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['num-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['quote-age']} */ ;
/** @type {__VLS_StyleScopedClasses['num-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['num-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['row-action']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-table']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-art']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['table-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['market-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-quiet']} */ ;
/** @type {__VLS_StyleScopedClasses['spin']} */ ;
/** @type {__VLS_StyleScopedClasses['market-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['market-card']} */ ;
/** @type {__VLS_StyleScopedClasses['market-card-head']} */ ;
/** @type {__VLS_StyleScopedClasses['flag']} */ ;
/** @type {__VLS_StyleScopedClasses['market-price']} */ ;
/** @type {__VLS_StyleScopedClasses['market-card-foot']} */ ;
/** @type {__VLS_StyleScopedClasses['missing-quote']} */ ;
/** @type {__VLS_StyleScopedClasses['market-footnote']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-link']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-list']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-row']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-info']} */ ;
/** @type {__VLS_StyleScopedClasses['side-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-value']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['insight-card']} */ ;
/** @type {__VLS_StyleScopedClasses['insight-glow']} */ ;
/** @type {__VLS_StyleScopedClasses['insight-head']} */ ;
/** @type {__VLS_StyleScopedClasses['insight-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['insight-squiggle']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-table-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['table-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['table-tools']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['table-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['clickable-row']} */ ;
/** @type {__VLS_StyleScopedClasses['asset-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['asset-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['side-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['num-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['num-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['num-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['row-action']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-table']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-art']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['app-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-backdrop']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-card']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-head']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['side-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['chosen']} */ ;
/** @type {__VLS_StyleScopedClasses['chosen']} */ ;
/** @type {__VLS_StyleScopedClasses['form-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['wide']} */ ;
/** @type {__VLS_StyleScopedClasses['wide']} */ ;
/** @type {__VLS_StyleScopedClasses['wide']} */ ;
/** @type {__VLS_StyleScopedClasses['optional']} */ ;
/** @type {__VLS_StyleScopedClasses['form-error']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-foot']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-quiet']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-backdrop']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-head']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['provider-card']} */ ;
/** @type {__VLS_StyleScopedClasses['provider-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['provider-status']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-label']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-divider']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-block']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['button-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-disclaimer']} */ ;
/** @type {__VLS_StyleScopedClasses['clear-key']} */ ;
/** @type {__VLS_StyleScopedClasses['toast']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            Activity: lucide_vue_next_1.Activity,
            ArrowDownRight: lucide_vue_next_1.ArrowDownRight,
            ArrowLeftRight: lucide_vue_next_1.ArrowLeftRight,
            ArrowUpRight: lucide_vue_next_1.ArrowUpRight,
            BriefcaseBusiness: lucide_vue_next_1.BriefcaseBusiness,
            CalendarDays: lucide_vue_next_1.CalendarDays,
            Check: lucide_vue_next_1.Check,
            ChevronDown: lucide_vue_next_1.ChevronDown,
            ChevronRight: lucide_vue_next_1.ChevronRight,
            CircleHelp: lucide_vue_next_1.CircleHelp,
            Clock3: lucide_vue_next_1.Clock3,
            Download: lucide_vue_next_1.Download,
            ExternalLink: lucide_vue_next_1.ExternalLink,
            FileUp: lucide_vue_next_1.FileUp,
            Globe2: lucide_vue_next_1.Globe2,
            LayoutDashboard: lucide_vue_next_1.LayoutDashboard,
            LoaderCircle: lucide_vue_next_1.LoaderCircle,
            MoreHorizontal: lucide_vue_next_1.MoreHorizontal,
            Plus: lucide_vue_next_1.Plus,
            Search: lucide_vue_next_1.Search,
            Settings2: lucide_vue_next_1.Settings2,
            ShieldCheck: lucide_vue_next_1.ShieldCheck,
            SlidersHorizontal: lucide_vue_next_1.SlidersHorizontal,
            Sparkles: lucide_vue_next_1.Sparkles,
            TrendingUp: lucide_vue_next_1.TrendingUp,
            Upload: lucide_vue_next_1.Upload,
            Wallet: lucide_vue_next_1.Wallet,
            X: lucide_vue_next_1.X,
            trades: trades,
            snapshots: snapshots,
            keyState: keyState,
            apiKey: apiKey,
            refreshing: refreshing,
            toast: toast,
            modal: modal,
            settingsOpen: settingsOpen,
            csvInput: csvInput,
            backupInput: backupInput,
            search: search,
            period: period,
            page: page,
            blankForm: blankForm,
            form: form,
            editing: editing,
            formError: formError,
            quoteMap: quoteMap,
            fx: fx,
            computedPositions: computedPositions,
            totalValue: totalValue,
            totalPnl: totalPnl,
            totalPct: totalPct,
            capturedAt: capturedAt,
            filtered: filtered,
            filteredTrades: filteredTrades,
            holdingCount: holdingCount,
            chartPoints: chartPoints,
            chartPath: chartPath,
            chartArea: chartArea,
            chartChange: chartChange,
            markets: markets,
            formatMoney: formatMoney,
            formatYen: formatYen,
            formatNum: formatNum,
            formatDate: formatDate,
            since: since,
            refreshQuotes: refreshQuotes,
            openAdd: openAdd,
            openEdit: openEdit,
            saveTrade: saveTrade,
            deleteTrade: deleteTrade,
            storeKey: storeKey,
            clearKey: clearKey,
            exportCsv: exportCsv,
            importCsv: importCsv,
            exportBackup: exportBackup,
            restoreBackup: restoreBackup,
            downloadTemplate: downloadTemplate,
            colors: colors,
        };
    },
    computed: { donutStyle: function () {
            var _this = this;
            var arr = this.computedPositions;
            var total = this.totalValue;
            var c = 0;
            var seg = arr.map(function (p, i) { var n = total ? (p.value * (p.currency === 'USD' ? _this.fx : 1)) / total * 100 : 0; var start = c; c += n; return "".concat(colors[i % colors.length], " ").concat(start, "% ").concat(c, "%"); });
            return { background: arr.length ? "conic-gradient(".concat(seg.join(','), ")") : 'conic-gradient(#e7e9e6 0 100%)' };
        } }
});
return (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
    computed: { donutStyle: function () {
            var _this = this;
            var arr = this.computedPositions;
            var total = this.totalValue;
            var c = 0;
            var seg = arr.map(function (p, i) { var n = total ? (p.value * (p.currency === 'USD' ? _this.fx : 1)) / total * 100 : 0; var start = c; c += n; return "".concat(colors[i % colors.length], " ").concat(start, "% ").concat(c, "%"); });
            return { background: arr.length ? "conic-gradient(".concat(seg.join(','), ")") : 'conic-gradient(#e7e9e6 0 100%)' };
        } }
});
(); /* PartiallyEnd: #4569/main.vue */
