import type { CommonSections } from "@/types/video"

/**
 * 全動画共通のセクション定義
 *
 * SNS、Discord、エンゲージメントなどの共通情報を管理します。
 * これらの情報は、すべての動画データから参照されます。
 *
 * このファイルを更新すると、すべての動画に変更が反映されます。
 */
export const commonSections: CommonSections = {
  /**
   * SNS・コミュニティセクション
   * 各種SNSアカウントへのリンクを提供
   */
  social: {
    title: "🔗 SNS・コミュニティ",
    accounts: [
      {
        platform: "X",
        emoji: "🐦",
        label: "X(Twitter)",
        url: "https://x.com/muscle_coding",
      },
      {
        platform: "note",
        emoji: "📝",
        url: "https://note.com/tomada",
      },
      {
        platform: "Qiita",
        emoji: "💻",
        url: "https://qiita.com/tomada",
      },
      {
        platform: "Zenn",
        emoji: "📘",
        url: "https://zenn.dev/tmasuyama1114",
      },
    ],
  },

  /**
   * Discordコミュニティセクション
   * Discordコミュニティへの誘導情報
   */
  discordCommunity: {
    title: "💬 Discordコミュニティ(無料)",
    description:
      "最新情報をキャッチアップしつつ、AI駆動開発を学ぶ仲間と繋がれるDiscordコミュニティも運営してます!気軽に参加してみてください。",
    url: "https://discord.gg/qZDRagzbVD",
    isFree: true,
  },

  /**
   * エンゲージメント促進セクション
   * コメント・質問を促す文言
   */
  engagement: {
    title: "💬 コメント・質問お待ちしています!",
    message:
      "実際に試してみた感想や、つまずいた点があればコメント欄で教えてください。\n可能な限りお答えします!",
    callToAction:
      "チャンネル登録・高評価いただけると今後の動画作成の励みになります🙏",
  },
}
