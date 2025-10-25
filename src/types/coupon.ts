export type CouponType = 'custom_price' | 'free'

/**
 * クーポンデータの基本情報
 * URLは動的生成されるため含まない
 */
export interface RawCouponData {
  courseId: string
  couponType: CouponType
  maximumRedemptions: string
  couponCode: string
  startDateTime: string
  endDateTime: string
  currency: string
  discountPrice: number
}

export interface CourseInfo {
  originalPrice: number
  description: string
  slug: string
  title: string
  topics: string[]
  promotionUrl?: string // クーポンなしの通常プロモーションURL
}

export interface Coupon {
  courseId: string
  courseName: string
  couponType: CouponType
  maximumRedemptions: string
  couponCode: string
  startDateTime: Date
  endDateTime: Date
  currency: string
  discountPrice: number
  courseCouponUrl: string
  courseInfo: CourseInfo
}

export interface TopicInfo {
  slug: string
  name: string
  icon: string
  isLocal?: boolean
}
