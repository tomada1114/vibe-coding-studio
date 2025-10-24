import { COURSE_INFO, COURSE_DISPLAY_ORDER } from '@/constants/coupon-courses'
import type { Coupon, RawCouponData } from '@/types/coupon'

// Cache parsed data to avoid re-parsing on every call
let cachedCoupons: Coupon[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// CSVデータを直接定義（ビルド時に含まれる）
const CSV_DATA = `"course_id","course_name","coupon_type","maximum_redemptions","coupon_code","start_date_time","end_date_time","currency","discount_price","course_coupon_url"
6851913,"【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PST","JPY",1500,"https://www.udemy.com/course/codex-react-native/?couponCode=2025-10-10"
6823465,"【初心者OK】Claude CodeとPythonで学ぶAI駆動開発！アプリ・スクレイピング・ゲーム作成で学ぶ完全ガイド","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/claude-code-python/?couponCode=2025-09-14"
6827941,"【Claude Code】FlaskとGeminiで作る Python AI アプリ！実践レベルのAI駆動開発を学ぼう","custom_price","unlimited","2025-10-10","2025-10-15 19:45 PDT","2025-11-15 18:45 PST","JPY",1500,"https://www.udemy.com/course/claude-code-flask/?couponCode=2025-10-10"
6783611,"【未経験OK】Claude CodeとReact Nativeでスマホアプリ開発！5つのアプリでバイブコーディング実践","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/claude-code-react-native-5apps/?couponCode=2025-09-14"
6801509,"【Codex CLI】実践レベルのアプリ開発で学ぶバイブコーディング！カスタムコマンド・MCP連携の完全ガイド","custom_price","unlimited","2025-10-10","2025-10-15 19:45 PDT","2025-11-15 18:45 PST","JPY",1500,"https://www.udemy.com/course/codex-nextjs/?couponCode=2025-10-10"
6782117,"Claude Codeでスマホアプリ開発！React Native（Expo）爆速バイブコーディングテンプレートを作ろう","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/claude-code-expo-template/?couponCode=2025-09-14"
6772961,"【AWS Kiro完全ガイド】仕様駆動開発で学ぶ次世代AI開発 - Next.jsメモアプリ実装からMCP連携まで","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/aws-kiro-sd/?couponCode=2025-09-14"
6769253,"【Claude Code × MCP完全攻略】Next.jsアプリ開発を劇的に効率化する5つの最新MCPツール実践ガイド","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/claude-code-mcp-nextjs/?couponCode=2025-09-14"
6739725,"【Claude Code】Next.js で作るサブスク型・作業時間管理アプリで学ぶ AI 駆動開発【完全版】","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/claude-code-project-tracker/?couponCode=2025-09-14"
6732543,"【Claude Code】プログラミング未経験OK！Stripe サブスク型家計簿アプリで学ぶAI駆動開発マスター講座","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/claude-code-expenses-app/?couponCode=2025-09-14"
6694011,"【無料ではじめる】Gemini CLI x Vibe Coding入門 - プログラミング未経験から作れるマインドマップ","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/gemini_cli_vibe_coding_mind_map/?couponCode=2025-09-14"
6691241,"【Claude Codeでバイブコーディング】プログラミング未経験OK！はじめての AI 駆動開発でWebアプリを開発","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/claude-code-vibe-coding/?couponCode=2025-09-14"
6536597,"Next.js（React）で作る AI アプリのポートフォリオ実践！モダンフロントエンド開発を初心者でも学べるコース","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/nextjs-ai-pomodoro-timer/?couponCode=2025-09-14"
6387599,"未経験からはじめる Ruby on Rails！Ruby / RSpec も学びながらポートフォリオ公開まで一本で完結","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/ruby-on-rails-rspec/?couponCode=2025-09-14"
6327241,"【RSpec 実践入門】Ruby on Rails 開発者のためのテスト自動化 - 完全ガイド","custom_price","unlimited","2025-10-10","2025-10-10 00:00 PDT","2025-11-09 23:00 PDT","JPY",1500,"https://www.udemy.com/course/rspec-ruby-on-rails/?couponCode=2025-09-14"
`

// Cache parsed CSV data to avoid re-parsing
let parsedCSVData: RawCouponData[] | null = null

export function loadCouponsFromCSV(): RawCouponData[] {
  // Return cached data if available
  if (parsedCSVData) {
    return parsedCSVData
  }

  // CSVを手動でパース
  const lines = CSV_DATA.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''))

  const records: RawCouponData[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || []
    const cleanValues = values.map(v => v.replace(/^"|"$/g, ''))

    const record: Record<string, string> = {}
    headers.forEach((header, index) => {
      record[header] = cleanValues[index] || ''
    })

    records.push(record as unknown as RawCouponData)
  }

  // Cache the parsed data
  parsedCSVData = records
  return records
}

export function parseCouponData(rawData: RawCouponData[]): Coupon[] {
  return rawData
    .filter(data => COURSE_INFO[data.course_id])
    .map(data => ({
      courseId: data.course_id,
      courseName: data.course_name,
      couponType: data.coupon_type as Coupon['couponType'],
      maximumRedemptions: data.maximum_redemptions,
      couponCode: data.coupon_code,
      startDateTime: new Date(data.start_date_time.replace(' PDT', '')),
      endDateTime: new Date(data.end_date_time.replace(' PDT', '')),
      currency: data.currency,
      discountPrice: parseInt(data.discount_price, 10),
      courseCouponUrl: data.course_coupon_url,
      courseInfo: COURSE_INFO[data.course_id],
    }))
}

export function getLatestCoupons(): Coupon[] {
  const now = Date.now()

  // Return cached data if available and fresh
  if (cachedCoupons && now - cacheTimestamp < CACHE_DURATION) {
    return cachedCoupons
  }

  const rawData = loadCouponsFromCSV()
  const allCoupons = parseCouponData(rawData)

  // 現在の日時
  const currentDate = new Date()

  // 有効なクーポンのみフィルタリング
  const validCoupons = allCoupons.filter(
    coupon => coupon.startDateTime <= currentDate && coupon.endDateTime >= currentDate
  )

  // コースIDごとに最新のクーポンのみを保持
  const latestCouponsMap = new Map<string, Coupon>()

  validCoupons.forEach(coupon => {
    const existing = latestCouponsMap.get(coupon.courseId)
    if (!existing || coupon.startDateTime > existing.startDateTime) {
      latestCouponsMap.set(coupon.courseId, coupon)
    }
  })

  const result = Array.from(latestCouponsMap.values())

  // COURSE_DISPLAY_ORDERに基づいてソート（O(n)の最適化されたアルゴリズム）
  const orderMap = new Map<string, number>(
    COURSE_DISPLAY_ORDER.map((id, index) => [id as string, index])
  )

  result.sort((a, b) => {
    const orderA = orderMap.get(a.courseId)
    const orderB = orderMap.get(b.courseId)

    // 両方とも表示順序に含まれている場合
    if (orderA !== undefined && orderB !== undefined) {
      return orderA - orderB
    }

    // aのみが表示順序に含まれている場合（aを前に）
    if (orderA !== undefined) {
      return -1
    }

    // bのみが表示順序に含まれている場合（bを前に）
    if (orderB !== undefined) {
      return 1
    }

    // どちらも含まれていない場合は元の順序を維持
    return 0
  })

  // Cache the sorted result
  cachedCoupons = result
  cacheTimestamp = now

  return cachedCoupons
}

export function calculateDiscountRate(originalPrice: number, discountPrice: number): number {
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
}

export function formatDateToJST(date: Date): string {
  // PDTからJSTへの変換（+16時間）
  const jstDate = new Date(date.getTime() + 16 * 60 * 60 * 1000)

  const jstYear = jstDate.getFullYear()
  const jstMonth = String(jstDate.getMonth() + 1).padStart(2, '0')
  const jstDay = String(jstDate.getDate()).padStart(2, '0')
  const jstHours = String(jstDate.getHours()).padStart(2, '0')
  const jstMinutes = String(jstDate.getMinutes()).padStart(2, '0')

  return `${jstYear}年${jstMonth}月${jstDay}日 ${jstHours}:${jstMinutes}`
}
