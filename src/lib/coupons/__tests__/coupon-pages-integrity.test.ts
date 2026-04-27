import fs from "node:fs"
import path from "node:path"

import { COURSE_INFO } from "@/constants/coupon-courses"

import { getLatestCoupons } from "../coupon-data"

/**
 * クーポンページ整合性テスト
 *
 * 目的:
 *   src/app/coupons/ 配下の各クーポン詳細ページディレクトリと、
 *   COURSE_INFO / COUPON_DATA の間で整合性が取れていることを保証する。
 *
 * このテストが防ぐ問題:
 *   - クーポン詳細ページが存在するのに COURSE_INFO に対応エントリがない（孤児ページ）
 *   - COURSE_INFO エントリがあるのに対応するページが存在しない
 *   - COURSE_INFO / COUPON_DATA に登録されているがクーポンデータが取得できない
 *   - 新しいクーポンページ追加時の登録漏れ
 *
 * 注意: ページ内の検索ロジックそのものはレンダリングテストでは検証していないが、
 * 全ページが courseId ベースの検索に統一されていれば、ディレクトリ名 (= slug) と
 * COURSE_INFO.slug の整合性チェックで実質的に同等の保証が得られる。
 */

// テストファイルからの相対パスでクーポンページディレクトリを解決
// (process.cwd() だと Jest の実行場所に依存するため使わない)
const COUPONS_APP_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "app",
  "coupons"
)

/**
 * src/app/coupons/ 配下のクーポン詳細ページディレクトリ一覧を取得
 * （ファイルやルートページ自体は除外）
 */
function getCouponPageSlugs(): string[] {
  const entries = fs.readdirSync(COUPONS_APP_DIR, { withFileTypes: true })
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
}

const pageSlugs = getCouponPageSlugs()
const courseInfoEntries = Object.entries(COURSE_INFO)
const courseInfoSlugs = courseInfoEntries.map(([, info]) => info.slug).sort()

// it.each は空配列を渡すと「Expected array of rows, received empty array」
// エラーで失敗するため、配列が空の場合はモジュール読み込み時点で明示的に失敗させる。
// これにより問題の原因が一目で分かる。
if (pageSlugs.length === 0) {
  throw new Error(
    `No coupon page directories found in ${COUPONS_APP_DIR}. ` +
      `Check that the test is resolving the correct path.`
  )
}
if (courseInfoEntries.length === 0) {
  throw new Error("COURSE_INFO is empty. Check src/constants/coupon-courses.ts")
}

describe("クーポンページ整合性", () => {
  describe("ページディレクトリ → COURSE_INFO", () => {
    it.each(pageSlugs)(
      "ページ '%s' に対応する COURSE_INFO エントリが存在すること",
      slug => {
        const matched = courseInfoEntries.find(([, info]) => info.slug === slug)
        expect(matched).toBeDefined()
      }
    )

    it.each(pageSlugs)(
      "ページ '%s' のクーポンが getLatestCoupons() で取得できること",
      slug => {
        const matched = courseInfoEntries.find(([, info]) => info.slug === slug)
        // 上のテストで検証済みだが、型ナローイングのため再チェック
        expect(matched).toBeDefined()
        const courseId = matched![0]

        const coupons = getLatestCoupons()
        const coupon = coupons.find(c => c.courseId === courseId)
        expect(coupon).toBeDefined()
      }
    )
  })

  describe("COURSE_INFO → ページディレクトリ", () => {
    it.each(courseInfoSlugs)(
      "COURSE_INFO の slug '%s' に対応するページディレクトリが存在すること",
      slug => {
        expect(pageSlugs).toContain(slug)
      }
    )
  })

  describe("件数の一致", () => {
    it("ページディレクトリ数と COURSE_INFO のエントリ数が一致すること", () => {
      expect(pageSlugs.length).toBe(courseInfoEntries.length)
    })
  })

  /**
   * タイトルドリフト検知
   *
   * COURSE_INFO[id].title を更新したのに、対応するページ内のハードコードされた
   * タイトル文字列を更新し忘れると、ユーザーに古いタイトルが表示される
   * （サイレント不整合）。このテストでは、各ページの page.tsx ファイル内容に
   * COURSE_INFO.title が少なくとも1回現れることを検証する。
   */
  describe("タイトルドリフト検知", () => {
    it.each(courseInfoEntries)(
      "courseId '%s' のページが COURSE_INFO.title を含んでいること",
      (_courseId, info) => {
        const pagePath = path.join(COUPONS_APP_DIR, info.slug, "page.tsx")
        // 前段のテストでディレクトリの存在は保証されているが、念のため
        expect(fs.existsSync(pagePath)).toBe(true)

        const content = fs.readFileSync(pagePath, "utf-8")
        expect(content).toContain(info.title)
      }
    )
  })
})
