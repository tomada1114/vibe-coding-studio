/**
 * 動画インデックスの型定義
 *
 * このファイルでは、動画インデックスシステムで使用するデータ構造を定義します。
 * インデックスは動画データファイルから生成され、高速な関連動画検索に使用されます。
 */

/**
 * 動画インデックスのメタデータ
 */
export interface VideoIndexMetadata {
  /** インデックスのバージョン（セマンティックバージョニング、例: "1.0.0"） */
  version: string
  /** 生成日時（ISO 8601形式、例: "2025-11-04T10:00:00Z"） */
  generatedAt: string
}

/**
 * 動画インデックスエントリ
 * 各動画の検索用メタデータを格納
 */
export interface VideoIndexItem {
  /** 動画ID（例: "1-1NAB5jIjo"） */
  id: string
  /** 動画タイトル */
  title: string
  /** タグ配列（最低1つ以上） */
  tags: string[]
  /** 関連動画ID配列 */
  relatedVideoIds: string[]
  /** 推薦Udemy講座ID配列 */
  udemyCourseIds: string[]
}

/**
 * 動画インデックス
 * すべての動画のメタデータを含む
 */
export interface VideoIndex {
  /** バージョン情報 */
  version: string
  /** 生成日時 */
  generatedAt: string
  /** 動画インデックスエントリ配列 */
  videos: VideoIndexItem[]
}
