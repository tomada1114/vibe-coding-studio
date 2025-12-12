/**
 * Udemy講座API レスポンス型定義
 *
 * GET /api/udemy-courses
 * GET /api/udemy-courses?topic=claude-code
 * GET /api/udemy-courses/topics
 */

/**
 * API で返す講座情報
 * 価格情報は含まない
 */
export interface UdemyCourseApiInfo {
  /** 講座ID（Udemy内部ID） */
  id: string
  /** 講座タイトル */
  title: string
  /** URLスラッグ */
  slug: string
  /** 講座の概要説明 */
  description: string
  /** 関連トピック一覧 */
  topics: string[]
  /** 詳細ページURL */
  url: string
}

/**
 * 講座一覧API レスポンス
 *
 * @example
 * // 全講座取得
 * GET /api/udemy-courses
 *
 * @example
 * // トピックでフィルタリング
 * GET /api/udemy-courses?topic=claude-code
 */
export interface UdemyCoursesApiResponse {
  /** 講座一覧 */
  courses: UdemyCourseApiInfo[]
  /** 総件数 */
  totalCount: number
  /** 適用されているフィルター */
  filter?: {
    /** フィルタリングに使用したトピック */
    topic?: string
  }
}

/**
 * トピック情報
 */
export interface UdemyTopicApiInfo {
  /** トピックスラッグ（フィルタリング用キー） */
  slug: string
  /** トピック表示名 */
  name: string
  /** アイコンURL */
  icon: string
  /** 該当講座数 */
  courseCount: number
}

/**
 * トピック一覧API レスポンス
 *
 * @example
 * GET /api/udemy-courses/topics
 */
export interface UdemyTopicsApiResponse {
  /** 利用可能なトピック一覧 */
  topics: UdemyTopicApiInfo[]
  /** 総トピック数 */
  totalCount: number
}

/**
 * API概要情報
 *
 * @example
 * GET /api/udemy-courses (クエリなし)
 */
export interface UdemyCoursesApiInfo {
  /** API名 */
  name: string
  /** APIの説明 */
  description: string
  /** ベースURL */
  baseUrl: string
  /** 利用可能なエンドポイント */
  endpoints: {
    /** エンドポイントパス */
    path: string
    /** HTTPメソッド */
    method: string
    /** エンドポイントの説明 */
    description: string
    /** パラメータ */
    parameters?: {
      name: string
      type: string
      required: boolean
      description: string
    }[]
  }[]
}
