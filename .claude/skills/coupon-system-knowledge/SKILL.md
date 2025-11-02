---
name: coupon-system-knowledge
description: Complete knowledge base for Vibe Coding Studio coupon system CSV parsing and updates. Use when implementing /update-coupons command, parsing Udemy coupon CSV files, updating coupon data, converting CSV to RawCouponData, handling timezone conversions, or troubleshooting coupon system issues.
allowed-tools: Read, Write, Edit, Bash
---

# Vibe Coding Studio クーポンシステム知識ベース

`/update-coupons <csv-file-path>` カスタムコマンド実装のための包括的な知識ベース。

## システムアーキテクチャ

```
CSV File → CSVパーサー → RawCouponData配列 → COUPON_DATA更新
  → parseCouponData() → getLatestCoupons() → UI表示
```

**重要な特徴**:
- ハードコード方式（`COUPON_DATA`配列に直接記述）
- 型安全性（TypeScript厳密モード）
- 動的URL生成（slug + couponCode）
- **日付ベースの有効期限管理**（時刻は無視）
- **UTCベースの日付比較**（タイムゾーン依存性なし）
- 5分間メモリキャッシュ

---

## CSVフォーマット仕様

### ヘッダー
```
course_id,coupon_type,coupon_code,start_date,start_time,custom_price
```

### データ例
```csv
6826831,custom_price,2025-11-01,2025-11-01,0:00,1500
6851913,custom_price,2025-11-02,2025-11-02,0:00,1500
```

### 各カラム

| カラム | 形式 | 例 | 説明 |
|--------|------|-----|------|
| course_id | 7桁数値 | `6826831` | Udemy講座ID |
| coupon_type | "custom_price" or "free" | `custom_price` | クーポンタイプ |
| coupon_code | YYYY-MM-DD | `2025-11-01` | **クーポンコード（文字列）** |
| start_date | YYYY-MM-DD | `2025-11-01` | 有効開始日 |
| start_time | HH:MM | `0:00` | **実装では無視（常に00:00:00）** |
| custom_price | 整数 | `1500` | 価格（JPY） |

**重要**:
- `coupon_code`は単なる文字列（通常は日付形式だが、日付として扱わない）
- `start_time`は読み取るが、実装では常に`00:00:00`に正規化される

---

## データ変換ルール

### CSV → RawCouponData

```typescript
CSV: { course_id: "6826831", coupon_code: "2025-11-01", start_date: "2025-11-01", custom_price: 1500 }
  ↓
RawCouponData: {
  courseId: "6826831",
  couponType: "custom_price",
  maximumRedemptions: "unlimited",
  couponCode: "2025-11-01",  // 文字列として保持
  startDateTime: "2025-11-01T00:00:00-07:00",  // 時刻は常に00:00:00
  endDateTime: "2025-12-01T23:00:00-08:00",    // 1ヶ月後
  currency: "JPY",
  discountPrice: 1500
}
```

### フィールド変換詳細

| フィールド | 変換ルール |
|-----------|-----------|
| courseId | CSV course_id をそのまま使用 |
| couponType | CSV coupon_type をそのまま使用 |
| maximumRedemptions | 常に `"unlimited"` |
| couponCode | CSV coupon_code をそのまま使用（文字列） |
| startDateTime | `{start_date}T00:00:00-07:00`（start_timeは無視） |
| endDateTime | startDateから1ヶ月後 `T23:00:00-08:00` |
| currency | 常に `"JPY"` |
| discountPrice | CSV custom_price を数値変換 |

### 重要な実装ポイント

```typescript
// ✅ start_timeは無視し、常に00:00:00に正規化
const startDateTime = `${csvRow.start_date}T00:00:00-07:00`

// ✅ 1ヶ月後の計算
function addMonthToDate(dateString: string): string {
  const date = new Date(dateString + "Z")
  date.setUTCMonth(date.getUTCMonth() + 1)
  return `${year}-${month}-${day}T23:00:00-08:00`
}

// ✅ クーポンコードは文字列として扱う（日付として解釈しない）
const couponCode = csvRow.coupon_code.trim()  // 単なる文字列
```

---

## 型定義

### RawCouponData
```typescript
export interface RawCouponData {
  courseId: string
  couponType: "custom_price" | "free"
  maximumRedemptions: string  // "unlimited"
  couponCode: string          // 文字列（日付形式だが文字列として扱う）
  startDateTime: string       // ISO 8601 (-07:00)
  endDateTime: string         // ISO 8601 (-08:00)
  currency: string            // "JPY"
  discountPrice: number
}
```

---

## 重要なシステム機能

### 1. 有効期限判定（日付ベース）

**重要**: 時刻は完全に無視し、日付のみで判定

```typescript
// ✅ UTCベースの日付比較（タイムゾーン依存性なし）
export function getLatestCoupons(): Coupon[] {
  const allCoupons = parseCouponData(COUPON_DATA)

  // 現在の日付（UTCベース、時刻を00:00:00に正規化）
  const currentDate = new Date()
  const todayUTC = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate()
  )

  // 日付ベースでフィルタリング（時刻は無視）
  const validCoupons = allCoupons.filter(coupon => {
    const start = new Date(coupon.startDateTime)
    const startUTC = Date.UTC(
      start.getUTCFullYear(),
      start.getUTCMonth(),
      start.getUTCDate()
    )

    const end = new Date(coupon.endDateTime)
    const endUTC = Date.UTC(
      end.getUTCFullYear(),
      end.getUTCMonth(),
      end.getUTCDate()
    )

    return startUTC <= todayUTC && endUTC >= todayUTC
  })

  // ... 最新クーポンのみ保持、ソート、キャッシュ
}
```

### 2. 日付表示（時刻なし）

```typescript
// ✅ 日付のみ表示（時刻表示なし）
export function formatDateToJST(date: Date): string {
  // PDTからJSTへの変換（+16時間）
  const jstDate = new Date(date.getTime() + 16 * 60 * 60 * 1000)

  const jstYear = jstDate.getFullYear()
  const jstMonth = String(jstDate.getMonth() + 1).padStart(2, "0")
  const jstDay = String(jstDate.getDate()).padStart(2, "0")

  return `${jstYear}年${jstMonth}月${jstDay}日`  // 時刻なし
}
```

---

## ファイル構造

```
src/
├── types/coupon.ts                    # 型定義
├── constants/coupon-courses.ts        # COURSE_INFO, COURSE_DISPLAY_ORDER
├── lib/coupons/
│   ├── coupon-data.ts                # ⭐ COUPON_DATA配列（更新対象）
│   └── __tests__/coupon-data.test.ts # テスト
├── components/coupons/               # UIコンポーネント
└── data/coupons/uploads/             # 入力CSV
```

---

## CSVパース実装パターン

### 基本パターン（推奨）

```typescript
function parseCSV(csvContent: string): Array<Record<string, string>> {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())

  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(v => v.trim())
      return Object.fromEntries(headers.map((h, i) => [h, values[i]]))
    })
}

function transformToRawCouponData(row: CSVRow): RawCouponData {
  return {
    courseId: row.course_id,
    couponType: row.coupon_type as CouponType,
    maximumRedemptions: "unlimited",
    couponCode: row.coupon_code,  // 文字列として保持
    startDateTime: `${row.start_date}T00:00:00-07:00`,  // start_time無視
    endDateTime: addMonthToDate(row.start_date),
    currency: "JPY",
    discountPrice: parseInt(row.custom_price, 10),
  }
}
```

---

## バリデーション規則

```typescript
// CSV構造
const expectedHeaders = ['course_id', 'coupon_type', 'coupon_code', 'start_date', 'start_time', 'custom_price']

// フィールド検証
/^\d{7}$/.test(courseId)                           // course_id: 7桁数値
COURSE_INFO[courseId] !== undefined                // COURSE_INFOに存在
['custom_price', 'free'].includes(couponType)      // coupon_type
/^\d{4}-\d{2}-\d{2}$/.test(couponCode)            // coupon_code: YYYY-MM-DD
/^\d{4}-\d{2}-\d{2}$/.test(start_date)            // start_date: YYYY-MM-DD
Number.isInteger(discountPrice) && discountPrice > 0  // custom_price: 正の整数
```

---

## マージ戦略

```typescript
// 1. 既存データ読み込み
const existingData = COUPON_DATA

// 2. マージ（courseIdをキーに）
const merged = new Map(existingData.map(d => [d.courseId, d]))
newCoupons.forEach(coupon => merged.set(coupon.courseId, coupon))

// 3. 配列に変換
const updatedData = Array.from(merged.values())

// 4. coupon-data.tsを更新
```

---

## エラーハンドリング

| エラー | 対応 |
|--------|------|
| File not found | CSVパスを確認 |
| Invalid CSV format | ヘッダーチェック |
| Course ID not found | COURSE_INFOを確認 |
| Invalid date format | YYYY-MM-DD形式を確認 |
| Type error | `npm run type-check` |
| Test failure | `npm run test` |

---

## テスト戦略

```bash
# すべての検証を実行
npm run type-check && npm run lint && npm run test
```

**必須チェック項目**:
- ✅ すべてのcourseIdがCOURSE_INFOに存在
- ✅ couponCodeがYYYY-MM-DD形式（文字列として）
- ✅ startDateTime/endDateTimeが有効なDate型
- ✅ endDateTime > startDateTime
- ✅ discountPriceが正の整数
- ✅ 期待される全講座にクーポンが存在

---

## 実装チェックリスト

### 必須実装
- [ ] CSVファイル読み込み
- [ ] ヘッダー検証
- [ ] 各行をパース＆バリデーション
- [ ] RawCouponDataに変換（start_timeは無視、00:00:00に正規化）
- [ ] 既存データとマージ（courseIdをキー）
- [ ] `COUPON_DATA`配列を更新
- [ ] `npm run type-check && npm run lint && npm run test`
- [ ] 結果レポート出力

### 重要な注意点
- ✅ start_timeは読み取るが、実装では常に`00:00:00`
- ✅ couponCodeは文字列（日付として解釈しない）
- ✅ 有効期限判定はUTCベース日付比較（時刻無視）
- ✅ formatDateToJST()は日付のみ返す（時刻なし）
- ✅ タイムゾーン: startDateTime=-07:00, endDateTime=-08:00

---

## AI Assistant Instructions

### 実装手順
1. CSV読み込み＆バリデーション
2. 各行を変換（start_timeは無視、00:00:00固定）
3. 既存データとマージ
4. `coupon-data.ts`を更新
5. `npm run type-check && npm run lint && npm run test`
6. 結果レポート

### Always
- start_timeは無視（常に00:00:00）
- couponCodeは文字列として扱う
- UTCベース日付比較（時刻無視）
- タイムゾーン: -07:00 / -08:00
- 既存クーポン保持（CSV外）
- 全検証パス後のみ完了

### Never
- start_timeを使わない
- couponCodeを日付として解釈しない
- 時刻ベースの判定をしない
- バリデーションをスキップしない
- テスト失敗時に完了としない

---

## 参考ファイル

- 型: `src/types/coupon.ts`
- 定数: `src/constants/coupon-courses.ts`
- コア: `src/lib/coupons/coupon-data.ts`
- テスト: `src/lib/coupons/__tests__/coupon-data.test.ts`
- コマンド: `.claude/commands/update-coupons.md`
