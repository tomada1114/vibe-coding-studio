/**
 * サンプル動画データ
 *
 * このファイルは、動画メタデータの完全な例として参照できます。
 * 実際のプロジェクトで作成された動画データを元にしています。
 */

import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * 動画ID: 1-1NAB5jIjo
 * タイトル: リアルなAI駆動開発の全工程！現役エンジニアの仕様駆動開発の流れを公開
 *
 * この動画データは以下の特徴を持ちます：
 * - 1時間を超える動画（タイムスタンプがHH:MM:SS形式）
 * - cc-sdd（仕様駆動開発）がテーマ
 * - Claude Codeとカスタムコマンドの実践的な内容
 * - 関連動画5本を含む
 * - Udemy講座セクション付き（Claude Code系フィルター）
 */
export const video_1_1NAB5jIjo: VideoMetadata = {
  // ========================================
  // 基本情報（必須）
  // ========================================

  id: "1-1NAB5jIjo",
  title: "リアルなAI駆動開発の全工程！現役エンジニアの仕様駆動開発の流れを公開",
  publishedAt: "2025-11-01T00:00:00+09:00",  // ISO 8601形式、JST（+09:00）
  videoUrl: "https://www.youtube.com/watch?v=1-1NAB5jIjo",

  // ========================================
  // 冒頭セクション（必須）
  // ========================================

  /**
   * opening: 動画の冒頭説明文
   *
   * ガイドライン:
   * - 2-5行程度
   * - 一文ごとに改行
   * - 空文字列を含めない（重要）
   * - 自然な改行位置
   */
  opening: {
    lines: [
      "綺麗なチュートリアルじゃなく、リアルな開発プロセスをすべてお見せします！",
      "個人開発サイト「Vibe Coding Studio」にカスタムコマンド公開機能を追加する過程を、試行錯誤も含めてすべての思考プロセスを収録しました。",
      "実際にAI駆動開発を日常的にやっているエンジニアが、どう仕様を詰めて、どこでつまづいて、どう修正していくか。",
      "そういうリアルなAI駆動開発の思考プロセスを学び、ご自身の開発に活用していただければ幸いです。",
    ],
  },

  // ========================================
  // 学べる内容セクション（必須）
  // ========================================

  /**
   * learningPoints: 動画で学べること
   *
   * ガイドライン:
   * - title: "💡 この動画で学べること" または "💡 この動画の特徴"
   * - items: 各項目は ✅ で開始
   * - 4-6項目が理想
   */
  learningPoints: {
    title: "💡 この動画の特徴",
    items: [
      "✅ チュートリアルではなく、実際の開発プロセスをそのまま収録",
      "✅ cc-sdd（仕様駆動開発）を使った要件定義・設計の対話プロセス",
      "✅ Codexによる自動レビューでの指摘と軌道修正",
      "✅ スコープ調整や優先順位判断のリアルな判断",
      "✅ コンテキスト管理やMCP無効化などの実務テクニック",
      "✅ 失敗や迷いも含めた、飾らない開発の実態",
    ],
  },

  // ========================================
  // タイムスタンプセクション（必須）
  // ========================================

  /**
   * timestamps: タイムライン
   *
   * ガイドライン:
   * - title: "⏰ タイムライン"
   * - time形式: /^\d{1,2}:\d{2}(:\d{2})?$/
   *   - MM:SS（1時間未満）: "00:00", "12:34"
   *   - HH:MM:SS（1時間以上）: "01:00:52", "01:12:45"
   * - 10-15項目程度
   */
  timestamps: {
    title: "⏰ タイムライン",
    items: [
      { time: "00:00", label: "はじめに" },
      { time: "01:50", label: "今回作る機能を整理" },
      { time: "08:11", label: "ブランチを作成" },
      { time: "09:14", label: "cc-sddで仕様駆動開発" },
      { time: "13:45", label: "要件定義フェーズ" },
      { time: "27:34", label: "設計フェーズ" },
      { time: "41:55", label: "計画フェーズ" },
      { time: "48:29", label: "実装フェーズ" },
      { time: "50:54", label: "品質チェック" },
      { time: "52:34", label: "MCPで自動確認" },
      { time: "01:00:52", label: "手動で動作確認" },  // 1時間超
      { time: "01:05:17", label: "GitHub PR作成" },
      { time: "01:08:57", label: "/reviewで自動レビュー" },
      { time: "01:12:45", label: "まとめ" },
    ],
  },

  // ========================================
  // タグ（必須）
  // ========================================

  /**
   * tags: ハッシュタグ
   *
   * ガイドライン:
   * - #記号は含めない
   * - 10-15個程度
   * - カテゴリ別に整理
   */
  tags: [
    "AI駆動開発",
    "仕様駆動開発",
    "ccsdd",
    "SpecDrivenCodex",
    "VibeCoding",
    "バイブコーディング",
    "ClaudeCode",
    "CodexCLI",
    "個人開発",
    "実践的プログラミング",
    "開発プロセス",
    "試行錯誤",
  ],

  // ========================================
  // 関連動画セクション（オプション・重要）
  // ========================================

  /**
   * relatedVideos: 関連動画
   *
   * ガイドライン:
   * - 3-5本を選定（5本推奨）
   * - 選定基準:
   *   1. 同じシリーズ・続編（優先度最高）
   *   2. 同じツール・技術
   *   3. 同じ開発手法
   *   4. 補完的なトピック
   *
   * この例では:
   * - HM0SLThgXqE: cc-sdd本体の解説（最優先）
   * - 1EQllS_3TJo: Codex版の仕様駆動開発（補完）
   * - Xr_HhLuzOy8: Claude Code基礎（初心者向け）
   * - SO5qov2qTUE: 開発ルール設定（関連手法）
   * - 1LP4ZAsU_UI: Git運用術（開発フロー）
   */
  relatedVideos: {
    title: "📌 関連動画",
    videos: [
      {
        title:
          "【仕様駆動開発】cc-sddでClaude Code/CursorなどをKiro化！日本語対応の国産ツールで簡単に始めるスペック駆動開発",
        url: "https://www.youtube.com/watch?v=HM0SLThgXqE",
      },
      {
        title:
          "【Codex CLI対応】仕様駆動開発を1コマンドで導入！Spec Driven Codexで要件定義→設計→実装まで完全自動化",
        url: "https://www.youtube.com/watch?v=1EQllS_3TJo",
      },
      {
        title:
          "【1時間で速習】Claude Code完全ガイド AI駆動開発で企業サイトを作ってデプロイまで実演！",
        url: "https://www.youtube.com/watch?v=Xr_HhLuzOy8",
      },
      {
        title:
          "【コード品質UP】技術的負債を作らないための AI 向け開発ルールを設定しよう（Claude Code/Codex/Cursor 対応）",
        url: "https://www.youtube.com/watch?v=SO5qov2qTUE",
      },
      {
        title: "AIが書いたコード、いつコミットする？失敗しないGit運用術",
        url: "https://www.youtube.com/watch?v=1LP4ZAsU_UI",
      },
    ],
  },

  // ========================================
  // Udemy講座セクション（オプション・重要）
  // ========================================

  /**
   * udemyCourses: Udemy講座誘導
   *
   * ガイドライン:
   * - title: 動画テーマに応じたタイトル
   * - description: 簡潔な説明
   * - courses: 学べる内容を4-5項目
   * - cta.text: "🎁 限定クーポンで最大90%OFF!"
   * - cta.url: フィルター付きURL
   *   - Claude Code系: ?topic=claude-code
   *   - Codex系: ?topic=codex
   *   - 汎用: フィルターなし
   *
   * この例では:
   * - 動画テーマ: Claude Code + カスタムコマンド + 仕様駆動開発
   * - 判定: Claude Code系 → ?topic=claude-code
   */
  udemyCourses: {
    title: "🚀 体系的にClaude Codeを学びたい方へ",
    description:
      "Udemy講座でClaude Codeを体系的にマスター！カスタムコマンドや仕様駆動開発など実践的なスキルを習得できます。",
    courses: [
      "カスタムコマンドの作成と活用方法",
      "仕様駆動開発（cc-sdd）の実践",
      "実践的なアプリ開発の全工程",
      "MCP連携で外部ツールを自在に操る",
      "コード品質を保ちながら爆速開発",
    ],
    cta: {
      text: "🎁 限定クーポンで最大90%OFF!",
      url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code",
    },
  },

  // ========================================
  // カスタムセクション（オプション）
  // ========================================

  /**
   * customSections: 追加コンテンツ
   *
   * ガイドライン:
   * - type: "text" を推奨（URLを含む場合）
   * - content: \n で改行
   * - URLは必ず別行に
   *
   * この例では:
   * - 公開したカスタムコマンドページへのリンク
   */
  customSections: [
    {
      type: "text",
      title: "📝 関連記事・リソース",
      content:
        "公開したカスタムコマンド\nVibe Coding Studioの公式サイトで公開中\nhttps://www.vibecodingstudio.dev/claude-code/commands",
    },
  ],

  // ========================================
  // 共通セクション（必須）
  // ========================================

  /**
   * commonSectionsから参照
   *
   * - social: SNS・コミュニティリンク
   * - discordCommunity: Discordコミュニティ
   * - engagement: エンゲージメント促進
   */
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}

/**
 * 実装のポイント
 *
 * 1. **改行位置の最適化**:
 *    - opening.lines: 一文ごとに改行
 *    - customSections: URLは別行（\nで区切る）
 *    - 空文字列は含めない
 *
 * 2. **関連動画の選定**:
 *    - 同じツール・開発手法を優先
 *    - 3-5本を厳選
 *    - 初心者向けと実践者向けをバランス良く
 *
 * 3. **Udemy講座URL**:
 *    - 動画テーマから適切なフィルターを判別
 *    - Claude Code系: ?topic=claude-code
 *    - Codex系: ?topic=codex
 *    - 汎用: フィルターなし
 *
 * 4. **タイムスタンプ形式**:
 *    - 1時間未満: MM:SS
 *    - 1時間以上: HH:MM:SS または H:MM:SS
 *    - 正規表現: /^\d{1,2}:\d{2}(:\d{2})?$/
 *
 * 5. **テストの通過**:
 *    - opening.lines に空文字列がないこと
 *    - timestamps.time が正しい形式
 *    - relatedVideos.videos が空でないこと
 *    - videoUrl が正しいYouTube URL形式
 */
