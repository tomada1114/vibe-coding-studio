export type CouponType = 'custom_price' | 'free'

export interface RawCouponData {
  course_id: string
  course_name: string
  coupon_type: CouponType
  maximum_redemptions: string
  coupon_code: string
  start_date_time: string
  end_date_time: string
  currency: string
  discount_price: string
  course_coupon_url: string
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
