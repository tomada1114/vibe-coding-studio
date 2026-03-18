import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Verdent AI初見レビュー動画
 * macOS向けAIコーディングツール「Verdent AI」をReactタスク管理ダッシュボード構築を通じてレビュー
 */
export const video_DYRJvDiiprA: VideoMetadata = {
  // 基本情報
  id: "DYRJvDiiprA",
  title:
    "Verdent AIを初見レビュー！並列×マルチモデルレビューを試した感想",
  publishedAt: "2026-03-21T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=DYRJvDiiprA",

  // 冒頭セクション
  opening: {
    lines: [
      "【提供】Verdent AI @verdent_ai",
      "Verdent AI を今すぐ試す ▶ https://www.verdent.ai/",
      "普段はClaude Code / Cursor / Codexを使っている自分が、AIコーディングツール「Verdent AI」を初見で触ってレビューしました。",
      "今回はReactでカンバン形式のタスク管理ダッシュボードを作りながら、Verdentの主要機能を一通り試しています。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 動画のポイント",
    items: [
      "・Plan Mode — 曖昧な指示からMermaid図付きの構造化計画を自動生成",
      "・Agent Mode — 計画をワンクリックで自律実装",
      "・マルチモデルレビュー — Gemini / Opus / GPTの3モデル同時レビュー",
      "・並列ワークスペース — Git Worktreeベースで複数タスクを同時並行",
      "・スキル — フロントエンドデザインスキルでUI一括ブラッシュアップ",
    ],
  },

  // タグ
  tags: [
    "VerdentAI",
    "Verdent",
    "AIコーディングツール",
    "AIcoding",
    "Vibecoding",
    "バイブコーディング",
    "AI駆動開発",
    "レビュー",
    "PlanMode",
    "マルチモデルレビュー",
    "並列ワークスペース",
    "GitWorktree",
    "ClaudeCode",
    "Cursor",
    "Codex",
    "React",
    "ad",
    "sponsored",
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      {
        title:
          "【完全比較】Claude Code vs Codex！Codexのコード品質がClaude Codeを超えた！",
        url: "https://www.youtube.com/watch?v=Yy2alUag5I8",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的にAI駆動開発を学びたい方へ",
    description:
      "AI駆動開発の実践スキルを体系的に学べるUdemy講座をご用意しています。",
    cta: {
      text: "限定クーポンで最大90%OFF！",
      url: "https://www.vibecodingstudio.dev/coupons",
    },
  },

  // カスタムセクション
  customSections: [
    {
      type: "text",
      title: "🤖 動画内で使用したモデル",
      content:
        "・Plan Mode: Claude Sonnet 4.6\n・Build（Agent Mode）: GPT-5.4\n・マルチモデルレビュー: Gemini 3.1 Pro / Opus 4.6 / GPT-5.2",
    },
    {
      type: "text",
      title: "🔗 Verdent AI",
      content:
        "公式サイト: https://www.verdent.ai/\nYouTube: https://www.youtube.com/@verdent_ai",
    },
  ],

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
