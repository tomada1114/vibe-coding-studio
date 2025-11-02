import { COURSE_DISPLAY_ORDER, COURSE_INFO } from "@/constants/coupon-courses"
import type { Coupon, RawCouponData } from "@/types/coupon"

// Cache parsed data to avoid re-parsing on every call
let cachedCoupons: Coupon[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * クーポンデータ
 * URLは動的生成されるため含まない
 *
 * メンテナンス方法：
 * 1. 新しいクーポンを追加するときは、配列に新しいオブジェクトを追加
 * 2. couponCodeはYYYY-MM-DD形式で記載
 * 3. startDateTimeとendDateTimeはISO 8601形式で記載
 * 4. courseIdはCOURSE_INFOに存在するIDを使用（テストで検証される）
 */
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
  {
    courseId: "6851913",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6823465",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6827941",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-10-10",
    startDateTime: "2025-10-15T19:45:00-07:00",
    endDateTime: "2025-11-15T18:45:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6783611",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6801509",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-10-10",
    startDateTime: "2025-10-15T19:45:00-07:00",
    endDateTime: "2025-11-15T18:45:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6782117",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6772961",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6769253",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6739725",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6732543",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6694011",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6691241",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6536597",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6387599",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
  {
    courseId: "6327241",
    couponType: "custom_price",
    maximumRedemptions: "unlimited",
    couponCode: "2025-11-02",
    startDateTime: "2025-11-02T00:00:00-07:00",
    endDateTime: "2025-12-02T23:00:00-08:00",
    currency: "JPY",
    discountPrice: 1500,
  },
]

/**
 * クーポンURLを動的生成
 * slugとcouponCodeから正しいURLを構築することで、メンテミスを防ぐ
 */
function generateCouponUrl(slug: string, couponCode: string): string {
  return `https://www.udemy.com/course/${slug}/?couponCode=${couponCode}`
}

export function parseCouponData(rawData: RawCouponData[]): Coupon[] {
  return rawData
    .filter(data => COURSE_INFO[data.courseId])
    .map(data => {
      const courseInfo = COURSE_INFO[data.courseId]
      return {
        courseId: data.courseId,
        courseName: courseInfo.title,
        couponType: data.couponType,
        maximumRedemptions: data.maximumRedemptions,
        couponCode: data.couponCode,
        startDateTime: new Date(data.startDateTime),
        endDateTime: new Date(data.endDateTime),
        currency: data.currency,
        discountPrice: data.discountPrice,
        courseCouponUrl: generateCouponUrl(courseInfo.slug, data.couponCode),
        courseInfo,
      }
    })
}

export function getLatestCoupons(): Coupon[] {
  const now = Date.now()

  // Return cached data if available and fresh
  if (cachedCoupons && now - cacheTimestamp < CACHE_DURATION) {
    return cachedCoupons
  }

  const allCoupons = parseCouponData(COUPON_DATA)

  // 現在の日付（UTCベース、時刻を00:00:00に正規化）
  const currentDate = new Date()
  const todayUTC = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate()
  )

  // 有効なクーポンのみフィルタリング（日付ベース、時刻は無視）
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

export function calculateDiscountRate(
  originalPrice: number,
  discountPrice: number
): number {
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
}

export function formatDateToJST(date: Date): string {
  // PDTからJSTへの変換（+16時間）
  const jstDate = new Date(date.getTime() + 16 * 60 * 60 * 1000)

  const jstYear = jstDate.getFullYear()
  const jstMonth = String(jstDate.getMonth() + 1).padStart(2, "0")
  const jstDay = String(jstDate.getDate()).padStart(2, "0")

  return `${jstYear}年${jstMonth}月${jstDay}日`
}
