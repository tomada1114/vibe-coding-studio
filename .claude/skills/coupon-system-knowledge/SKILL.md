---
name: coupon-system-knowledge
description: Complete knowledge base for Vibe Coding Studio coupon system CSV parsing and updates. Use when implementing /update-coupons command, parsing Udemy coupon CSV files, updating coupon data, converting CSV to RawCouponData, handling timezone conversions, or troubleshooting coupon system issues.
allowed-tools: Read, Write, Edit, Bash
---

# Vibe Coding Studio クーポンシステム知識ベース

このスキルは、`/update-coupons <csv-file-path>` カスタムコマンドを支援するための包括的な知識ベースです。クーポンCSVのパース、データ変換、システム統合に必要なすべての情報を含みます。

## 目次
1. [クーポンシステムアーキテクチャ](#クーポンシステムアーキテクチャ)
2. [CSVフォーマット仕様](#csvフォーマット仕様)
3. [データ変換ルール](#データ変換ルール)
4. [型定義と対応関係](#型定義と対応関係)
5. [ファイル位置と構造](#ファイル位置と構造)
6. [CSVパース実装パターン](#csvパース実装パターン)
7. [バリデーション規則](#バリデーション規則)
8. [エラーハンドリング](#エラーハンドリング)
9. [テスト戦略](#テスト戦略)
10. [実装チェックリスト](#実装チェックリスト)

---

## クーポンシステムアーキテクチャ

### 全体的なデータフロー

```
CSV File (Udemy管理画面からのエクスポート)
    ↓
CSVパーサー (update-coupons コマンド)
    ↓
RawCouponData配列に変換
    ↓
src/lib/coupons/coupon-data.ts の COUPON_DATA 更新
    ↓
parseCouponData() で Coupon型に変換
    ↓
getLatestCoupons() でフィルタリング・ソート
    ↓
UI表示 (CouponPageLayout, CouponCard等)
```

### システムの重要な特徴

- **ハードコード方式**: すべてのクーポンデータは`src/lib/coupons/coupon-data.ts`の`COUPON_DATA`配列に直接記述
- **型安全性**: TypeScript厳密モードで全クーポンデータの型をチェック
- **動的URL生成**: 講座のslugとcouponCodeから正しいUdemy URLを動的生成
- **有効期限管理**: startDateTimeとendDateTimeで有効期限を自動判定
- **キャッシング**: 5分間のメモリキャッシュで`getLatestCoupons()`を最適化
- **表示順序制御**: `COURSE_DISPLAY_ORDER`で講座の表示順序をカスタマイズ

---

## CSVフォーマット仕様

### CSVヘッダー
```
course_id,coupon_type,coupon_code,start_date,start_time,custom_price
```

### CSVデータ例
```csv
6826831,custom_price,2025-11-01,2025-11-01,0:00,1500
6851913,custom_price,2025-11-02,2025-11-02,0:00,1500
6823465,custom_price,2025-10-10,2025-11-02,0:00,1500
```

### 各カラムの詳細

| カラム名 | 型 | 形式 | 例 | 説明 |
|---------|-----|--------|------------|------|
| course_id | string | 数値 | `6826831` | Udemy講座ID |
| coupon_type | string | "custom_price" または "free" | `custom_price` | クーポンタイプ |
| coupon_code | string | YYYY-MM-DD形式 | `2025-11-01` | クーポンコード（通常は有効開始日） |
| start_date | string | YYYY-MM-DD | `2025-11-01` | クーポン有効開始日 |
| start_time | string | HH:MM または HH:MM:SS | `0:00` | クーポン有効開始時刻（JST） |
| custom_price | number | 整数 | `1500` | クーポン適用後の価格（JPY） |

### バリデーション規則

```typescript
// course_id: 6文字の数値文字列
/^\d{7}$/

// coupon_type: "custom_price" または "free"
["custom_price", "free"].includes(couponType)

// coupon_code: YYYY-MM-DD形式
/^\d{4}-\d{2}-\d{2}$/

// start_date: YYYY-MM-DD形式
/^\d{4}-\d{2}-\d{2}$/

// start_time: HH:MM または HH:MM:SS
/^\d{1,2}:\d{2}(:\d{2})?$/

// custom_price: 正の整数
Number.isInteger(customPrice) && customPrice > 0
```

---

## データ変換ルール

### CSV行から RawCouponData への変換

```typescript
CSV行:
{
  course_id: "6826831",
  coupon_type: "custom_price",
  coupon_code: "2025-11-01",
  start_date: "2025-11-01",
  start_time: "0:00",
  custom_price: 1500
}

↓ 変換ルール適用 ↓

RawCouponData:
{
  courseId: "6826831",
  couponType: "custom_price",
  maximumRedemptions: "unlimited",
  couponCode: "2025-11-01",
  startDateTime: "2025-11-01T00:00:00-07:00",
  endDateTime: "2025-12-01T23:00:00-08:00",
  currency: "JPY",
  discountPrice: 1500
}
```

### フィールド変換詳細

#### 1. courseId
- **入力**: CSV の course_id
- **処理**: そのまま使用（7文字の数値文字列）
- **バリデーション**: COURSE_INFO に該当IDが存在するかチェック

```typescript
const courseId = String(csvRow.course_id).trim()
if (!COURSE_INFO[courseId]) {
  throw new Error(`Course ID ${courseId} not found in COURSE_INFO`)
}
```

#### 2. couponType
- **入力**: CSV の coupon_type
- **処理**: そのまま使用（"custom_price" または "free"）
- **バリデーション**: 許可された値かチェック

```typescript
const couponType = csvRow.coupon_type.trim().toLowerCase()
if (!["custom_price", "free"].includes(couponType)) {
  throw new Error(`Invalid coupon type: ${couponType}`)
}
```

#### 3. maximumRedemptions
- **入力**: 常に "unlimited"
- **処理**: 固定値を設定
- **理由**: Udemy管理画面でも常に "unlimited" が推奨

```typescript
const maximumRedemptions = "unlimited"
```

#### 4. couponCode
- **入力**: CSV の coupon_code
- **処理**: そのまま使用（通常は有効開始日のYYYY-MM-DD形式）
- **バリデーション**: YYYY-MM-DD形式かチェック

```typescript
const couponCode = csvRow.coupon_code.trim()
if (!/^\d{4}-\d{2}-\d{2}$/.test(couponCode)) {
  throw new Error(`Invalid coupon code format: ${couponCode}`)
}
```

#### 5. startDateTime
- **入力**: CSV の start_date + start_time
- **処理**: ISO 8601形式でPDT（-07:00）タイムゾーン付きで結合
- **重要**: アメリカ太平洋標準時(PDT)を使用（Udemy管理画面もPDT）

```typescript
// 入力例: start_date="2025-11-01", start_time="0:00"
// 出力例: "2025-11-01T00:00:00-07:00"

const startDate = csvRow.start_date.trim() // "2025-11-01"
const startTime = csvRow.start_time.trim() // "0:00"

// 時刻を HH:MM:SS 形式に正規化
const [hours, minutes, seconds = "00"] = startTime.split(":")
const normalizedTime = `${String(parseInt(hours)).padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`

const startDateTime = `${startDate}T${normalizedTime}-07:00`
```

#### 6. endDateTime
- **入力**: startDateTime から1ヶ月後
- **処理**: ISO 8601形式でPDT（-08:00）タイムゾーン付きで設定
- **重要**: 11月1日以降はPDT(-08:00)を使用（PDTは11月第1日曜日まで、以降PST）

```typescript
// startDate から1ヶ月後の同じ時刻
// 開始: 2025-11-01T00:00:00-07:00
// 終了: 2025-12-01T23:00:00-08:00 (時刻は23:00に統一、タイムゾーンはPST)

function addMonthToDate(dateString: string): string {
  const date = new Date(dateString + "Z")
  date.setUTCMonth(date.getUTCMonth() + 1)

  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")

  return `${year}-${month}-${day}T23:00:00-08:00`
}
```

#### 7. currency
- **入力**: 常に "JPY"
- **処理**: 固定値を設定
- **理由**: すべてのクーポンが日本向けで価格はJPY

```typescript
const currency = "JPY"
```

#### 8. discountPrice
- **入力**: CSV の custom_price
- **処理**: 数値に変換
- **バリデーション**: 正の整数かチェック

```typescript
const discountPrice = parseInt(csvRow.custom_price, 10)
if (!Number.isInteger(discountPrice) || discountPrice <= 0) {
  throw new Error(`Invalid discount price: ${csvRow.custom_price}`)
}
```

---

## 型定義と対応関係

### RawCouponData インターフェース

```typescript
// src/types/coupon.ts
export interface RawCouponData {
  courseId: string           // Udemy講座ID（7桁の数値文字列）
  couponType: CouponType     // "custom_price" | "free"
  maximumRedemptions: string // "unlimited"（常に固定）
  couponCode: string         // YYYY-MM-DD形式（通常は有効開始日）
  startDateTime: string      // ISO 8601形式（PDT: -07:00）
  endDateTime: string        // ISO 8601形式（PST/PDT: -08:00）
  currency: string           // "JPY"（常に固定）
  discountPrice: number      // 価格（JPY）
}
```

### Coupon インターフェース

```typescript
// src/types/coupon.ts
export interface Coupon {
  courseId: string
  courseName: string                    // COURSE_INFO から取得
  couponType: CouponType
  maximumRedemptions: string
  couponCode: string
  startDateTime: Date                   // Date オブジェクト（JSで自動パース）
  endDateTime: Date                     // Date オブジェクト
  currency: string
  discountPrice: number
  courseCouponUrl: string               // 動的生成: generateCouponUrl()
  courseInfo: CourseInfo               // COURSE_INFO から取得
}
```

---

## ファイル位置と構造

### クーポンシステムの核となるファイル

```
src/
├── types/
│   └── coupon.ts                      # 型定義（RawCouponData, Coupon, CourseInfo）
├── constants/
│   └── coupon-courses.ts              # 講座情報定数（COURSE_INFO, COURSE_DISPLAY_ORDER）
├── lib/
│   └── coupons/
│       ├── coupon-data.ts             # ⭐ 更新対象: COUPON_DATA配列
│       └── __tests__/
│           └── coupon-data.test.ts    # テスト
├── components/
│   └── coupons/                       # UI コンポーネント
├── data/
│   └── coupons/
│       ├── uploads/
│       │   └── bulk_coupon_upload - 2025-11-02.csv  # 入力CSV
│       └── courses/
│           └── fastapi-codex.md       # 講座説明
└── app/
    └── coupons/
        └── page.tsx                   # クーポン一覧ページ
```

### 最も重要なファイル: coupon-data.ts

このファイルの構造：

```typescript
import { COURSE_DISPLAY_ORDER, COURSE_INFO } from "@/constants/coupon-courses"
import type { Coupon, RawCouponData } from "@/types/coupon"

// キャッシュ管理
let cachedCoupons: Coupon[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000

// ⭐ 更新対象
const COUPON_DATA: RawCouponData[] = [
  {
    courseId: "6826831",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-01",
    startDateTime: "2025-11-01T00:00:00-07:00",
    endDateTime: "2025-12-01T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  // ... その他のクーポン ...
]

// URL動的生成
function generateCouponUrl(slug: string, couponCode: string): string {
  return `https://www.udemy.com/course/${slug}/?couponCode=${couponCode}`
}

// データ変換
export function parseCouponData(rawData: RawCouponData[]): Coupon[] {
  // RawCouponData → Coupon に変換
}

// クーポン取得（最新・有効なもののみ）
export function getLatestCoupons(): Coupon[] {
  // キャッシュをチェック
  // 有効期限内のみフィルタリング
  // COURSE_DISPLAY_ORDER でソート
  // キャッシュに保存して返却
}

// その他のユーティリティ関数
export function calculateDiscountRate(originalPrice: number, discountPrice: number): number
export function formatDateToJST(date: Date): string
```

---

## CSVパース実装パターン

### パターン1: 基本的なCSVパース（推奨）

```typescript
import { parse } from 'csv-parse/sync' // または他のCSVライブラリ

function parseCSV(csvContent: string): RawCouponData[] {
  // CSVをパース
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  })

  // 各レコードを変換
  return records.map((row: any) => {
    validateCSVRow(row)
    return transformCSVRowToRawCouponData(row)
  })
}
```

### パターン2: 手動パース（依存関係を最小化したい場合）

```typescript
function parseCSV(csvContent: string): Array<Record<string, string>> {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())

  const records = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(v => v.trim())
      const record: Record<string, string> = {}

      headers.forEach((header, index) => {
        record[header] = values[index]
      })

      return record
    })

  return records
}
```

### パターン3: バリデーション付きパース

```typescript
interface CSVRow {
  course_id: string
  coupon_type: string
  coupon_code: string
  start_date: string
  start_time: string
  custom_price: string
}

function validateCSVRow(row: any): asserts row is CSVRow {
  const requiredFields = ['course_id', 'coupon_type', 'coupon_code', 'start_date', 'start_time', 'custom_price']

  for (const field of requiredFields) {
    if (!row[field]) {
      throw new Error(`Missing required field: ${field}`)
    }
  }

  // 型チェック
  if (!/^\d{7}$/.test(row.course_id)) {
    throw new Error(`Invalid course_id: ${row.course_id}`)
  }

  if (!['custom_price', 'free'].includes(row.coupon_type)) {
    throw new Error(`Invalid coupon_type: ${row.coupon_type}`)
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.coupon_code)) {
    throw new Error(`Invalid coupon_code: ${row.coupon_code}`)
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.start_date)) {
    throw new Error(`Invalid start_date: ${row.start_date}`)
  }

  if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(row.start_time)) {
    throw new Error(`Invalid start_time: ${row.start_time}`)
  }

  if (isNaN(parseInt(row.custom_price, 10))) {
    throw new Error(`Invalid custom_price: ${row.custom_price}`)
  }
}

function transformCSVRowToRawCouponData(row: CSVRow): RawCouponData {
  const startDateTime = createStartDateTime(row.start_date, row.start_time)
  const endDateTime = createEndDateTime(startDateTime)

  return {
    courseId: row.course_id,
    couponType: row.coupon_type as CouponType,
    maximumRedemptions: "unlimited",
    couponCode: row.coupon_code,
    startDateTime,
    endDateTime,
    currency: "JPY",
    discountPrice: parseInt(row.custom_price, 10),
  }
}
```

---

## バリデーション規則

### 1. CSV構造バリデーション

```typescript
function validateCSVStructure(csvContent: string) {
  const lines = csvContent.trim().split('\n')

  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row')
  }

  const headers = lines[0].split(',').map(h => h.trim())
  const expectedHeaders = ['course_id', 'coupon_type', 'coupon_code', 'start_date', 'start_time', 'custom_price']

  for (const expected of expectedHeaders) {
    if (!headers.includes(expected)) {
      throw new Error(`Missing required column: ${expected}`)
    }
  }
}
```

### 2. フィールド値バリデーション

```typescript
function validateCourseId(courseId: string) {
  // 形式チェック
  if (!/^\d{7}$/.test(courseId)) {
    throw new Error(`Invalid course_id format: ${courseId}. Expected 7 digits.`)
  }

  // COURSE_INFO に存在するかチェック
  if (!COURSE_INFO[courseId]) {
    throw new Error(`Course ID ${courseId} not found in COURSE_INFO`)
  }
}

function validateCouponType(couponType: string) {
  const validTypes = ['custom_price', 'free']
  if (!validTypes.includes(couponType)) {
    throw new Error(`Invalid coupon_type: ${couponType}. Must be one of: ${validTypes.join(', ')}`)
  }
}

function validateDate(dateString: string, fieldName: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw new Error(`Invalid ${fieldName} format: ${dateString}. Expected YYYY-MM-DD.`)
  }

  // さらに有効な日付かチェック
  const date = new Date(dateString + 'T00:00:00Z')
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid ${fieldName}: ${dateString}. Not a valid date.`)
  }
}

function validateTime(timeString: string) {
  if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(timeString)) {
    throw new Error(`Invalid start_time format: ${timeString}. Expected HH:MM or HH:MM:SS.`)
  }

  const parts = timeString.split(':')
  const hours = parseInt(parts[0], 10)
  const minutes = parseInt(parts[1], 10)

  if (hours < 0 || hours > 23) {
    throw new Error(`Invalid hours in start_time: ${hours}. Must be 0-23.`)
  }

  if (minutes < 0 || minutes > 59) {
    throw new Error(`Invalid minutes in start_time: ${minutes}. Must be 0-59.`)
  }
}

function validateDiscountPrice(price: string) {
  const numPrice = parseInt(price, 10)

  if (isNaN(numPrice)) {
    throw new Error(`Invalid custom_price: ${price}. Must be a number.`)
  }

  if (numPrice <= 0) {
    throw new Error(`Invalid custom_price: ${price}. Must be a positive number.`)
  }
}
```

### 3. マージバリデーション

```typescript
function validateMergedData(
  existingData: RawCouponData[],
  newData: RawCouponData[]
): void {
  // 重複チェック（同じcourseIdで異なるデータ）
  const existingMap = new Map(existingData.map(d => [d.courseId, d]))

  for (const newItem of newData) {
    const existing = existingMap.get(newItem.courseId)
    if (existing && JSON.stringify(existing) !== JSON.stringify(newItem)) {
      console.log(`⚠️  Course ${newItem.courseId} will be updated`)
    }
  }

  // startDateTime < endDateTime チェック
  for (const item of newData) {
    const start = new Date(item.startDateTime)
    const end = new Date(item.endDateTime)

    if (start >= end) {
      throw new Error(`Invalid date range for course ${item.courseId}: startDateTime must be before endDateTime`)
    }
  }
}
```

---

## エラーハンドリング

### 一般的なエラーと対応

| エラー | 原因 | 対応方法 |
|--------|------|--------|
| File not found | CSVファイルが存在しない | `$ARGUMENTS` のパスを確認 |
| Invalid CSV format | ヘッダーが異なる | CSVの最初の行が正しいかチェック |
| Course ID not found | courseIdが COURSE_INFO に存在しない | `src/constants/coupon-courses.ts` を確認 |
| Invalid date format | 日付がYYYY-MM-DDでない | CSV の start_date を確認 |
| Invalid time format | 時刻がHH:MMでない | CSV の start_time を確認 |
| Type error | TypeScript型エラー | `npm run type-check` で詳細確認 |
| Test failure | テスト失敗 | `npm run test` で失敗内容確認 |

### エラー処理の実装例

```typescript
async function updateCouponsFromCSV(csvFilePath: string): Promise<UpdateResult> {
  try {
    // Step 1: ファイル読み込み
    const csvContent = await readFile(csvFilePath, 'utf-8')

    // Step 2: CSV構造バリデーション
    validateCSVStructure(csvContent)

    // Step 3: CSVパース
    const records = parseCSV(csvContent)

    // Step 4: 各レコードをバリデーション＋変換
    const newCoupons: RawCouponData[] = []
    for (const record of records) {
      try {
        validateRecord(record)
        newCoupons.push(transformRecord(record))
      } catch (error) {
        console.error(`Error processing record ${JSON.stringify(record)}: ${error.message}`)
        throw error
      }
    }

    // Step 5: 既存データとマージ
    const merged = mergeCouponData(existingData, newCoupons)

    // Step 6: マージ結果をバリデーション
    validateMergedData(existingData, newCoupons)

    // Step 7: ファイル更新
    updateCouponDataFile(merged)

    // Step 8: テスト実行
    await runTests()

    return {
      success: true,
      newCount: newCoupons.length,
      updatedCount: countUpdated(existingData, newCoupons),
      totalCount: merged.length,
    }
  } catch (error) {
    console.error(`Failed to update coupons: ${error.message}`)
    throw error
  }
}
```

---

## テスト戦略

### 既存テストの確認

```bash
# テストファイルの位置
src/lib/coupons/__tests__/coupon-data.test.ts

# テスト実行
npm run test -- src/lib/coupons/__tests__/coupon-data.test.ts

# テストカバレッジ
npm run test:coverage -- src/lib/coupons/__tests__/coupon-data.test.ts
```

### テストすべき項目

1. **CSVパース**
   - ✅ CSV構造が正しくパースされるか
   - ✅ ヘッダー不足でエラーになるか
   - ✅ 空行が無視されるか

2. **データ変換**
   - ✅ 各フィールドが正しく変換されるか
   - ✅ タイムゾーンが正しく設定されるか
   - ✅ endDate が startDate の1ヶ月後になるか

3. **バリデーション**
   - ✅ 無効な courseId でエラーになるか
   - ✅ 無効な日付形式でエラーになるか
   - ✅ 負の価格でエラーになるか

4. **マージ**
   - ✅ 新規クーポンが追加されるか
   - ✅ 既存クーポンが更新されるか
   - ✅ 既存クーポンが削除されないか

5. **統合**
   - ✅ 型チェック（`npm run type-check`）がパスするか
   - ✅ Lint（`npm run lint`）がパスするか
   - ✅ 全テスト（`npm run test`）がパスするか

### テスト実装例

```typescript
describe('Coupon CSV Update', () => {
  describe('parseCSV', () => {
    it('should parse valid CSV correctly', () => {
      const csv = `course_id,coupon_type,coupon_code,start_date,start_time,custom_price
6826831,custom_price,2025-11-01,2025-11-01,0:00,1500`

      const result = parseCSV(csv)

      expect(result).toHaveLength(1)
      expect(result[0].course_id).toBe('6826831')
      expect(result[0].custom_price).toBe('1500')
    })

    it('should throw on missing headers', () => {
      const csv = `course_id,coupon_type
6826831,custom_price`

      expect(() => parseCSV(csv)).toThrow('Missing required column')
    })
  })

  describe('transformToRawCouponData', () => {
    it('should correctly transform CSV row', () => {
      const row = {
        course_id: '6826831',
        coupon_type: 'custom_price',
        coupon_code: '2025-11-01',
        start_date: '2025-11-01',
        start_time: '0:00',
        custom_price: '1500',
      }

      const result = transformToRawCouponData(row)

      expect(result.courseId).toBe('6826831')
      expect(result.startDateTime).toBe('2025-11-01T00:00:00-07:00')
      expect(result.endDateTime).toBe('2025-12-01T23:00:00-08:00')
      expect(result.discountPrice).toBe(1500)
    })
  })

  describe('validation', () => {
    it('should reject invalid course ID', () => {
      const row = { course_id: 'invalid', ... }
      expect(() => validateCSVRow(row)).toThrow('Invalid course_id')
    })

    it('should reject course ID not in COURSE_INFO', () => {
      const row = { course_id: '9999999', ... }
      expect(() => validateCSVRow(row)).toThrow('Course ID 9999999 not found')
    })

    it('should reject invalid date format', () => {
      const row = { start_date: '11/01/2025', ... }
      expect(() => validateCSVRow(row)).toThrow('Invalid start_date')
    })
  })
})
```

---

## 実装チェックリスト

### CSVパース実装

- [ ] CSVファイルを読み込む
- [ ] CSV構造をバリデーション（ヘッダー確認）
- [ ] 各行をパース（カラムを抽出）
- [ ] 空行をスキップ
- [ ] エラーハンドリング（ファイル読み込みエラー、パースエラー）

### データ変換実装

- [ ] courseId: CSV の course_id をそのまま使用
- [ ] couponType: CSV の coupon_type をそのまま使用
- [ ] maximumRedemptions: "unlimited" に固定
- [ ] couponCode: CSV の coupon_code をそのまま使用
- [ ] startDateTime: CSV の start_date + start_time を ISO 8601 形式で結合（タイムゾーン -07:00）
- [ ] endDateTime: startDateTime から1ヶ月後（タイムゾーン -08:00）
- [ ] currency: "JPY" に固定
- [ ] discountPrice: CSV の custom_price を数値に変換

### バリデーション実装

- [ ] courseId: 7桁の数値
- [ ] courseId: COURSE_INFO に存在
- [ ] couponType: "custom_price" または "free"
- [ ] couponCode: YYYY-MM-DD 形式
- [ ] start_date: YYYY-MM-DD 形式
- [ ] start_time: HH:MM または HH:MM:SS 形式
- [ ] custom_price: 正の整数
- [ ] startDateTime < endDateTime

### ファイル更新実装

- [ ] 既存の COUPON_DATA 配列を読み込む
- [ ] 新規クーポンと既存クーポンをマージ
  - [ ] 既存クーポン（CSVに含まれない）を保持
  - [ ] 新規クーポン（CSVに含まれる）を追加
  - [ ] 既存クーポン（CSVに含まれる）を更新
- [ ] `src/lib/coupons/coupon-data.ts` の COUPON_DATA 配列を更新
- [ ] ファイルを保存

### テスト・検証実装

- [ ] `npm run type-check` を実行して型エラーなし
- [ ] `npm run lint` を実行してリントエラーなし
- [ ] `npm run test` を実行してテストパス
- [ ] 更新内容をログ出力

---

## AI Assistant Instructions

When this skill is activated for implementing the `/update-coupons` command:

1. **Read the CSV file** from the path provided in `$ARGUMENTS`
2. **Validate CSV structure** before parsing
3. **Parse each row** and convert to `RawCouponData` format following the exact transformation rules above
4. **Validate all fields** using the validation rules provided
5. **Read existing** `COUPON_DATA` from `src/lib/coupons/coupon-data.ts`
6. **Merge data** intelligently:
   - Update existing coupons found in CSV
   - Add new coupons from CSV
   - Preserve existing coupons not in CSV
7. **Update the file** `src/lib/coupons/coupon-data.ts` with merged data
8. **Run validations**: `npm run type-check && npm run lint && npm run test`
9. **Report results** with clear summary of changes

### Always:
- Use exact timezone offsets: `-07:00` for startDateTime, `-08:00` for endDateTime
- Calculate endDateTime as exactly 1 month after startDateTime
- Preserve existing coupons that aren't in the CSV
- Run all validation checks before committing changes
- Provide detailed error messages with context

### Never:
- Skip validation steps
- Delete existing coupons without explicit instruction
- Use incorrect timezone offsets
- Assume CSV format without validating headers
- Commit changes if tests fail

---

## 参考資料

### ファイルパス

- **型定義**: `src/types/coupon.ts`
- **定数**: `src/constants/coupon-courses.ts`
- **コア処理**: `src/lib/coupons/coupon-data.ts`
- **テスト**: `src/lib/coupons/__tests__/coupon-data.test.ts`
- **入力CSV**: `src/data/coupons/uploads/bulk_coupon_upload - 2025-11-02.csv`
- **カスタムコマンド**: `.claude/commands/update-coupons.md`

### 開発コマンド

```bash
# 型チェック
npm run type-check

# Lint実行
npm run lint

# テスト実行
npm run test

# テスト実行（単一ファイル）
npm run test -- coupon-data.test.ts

# テストカバレッジ
npm run test:coverage

# 本番ビルド（動作確認）
npm run build
```

### コード例・リファレンス

- `src/lib/videos/video-data.ts` - 動画データの処理（参考実装）
- `src/lib/coupons/__tests__/coupon-data.test.ts` - 既存テスト
