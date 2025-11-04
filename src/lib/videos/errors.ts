/**
 * 動画インデックスシステムのエラー定義
 *
 * このファイルでは、動画インデックスとUdemy講座インデックスシステムで
 * 発生する可能性のあるエラーを定義します。
 */

/**
 * 動画インデックスエラーコード
 */
export enum VideoIndexErrorCode {
  // インデックス生成エラー
  /** 動画データファイルが見つからない */
  NO_VIDEO_FILES = "NO_VIDEO_FILES",
  /** 動画データが不正 */
  INVALID_VIDEO_DATA = "INVALID_VIDEO_DATA",
  /** ファイル書き込みエラー */
  FILE_WRITE_ERROR = "FILE_WRITE_ERROR",

  // インデックス読み込みエラー
  /** インデックスファイルが見つからない */
  INDEX_NOT_FOUND = "INDEX_NOT_FOUND",
  /** 不正なJSON形式 */
  INVALID_JSON = "INVALID_JSON",
  /** スキーマ違反 */
  SCHEMA_VIOLATION = "SCHEMA_VIOLATION",

  // 検索エラー
  /** 空のタグ配列 */
  EMPTY_TAGS = "EMPTY_TAGS",
  /** 検索結果なし */
  NO_RESULTS = "NO_RESULTS",
}

/**
 * Udemy講座インデックスエラーコード
 */
export enum UdemyCourseIndexErrorCode {
  // インデックス生成エラー
  /** 講座データが見つからない */
  NO_COURSE_DATA = "NO_COURSE_DATA",
  /** 講座データが不正 */
  INVALID_COURSE_DATA = "INVALID_COURSE_DATA",
  /** ファイル書き込みエラー */
  FILE_WRITE_ERROR = "FILE_WRITE_ERROR",

  // インデックス読み込みエラー
  /** インデックスファイルが見つからない */
  INDEX_NOT_FOUND = "INDEX_NOT_FOUND",
  /** 不正なJSON形式 */
  INVALID_JSON = "INVALID_JSON",
  /** スキーマ違反 */
  SCHEMA_VIOLATION = "SCHEMA_VIOLATION",

  // 選定エラー
  /** 空のタグ配列 */
  EMPTY_TAGS = "EMPTY_TAGS",
  /** 選定結果なし */
  NO_RESULTS = "NO_RESULTS",
}

/**
 * 動画インデックスエラークラス
 */
export class VideoIndexError extends Error {
  public readonly name = "VideoIndexError"

  constructor(
    public readonly code: VideoIndexErrorCode,
    message: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message)
    // TypeScriptのビルトインErrorクラスを正しく継承するための処理
    Object.setPrototypeOf(this, VideoIndexError.prototype)
  }
}

/**
 * Udemy講座インデックスエラークラス
 */
export class UdemyCourseIndexError extends Error {
  public readonly name = "UdemyCourseIndexError"

  constructor(
    public readonly code: UdemyCourseIndexErrorCode,
    message: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message)
    // TypeScriptのビルトインErrorクラスを正しく継承するための処理
    Object.setPrototypeOf(this, UdemyCourseIndexError.prototype)
  }
}
