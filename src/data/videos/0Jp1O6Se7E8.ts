import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * Claude Code 権限モード（Permission Modes）完全解説動画
 * Default・Accept Edits・Plan・Bypass Permissions・Don't Ask・Auto の6モードを実演付きで紹介
 */
export const video_0Jp1O6Se7E8: VideoMetadata = {
  // 基本情報
  id: "0Jp1O6Se7E8",
  title:
    "Claude Codeの権限モード（Permission Modes）完全解説！6つのモードの使い分けを徹底解説",
  publishedAt: "2026-03-12T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=0Jp1O6Se7E8",

  // 冒頭セクション
  opening: {
    lines: [
      "Claude Codeには、ファイル編集やコマンド実行などの操作をどう承認するかを制御する「権限モード（Permission Modes）」という機能があります。",
      "Default・Accept Edits・Plan・Bypass Permissions・Don't Ask・Auto の6つのモードを、実際の操作デモを交えて徹底解説します！",
      "settings.json を使った事前設定や、公式ドキュメント未掲載の新モード「Auto mode」も紹介します。",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ Default modeでの権限確認の仕組みと「次回から許可」の使い方",
      "✅ Accept Editsモードでファイル編集を自動許可し、開発速度を上げる方法",
      "✅ Plan modeで安全に実装計画を立ててから実行するフロー",
      "✅ Bypass Permissionsモードの使い方と isolated環境での活用",
      "✅ Don't Askモードとsettings.jsonによる事前権限ルールの設定方法",
      "✅ AIが安全性を自動判断する新モード「Auto mode」の活用法",
    ],
  },

  // タイムスタンプセクション
  timestamps: {
    title: "⏰ タイムスタンプ",
    items: [
      { time: "00:00", label: "権限モードとは？" },
      { time: "01:00", label: "Default mode の実演" },
      { time: "02:30", label: "Accept Edits モードの実演" },
      { time: "04:00", label: "Shift+Tab でのモード切替" },
      { time: "05:00", label: "Plan モードの実演" },
      {
        time: "07:00",
        label: "Bypass Permissions モード（--dangerously-skip-permissions）",
      },
      { time: "08:30", label: "Don't Ask モード（settings.json 設定）" },
      { time: "10:30", label: "Auto モードの紹介" },
      { time: "11:30", label: "まとめ・使い分けのコツ" },
    ],
  },

  // タグ
  tags: [
    "ClaudeCode",
    "AI駆動開発",
    "権限モード",
    "PermissionMode",
    "AcceptEdits",
    "PlanMode",
    "BypassPermissions",
    "DontAsk",
    "AutoMode",
    "Claude",
    "設定",
    "開発ツール",
    "効率化",
    "バイブコーディング",
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "📚 関連動画",
    videos: [
      {
        title:
          "【コード品質UP】技術的負債を作らないための AI 向け開発ルールを設定しよう（Claude Code/Codex/Cursor 対応）",
        url: "https://www.youtube.com/watch?v=SO5qov2qTUE",
      },
      {
        title:
          "【神アプデ】Claude CodeからCodexをMCPとして利用可能に！両者の良いとこどりで最強の開発環境を構築する方法",
        url: "https://www.youtube.com/watch?v=fTONBWDWke0",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的にClaude Codeを学んで一歩先へ！",
    description:
      "UdemyのClaude Code実践マスター講座では、権限設定を含むさらに高度な内容を体系的に学べます。",
    cta: {
      text: "限定クーポンで最大90%OFF！",
      url: "https://www.vibecodingstudio.dev/coupons?topic=claude-code",
    },
  },

  // 共通データ参照
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
