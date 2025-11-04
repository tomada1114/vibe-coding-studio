/**
 * Udemy講座インデックスの型定義
 *
 * このファイルでは、Udemy講座インデックスシステムで使用するデータ構造を定義します。
 * インデックスはCOURSE_INFOから生成され、タグベースのUdemy講座自動選定に使用されます。
 */

/**
 * Udemy講座インデックスエントリ
 * 各講座の検索用メタデータを格納
 */
export interface UdemyCourseIndexItem {
  /** 講座ID（例: "6691241"） */
  courseId: string
  /** 講座タイトル */
  title: string
  /** トピック配列（最低1つ以上） */
  topics: string[]
  /** プロモーションURL */
  promotionUrl: string
  /** 講座説明 */
  description: string
}

/**
 * トピックマッピング
 * トピック別の講座URLマッピング
 */
export interface TopicMapping {
  [topic: string]: Array<{
    courseId: string
    url: string
  }>
}

/**
 * Udemy講座インデックス
 * すべての講座のメタデータを含む
 */
export interface UdemyCourseIndex {
  /** バージョン情報 */
  version: string
  /** 生成日時（ISO 8601形式） */
  generatedAt: string
  /** 講座インデックスエントリ配列 */
  courses: UdemyCourseIndexItem[]
  /** トピック別の講座URLマッピング */
  topicMapping: TopicMapping
}
