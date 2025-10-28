import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * AI駆動開発のGitコミット戦略動画
 * ClaudeCodeやCodexを使ったAI駆動開発におけるGitコミットのベストプラクティス
 */
export const video003: VideoMetadata = {
  // 基本情報
  id: "1LP4ZAsU_UI",
  title: "AIが書いたコード、いつコミットする？失敗しないGit運用術",
  publishedAt: "2025-10-20T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=1LP4ZAsU_UI",

  // 冒頭セクション
  opening: {
    lines: [
      "Claude CodeやCodexでAI駆動開発を始めたけれど、「いつコミットすればいいかわからない」と悩んでいませんか?",
      "AIは数秒で一気にコードを大量生成します。ですが、通常の開発とは違って、どのタイミングでコミットすべきか判断が難しいんですよね。",
      "この動画では、初心者から段階的に実践できるGitコミット戦略をわかりやすく解説します！",
      "ご相談や質問はDiscordコミュニティでも受け付けてます👍",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ AI駆動開発でコミットが難しい理由",
      "✅ 初心者向け：作業ごとにコミットする方法",
      "✅ 中級者向け：動作確認後にコミットする実践テクニック",
      "✅ CLAUDE.md/AGENTS.mdでAIに指示する書き方",
      "✅ ブランチ運用のベストプラクティス",
      "✅ コミットの基本原則と判断基準",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "動画の背景" },
      { time: "00:36", label: "今日のテーマ" },
      { time: "00:56", label: "Gitコミットとは" },
      { time: "01:42", label: "AI駆動開発でコミットが難しい理由" },
      { time: "02:52", label: "初心者向け - 作業ごとにコミット" },
      { time: "04:15", label: "慣れてきたら - 動作確認後にコミット" },
      { time: "07:02", label: "CLAUDE.md/AGENTS.mdに書く指示" },
      { time: "08:52", label: "補足：ブランチ運用のすすめ" },
      { time: "10:14", label: "まとめ" },
      { time: "11:22", label: "Discordコミュニティ紹介" },
    ],
  },

  // タグ
  tags: [
    "#ClaudeCode",
    "#CodexCLI",
    "#Git",
    "#コミット",
    "#AI駆動開発",
    "#バイブコーディング",
    "#VibeCoding",
    "#プログラミング",
    "#初心者",
    "#エンジニア",
    "#GitHub",
    "#バージョン管理",
    "#開発効率化",
  ],

  // カスタムセクション
  customSections: [
    {
      type: "mixed",
      title: "🎯 こんな方におすすめ",
      items: [
        "AI駆動開発ツールを使い始めたばかりの方",
        "AIが生成したコードのコミットタイミングに悩んでいる方",
        "Git初心者でAI開発も始めた方",
        "現場レベルのコミット運用を知りたい方",
      ],
    },
    {
      type: "text",
      title: "📝 CLAUDE.md（AGENTS.md）への指示テンプレート",
      content:
        "動画内で紹介している指示をそのまま使えます。\n\n「実装が一区切りしたタイミングでコミットメッセージを1行で教えてください。私がコミットします。」",
    },
  ],

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的にAI駆動開発を学びたい方へ",
    description:
      "Claude CodeとCodexを使った開発手法を体系的に学べるUdemy講座を公開中！",
    courses: [
      "Claude Code完全マスター講座",
      "Codex CLI実践マスター講座",
      "バイブコーディング実践講座",
      "MCP連携で外部ツールを自在に操る方法",
    ],
    cta: {
      text: "🎁 最大90%OFFクーポン配布中！",
      url: "https://school.learning-next.app/coupons",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
