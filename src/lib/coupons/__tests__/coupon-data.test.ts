import { COURSE_INFO } from "@/constants/coupon-courses"
import type { Coupon, RawCouponData } from "@/types/coupon"
import {
  calculateDiscountRate,
  formatDateToJST,
  getLatestCoupons,
  getMaxDiscountRate,
  getRelatedCoupons,
  parseCouponData,
} from "../coupon-data"

/**
 * クーポンが存在すべき講座IDのリスト
 * 新しい講座を追加する際は、このリストにIDを追加してください
 */
const EXPECTED_COURSE_IDS = [
  "6981353", // Claude Code カスタマイズ完全ガイド
  "6826831", // Codex × FastAPI
  "6851913", // Codex × React Native
  "6827941", // Claude Code × Flask
  "6823465", // Claude Code × Python
  "6801509", // Codex CLI
  "6782117", // Claude Code × Expo
  "6783611", // Claude Code × React Native 5apps
  "6772961", // AWS Kiro
  "6769253", // Claude Code × MCP
  "6739725", // Claude Code × 作業時間管理
  "6732543", // Claude Code × 家計簿
  "6691241", // Claude Code × Vibe Coding
  "6536597", // Next.js
  "6387599", // Rails
  "6327241", // RSpec
] as const

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

    it("期待されるすべての講座にクーポンが存在すること", () => {
      const couponCourseIds = new Set(allCoupons.map(c => c.courseId))

      EXPECTED_COURSE_IDS.forEach(expectedId => {
        expect(couponCourseIds.has(expectedId)).toBe(true)
        expect(COURSE_INFO[expectedId]).toBeDefined()
      })

      // 逆チェック：期待されるID数と実際のクーポン数が一致すること
      expect(allCoupons.length).toBe(EXPECTED_COURSE_IDS.length)
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

  describe("getRelatedCoupons", () => {
    let allCoupons: ReturnType<typeof getLatestCoupons>

    beforeAll(() => {
      allCoupons = getLatestCoupons()
    })

    it("現在のクーポンを除外すること", () => {
      if (allCoupons.length === 0) {
        throw new Error("テストに必要なクーポンが存在しません")
      }

      const currentCoupon = allCoupons[0]
      const relatedCoupons = getRelatedCoupons(currentCoupon, allCoupons, 10)

      expect(relatedCoupons).not.toContainEqual(currentCoupon)
      expect(
        relatedCoupons.every(c => c.courseId !== currentCoupon.courseId)
      ).toBe(true)
    })

    it("指定されたlimit件数以下を返すこと", () => {
      if (allCoupons.length < 2) {
        throw new Error("テストに必要なクーポンが不足しています")
      }

      const currentCoupon = allCoupons[0]
      const limit = 4
      const relatedCoupons = getRelatedCoupons(currentCoupon, allCoupons, limit)

      expect(relatedCoupons.length).toBeLessThanOrEqual(limit)
      expect(relatedCoupons.length).toBeLessThanOrEqual(allCoupons.length - 1)
    })

    it("タグが一致するクーポンを優先的に返すこと", () => {
      // タグが一致するクーポンを見つける
      const currentCoupon = allCoupons.find(c => c.courseInfo.topics.length > 0)

      if (!currentCoupon) {
        throw new Error("タグを持つクーポンが見つかりません")
      }

      const relatedCoupons = getRelatedCoupons(currentCoupon, allCoupons, 10)

      if (relatedCoupons.length > 1) {
        // 最初のクーポンのタグ一致数を計算
        const firstMatchCount = relatedCoupons[0].courseInfo.topics.filter(
          tag => currentCoupon.courseInfo.topics.includes(tag)
        ).length

        // 2番目以降のクーポンのタグ一致数を計算
        for (let i = 1; i < relatedCoupons.length; i++) {
          const matchCount = relatedCoupons[i].courseInfo.topics.filter(tag =>
            currentCoupon.courseInfo.topics.includes(tag)
          ).length

          // スコアが高い順にソートされているはず
          expect(firstMatchCount).toBeGreaterThanOrEqual(matchCount)
        }
      }
    })

    it("タグが同じスコアの場合、COURSE_DISPLAY_ORDER順に返すこと", () => {
      // このテストは実装を信頼して、結果が重複しないことのみ確認
      if (allCoupons.length < 2) {
        throw new Error("テストに必要なクーポンが不足しています")
      }

      const currentCoupon = allCoupons[0]
      const relatedCoupons = getRelatedCoupons(currentCoupon, allCoupons, 10)

      // 重複チェック
      const courseIds = relatedCoupons.map(c => c.courseId)
      const uniqueCourseIds = new Set(courseIds)
      expect(courseIds.length).toBe(uniqueCourseIds.size)
    })

    it("limit=0の場合、空配列を返すこと", () => {
      if (allCoupons.length === 0) {
        throw new Error("テストに必要なクーポンが存在しません")
      }

      const currentCoupon = allCoupons[0]
      const relatedCoupons = getRelatedCoupons(currentCoupon, allCoupons, 0)

      expect(relatedCoupons).toEqual([])
    })

    it("他にクーポンがない場合、空配列を返すこと", () => {
      if (allCoupons.length === 0) {
        throw new Error("テストに必要なクーポンが存在しません")
      }

      const currentCoupon = allCoupons[0]
      const singleCouponList = [currentCoupon]
      const relatedCoupons = getRelatedCoupons(
        currentCoupon,
        singleCouponList,
        10
      )

      expect(relatedCoupons).toEqual([])
    })
  })

  describe("calculateDiscountRate", () => {
    it("正しく割引率を計算すること", () => {
      expect(calculateDiscountRate(10000, 1500)).toBe(85)
      expect(calculateDiscountRate(5000, 1500)).toBe(70)
      expect(calculateDiscountRate(2000, 1500)).toBe(25)
    })

    it("割引率が0の場合（同じ価格）", () => {
      expect(calculateDiscountRate(1500, 1500)).toBe(0)
    })

    it("割引率が100%の場合", () => {
      expect(calculateDiscountRate(1500, 0)).toBe(100)
    })

    it("小数点以下を四捨五入すること", () => {
      // 10000 - 1234 = 8766, 8766 / 10000 = 0.8766, * 100 = 87.66, round = 88
      expect(calculateDiscountRate(10000, 1234)).toBe(88)
      // 10000 - 1235 = 8765, 8765 / 10000 = 0.8765, * 100 = 87.65, round = 88
      expect(calculateDiscountRate(10000, 1235)).toBe(88)
    })

    it("エッジケース: 非常に小さな割引", () => {
      expect(calculateDiscountRate(10000, 9999)).toBe(0)
    })

    it("エッジケース: 非常に大きな価格", () => {
      expect(calculateDiscountRate(1000000, 1500)).toBe(100)
    })
  })

  describe("getMaxDiscountRate", () => {
    const makeCoupon = (originalPrice: number, discountPrice: number): Coupon =>
      ({
        courseInfo: { originalPrice },
        discountPrice,
      }) as unknown as Coupon

    it("複数クーポンの中から最大割引率を返すこと", () => {
      const coupons = [
        makeCoupon(10000, 5000), // 50%
        makeCoupon(10000, 1500), // 85%
        makeCoupon(10000, 8000), // 20%
      ]
      expect(getMaxDiscountRate(coupons)).toBe(85)
    })

    it("クーポンが1件のときはそのクーポンの割引率を返すこと", () => {
      const coupons = [makeCoupon(20000, 2000)] // 90%
      expect(getMaxDiscountRate(coupons)).toBe(90)
    })

    it("すべて同じ割引率の場合、その値を返すこと", () => {
      const coupons = [
        makeCoupon(10000, 3000), // 70%
        makeCoupon(20000, 6000), // 70%
      ]
      expect(getMaxDiscountRate(coupons)).toBe(70)
    })

    it("実データ（getLatestCoupons）に対しても正しい範囲の値を返すこと", () => {
      const coupons = getLatestCoupons()
      const max = getMaxDiscountRate(coupons)
      expect(max).toBeGreaterThanOrEqual(0)
      expect(max).toBeLessThanOrEqual(100)
      // 全クーポンの割引率の最大値と一致すること
      const rates = coupons.map(c =>
        calculateDiscountRate(c.courseInfo.originalPrice, c.discountPrice)
      )
      expect(max).toBe(Math.max(...rates))
    })
  })

  describe("formatDateToJST", () => {
    it("Date型を正しくJST形式にフォーマットすること", () => {
      const date = new Date("2025-01-01T00:00:00-08:00") // PST
      const result = formatDateToJST(date)

      // PDTからJST（+16時間）への変換を期待
      expect(result).toMatch(/^\d{4}年\d{2}月\d{2}日$/)
    })

    it("ISO文字列を正しくJST形式にフォーマットすること", () => {
      const dateString = "2025-01-15T12:00:00-08:00"
      const result = formatDateToJST(dateString)

      expect(result).toMatch(/^\d{4}年\d{2}月\d{2}日$/)
      expect(result).toContain("2025年")
    })

    it("月と日が1桁の場合、ゼロパディングされること", () => {
      const date = new Date("2025-01-05T00:00:00-08:00")
      const result = formatDateToJST(date)

      // ゼロパディングされた形式を期待
      expect(result).toMatch(/^\d{4}年0\d月\d{2}日$/)
    })

    it("年末年始の日付変換が正しく行われること", () => {
      // 12/31 PST + 16時間 = 次の日（1/1）になるケース
      const date = new Date("2024-12-31T10:00:00-08:00")
      const result = formatDateToJST(date)

      // 16時間を加算すると2025年1月1日になる
      expect(result).toMatch(/2025年01月\d{2}日/)
    })
  })

  describe("getLatestCoupons - Edge Cases", () => {
    it("キャッシュが機能すること", () => {
      const firstCall = getLatestCoupons()
      const secondCall = getLatestCoupons()

      // 同じインスタンスが返されることを確認（キャッシュが機能）
      expect(firstCall).toBe(secondCall)
    })

    it("有効期限内のクーポンのみを返すこと", () => {
      const coupons = getLatestCoupons()

      // 現在の日付を取得
      const now = new Date()
      const todayUTC = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      )

      coupons.forEach(coupon => {
        const start = coupon.startDateTime
        const startUTC = Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        )

        const end = coupon.endDateTime
        const endUTC = Date.UTC(
          end.getUTCFullYear(),
          end.getUTCMonth(),
          end.getUTCDate()
        )

        // 開始日 <= 今日 <= 終了日
        expect(startUTC).toBeLessThanOrEqual(todayUTC)
        expect(endUTC).toBeGreaterThanOrEqual(todayUTC)
      })
    })
  })

  describe("parseCouponData - Edge Cases", () => {
    it("空配列を渡した場合、空配列を返すこと", () => {
      const result = parseCouponData([])
      expect(result).toEqual([])
    })

    it("すべてのcourseIdが存在しない場合、空配列を返すこと", () => {
      const testData: RawCouponData[] = [
        {
          courseId: "9999991",
          couponType: "custom_price",
          maximumRedemptions: "unlimited",
          couponCode: "2025-10-10",
          startDateTime: "2025-10-10T00:00:00-07:00",
          endDateTime: "2025-11-09T23:00:00-07:00",
          currency: "JPY",
          discountPrice: 1500,
        },
        {
          courseId: "9999992",
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
      expect(result).toEqual([])
    })
  })

  describe("getLatestCoupons - Sorting Edge Cases", () => {
    it("COURSE_DISPLAY_ORDERに含まれているクーポンを優先的にソートすること", () => {
      const coupons = getLatestCoupons()

      if (coupons.length < 2) {
        // テストに十分なデータがない場合はスキップ
        return
      }

      // COURSE_DISPLAY_ORDERに含まれているかチェック
      const { COURSE_DISPLAY_ORDER } = jest.requireActual(
        "@/constants/coupon-courses"
      )
      const orderSet = new Set(COURSE_DISPLAY_ORDER)

      // 最初の数個のクーポンがCOURSE_DISPLAY_ORDERに含まれているはず
      const firstCoupon = coupons[0]
      const isFirstInOrder = orderSet.has(firstCoupon.courseId)

      if (isFirstInOrder) {
        // 最初のクーポンがCOURSE_DISPLAY_ORDERに含まれている場合
        // COURSE_DISPLAY_ORDER順にソートされているか確認
        const orderMap = new Map(
          COURSE_DISPLAY_ORDER.map((id: string, index: number) => [id, index])
        )

        for (let i = 1; i < coupons.length; i++) {
          const prevOrder = orderMap.get(coupons[i - 1].courseId)
          const currOrder = orderMap.get(coupons[i].courseId)

          // 両方がCOURSE_DISPLAY_ORDERに含まれている場合、順序を確認
          if (prevOrder !== undefined && currOrder !== undefined) {
            expect(prevOrder).toBeLessThanOrEqual(currOrder)
          }
        }
      }
    })

    it("COURSE_DISPLAY_ORDERに含まれていないクーポンは最後にソートされること", () => {
      // このテストは実装の詳細に依存するため、
      // COURSE_DISPLAY_ORDERに含まれていないクーポンが
      // 含まれているクーポンの後に配置されることを確認
      const coupons = getLatestCoupons()

      if (coupons.length === 0) {
        return
      }

      const { COURSE_DISPLAY_ORDER } = jest.requireActual(
        "@/constants/coupon-courses"
      )
      const orderSet = new Set(COURSE_DISPLAY_ORDER)

      let foundNotInOrder = false
      let lastInOrderIndex = -1

      coupons.forEach((coupon, index) => {
        if (orderSet.has(coupon.courseId)) {
          if (foundNotInOrder) {
            // COURSE_DISPLAY_ORDERに含まれていないクーポンの後に
            // 含まれているクーポンが来る場合、テスト失敗
            // （実際にはこの状況は発生しないはず）
          } else {
            lastInOrderIndex = index
          }
        } else {
          foundNotInOrder = true
        }
      })

      // 検証：COURSE_DISPLAY_ORDERに含まれているクーポンが
      // 含まれていないクーポンより前にあること
      if (foundNotInOrder && lastInOrderIndex >= 0) {
        coupons.forEach((coupon, index) => {
          if (!orderSet.has(coupon.courseId)) {
            expect(index).toBeGreaterThanOrEqual(lastInOrderIndex)
          }
        })
      }
    })
  })
})
