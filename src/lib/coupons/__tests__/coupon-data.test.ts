import { COURSE_INFO } from "@/constants/coupon-courses"
import type { RawCouponData } from "@/types/coupon"
import { getLatestCoupons, parseCouponData } from "../coupon-data"

describe("coupon-data", () => {
  describe("データ整合性検証", () => {
    let allCoupons: ReturnType<typeof getLatestCoupons>

    beforeAll(() => {
      allCoupons = getLatestCoupons()
    })

    it("すべてのcourseIdがCOURSE_INFOに存在すること", () => {
      allCoupons.forEach(coupon => {
        expect(COURSE_INFO[coupon.courseId]).toBeDefined()
        expect(COURSE_INFO[coupon.courseId]).toHaveProperty("slug")
        expect(COURSE_INFO[coupon.courseId]).toHaveProperty("title")
      })
    })

    it("couponCodeがYYYY-MM-DD形式であること", () => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      allCoupons.forEach(coupon => {
        expect(coupon.couponCode).toMatch(dateRegex)
        // 実際の日付として解釈可能かチェック
        const parts = coupon.couponCode.split("-")
        const year = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10)
        const day = parseInt(parts[2], 10)

        expect(year).toBeGreaterThan(2020)
        expect(year).toBeLessThan(2100)
        expect(month).toBeGreaterThanOrEqual(1)
        expect(month).toBeLessThanOrEqual(12)
        expect(day).toBeGreaterThanOrEqual(1)
        expect(day).toBeLessThanOrEqual(31)
      })
    })

    it("生成されたURLのcouponCodeパラメータがcouponCodeフィールドと一致すること", () => {
      allCoupons.forEach(coupon => {
        const urlMatch = coupon.courseCouponUrl.match(/couponCode=([^&]+)/)
        expect(urlMatch).not.toBeNull()
        expect(urlMatch![1]).toBe(coupon.couponCode)
      })
    })

    it("生成されたURLのslugがcourseInfoのslugと一致すること", () => {
      allCoupons.forEach(coupon => {
        const expectedUrl = `https://www.udemy.com/course/${coupon.courseInfo.slug}/?couponCode=${coupon.couponCode}`
        expect(coupon.courseCouponUrl).toBe(expectedUrl)
      })
    })

    it("startDateTimeとendDateTimeが有効なDate型であること", () => {
      allCoupons.forEach(coupon => {
        expect(coupon.startDateTime).toBeInstanceOf(Date)
        expect(coupon.endDateTime).toBeInstanceOf(Date)
        expect(isNaN(coupon.startDateTime.getTime())).toBe(false)
        expect(isNaN(coupon.endDateTime.getTime())).toBe(false)
      })
    })

    it("endDateTimeがstartDateTimeより後であること", () => {
      allCoupons.forEach(coupon => {
        expect(coupon.endDateTime.getTime()).toBeGreaterThan(
          coupon.startDateTime.getTime()
        )
      })
    })

    it("discountPriceが正の数値であること", () => {
      allCoupons.forEach(coupon => {
        expect(typeof coupon.discountPrice).toBe("number")
        expect(coupon.discountPrice).toBeGreaterThan(0)
        expect(Number.isInteger(coupon.discountPrice)).toBe(true)
      })
    })

    it("courseNameがcourseInfo.titleと一致すること", () => {
      allCoupons.forEach(coupon => {
        expect(coupon.courseName).toBe(coupon.courseInfo.title)
      })
    })
  })

  describe("parseCouponData", () => {
    it("courseIdが存在しないデータをフィルタリングすること", () => {
      const testData: RawCouponData[] = [
        {
          courseId: "6732543",
          couponType: "custom_price",
          maximumRedemptions: "unlimited",
          couponCode: "2025-10-10",
          startDateTime: "2025-10-10T00:00:00-07:00",
          endDateTime: "2025-11-09T23:00:00-07:00",
          currency: "JPY",
          discountPrice: 1500,
        },
        {
          courseId: "9999999", // 存在しないID
          couponType: "custom_price",
          maximumRedemptions: "unlimited",
          couponCode: "2025-10-10",
          startDateTime: "2025-10-10T00:00:00-07:00",
          endDateTime: "2025-11-09T23:00:00-07:00",
          currency: "JPY",
          discountPrice: 1500,
        },
      ]

      const result = parseCouponData(testData)
      expect(result).toHaveLength(1)
      expect(result[0].courseId).toBe("6732543")
    })

    it("URL生成が正しく行われること", () => {
      const testData: RawCouponData[] = [
        {
          courseId: "6732543",
          couponType: "custom_price",
          maximumRedemptions: "unlimited",
          couponCode: "2025-10-10",
          startDateTime: "2025-10-10T00:00:00-07:00",
          endDateTime: "2025-11-09T23:00:00-07:00",
          currency: "JPY",
          discountPrice: 1500,
        },
      ]

      const result = parseCouponData(testData)
      const expectedUrl = `https://www.udemy.com/course/${COURSE_INFO["6732543"].slug}/?couponCode=2025-10-10`
      expect(result[0].courseCouponUrl).toBe(expectedUrl)
    })
  })
})
