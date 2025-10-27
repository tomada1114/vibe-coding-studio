/**
 * YouTube動画メタデータの型定義
 *
 * このファイルでは、YouTube動画のメタデータ構造を定義します。
 * すべての動画データファイルは、これらの型に準拠する必要があります。
 */

/**
 * タイムスタンプアイテム
 * YouTube概要欄のタイムスタンプ("00:00 イントロダクション"形式)
 */
export interface TimestampItem {
  /** 時間("00:00"形式) */
  time: string
  /** ラベル */
  label: string
}

/**
 * 冒頭セクション
 * 動画の最初に表示される説明文
 */
export interface OpeningSection {
  /** 冒頭の各行 */
  lines: string[]
}

/**
 * 学べる内容セクション
 * "💡 この動画で学べること"セクション
 */
export interface LearningPointsSection {
  /** セクションタイトル(例: "💡 この動画で学べること") */
  title: string
  /** 箇条書き項目(✅で始まる) */
  items: string[]
}

/**
 * タイムスタンプセクション
 * "⏰ タイムスタンプ"セクション
 */
export interface TimestampSection {
  /** セクションタイトル(例: "⏰ タイムスタンプ") */
  title: string
  /** タイムスタンプリスト */
  items: TimestampItem[]
}

/**
 * 関連動画情報
 */
export interface RelatedVideo {
  /** 動画タイトル */
  title: string
  /** 動画URL */
  url: string
  /** 絵文字(オプション) */
  emoji?: string
}

/**
 * 関連動画セクション
 */
export interface RelatedVideosSection {
  /** セクションタイトル(例: "📌 関連動画") */
  title: string
  /** 関連動画リスト */
  videos: RelatedVideo[]
}

/**
 * Udemy講座誘導セクション
 */
export interface UdemyCoursesSection {
  /** セクションタイトル(例: "🚀 体系的に学びたい方へ") */
  title: string
  /** 説明文(オプション) */
  description?: string
  /** 講座リスト(オプション) */
  courses?: string[]
  /** CTA(Call To Action) */
  cta: {
    /** CTAテキスト */
    text: string
    /** CTAURL */
    url: string
  }
}

/**
 * SNSアカウント情報
 */
export interface SocialAccount {
  /** プラットフォーム名 */
  platform: string
  /** 絵文字 */
  emoji: string
  /** 表示ラベル(オプション) */
  label?: string
  /** URL */
  url: string
}

/**
 * SNS・コミュニティセクション
 */
export interface SocialSection {
  /** セクションタイトル(例: "🔗 SNS・コミュニティ") */
  title: string
  /** SNSアカウントリスト */
  accounts: SocialAccount[]
}

/**
 * Discordコミュニティセクション
 */
export interface DiscordSection {
  /** セクションタイトル(例: "💬 Discordコミュニティ(無料)") */
  title: string
  /** 説明文 */
  description: string
  /** Discord招待URL */
  url: string
  /** 無料かどうか */
  isFree?: boolean
}

/**
 * エンゲージメント促進セクション
 */
export interface EngagementSection {
  /** セクションタイトル(オプション) */
  title?: string
  /** メッセージ */
  message: string
  /** CTA文言 */
  callToAction: string
}

/**
 * カスタムセクション(基底型)
 */
export interface CustomSectionBase {
  /** セクションタイトル */
  title: string
  /** セクションタイプ */
  type: "text" | "list" | "links" | "mixed"
}

/**
 * テキストセクション
 */
export interface TextSection extends CustomSectionBase {
  type: "text"
  /** テキストコンテンツ */
  content: string
}

/**
 * リストセクション
 */
export interface ListSection extends CustomSectionBase {
  type: "list"
  /** リスト項目 */
  items: string[]
}

/**
 * リンクセクション
 */
export interface LinkSection extends CustomSectionBase {
  type: "links"
  /** リンクリスト */
  links: Array<{
    label: string
    url: string
  }>
}

/**
 * 混合セクション(テキスト + リスト + リンク)
 */
export interface MixedSection extends CustomSectionBase {
  type: "mixed"
  /** テキストコンテンツ(オプション) */
  content?: string
  /** リスト項目(オプション) */
  items?: string[]
  /** リンクリスト(オプション) */
  links?: Array<{
    label: string
    url: string
  }>
}

/**
 * カスタムセクション(Union型)
 */
export type CustomSection =
  | TextSection
  | ListSection
  | LinkSection
  | MixedSection

/**
 * 動画メタデータ
 * 1つの動画に対応するすべてのメタデータを含む
 */
export interface VideoMetadata {
  /** 動画ID(ファイル名から生成、例: "video-001") */
  id: string
  /** 動画タイトル */
  title: string
  /** 公開日時(ISO 8601形式) */
  publishedAt: string
  /** YouTube動画URL */
  videoUrl: string

  // 必須セクション
  /** 冒頭セクション */
  opening: OpeningSection
  /** 学べる内容セクション */
  learningPoints: LearningPointsSection
  /** タイムスタンプセクション */
  timestamps: TimestampSection
  /** タグ */
  tags: string[]

  // オプションセクション
  /** 関連動画セクション(オプション) */
  relatedVideos?: RelatedVideosSection
  /** Udemy講座誘導セクション(オプション) */
  udemyCourses?: UdemyCoursesSection
  /** カスタムセクション(オプション) */
  customSections?: CustomSection[]

  // 共通データ参照
  /** SNS・コミュニティセクション */
  social: SocialSection
  /** Discordコミュニティセクション(オプション) */
  discordCommunity?: DiscordSection
  /** エンゲージメント促進セクション */
  engagement: EngagementSection
}

/**
 * 共通セクション定義
 */
export interface CommonSections {
  social: SocialSection
  discordCommunity: DiscordSection
  engagement: EngagementSection
}
