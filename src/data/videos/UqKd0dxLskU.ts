import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Claude Code on the Web 解説動画
 * ブラウザやスマホからAI駆動開発ができる新機能の紹介
 */
export const video_UqKd0dxLskU: VideoMetadata = {
  // 基本情報
  id: "UqKd0dxLskU",
  title:
    "Claude Code on the Web で開発が変わる！外出先でも開発が可能になった！",
  publishedAt: "2025-10-20T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=UqKd0dxLskU",

  // 冒頭セクション
  opening: {
    lines: [
      "Claude Codeに新機能「Claude Code on the Web」が登場しました!",
      "ブラウザやスマホアプリからAI開発を始められる、革命的なアップデートです。",
      "実際に試してみたので、できること・できないこと、そして活用シーンを詳しく解説します!",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 動画のポイント",
    items: [
      "✅ ブラウザ・スマホアプリからClaude Codeを起動できる",
      "✅ GitHubリポジトリと直接連携",
      "✅ セキュリティも考慮された安全な開発環境",
      "✅ Proユーザー・Maxユーザーが利用可能",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "リリース内容" },
      { time: "00:42", label: "概要をつかもう" },
      { time: "04:44", label: "セットアップ方法" },
      { time: "05:45", label: "初期画面" },
      { time: "06:49", label: "最初のセッション" },
      { time: "08:03", label: "依存関係インストールに失敗" },
      { time: "11:14", label: "必要な依存関係のみインストール" },
      { time: "11:36", label: "成功したので開発スタート" },
      { time: "13:05", label: "PRの作成" },
      { time: "14:04", label: "スクショ取得は不可" },
      { time: "16:32", label: "対応しているプログラミング言語" },
      { time: "16:51", label: "まとめ" },
    ],
  },

  // タグ
  tags: [
    "バイブコーディング",
    "Claude",
    "VibeCoding",
    "ClaudeCode",
    "AI駆動開発",
    "プログラミング",
    "個人開発",
    "副業",
    "Webアプリ開発",
    "Anthropic",
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "📚 関連動画",
    videos: [
      {
        title:
          "【どっちを選ぶ？】Claude Code vs Codex CLI！両方使い倒した現役エンジニアの最終結論を徹底解説！",
        url: "https://www.youtube.com/watch?v=4HJCCAfDGU4",
      },
      {
        title:
          "【AI駆動開発】初心者OK！Claude Codeでバイブコーディング〜React ポモドーロタイマーを作る",
        url: "https://www.youtube.com/watch?v=d67qWFEdxCI",
      },
      {
        title:
          "【実践編】SuperClaudeのコマンドをフル活用！要件定義・設計・計画・エラー解決から品質改善までの推奨フローを完全解説",
        url: "https://www.youtube.com/watch?v=ECRzrFNIWNM",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的にClaude Codeを学んで一歩先へ!",
    description:
      "UdemyのClaude Code実践マスター講座では、さらに高度な内容を体系的に学べます。",
    cta: {
      text: "限定クーポンで最大90%OFF!",
      url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
