import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

export const video_fTONBWDWke0: VideoMetadata = {
  id: "fTONBWDWke0",
  title:
    "【神アプデ】Claude CodeからCodexをMCPとして利用可能に！両者の良いとこどりで最強の開発環境を構築する方法",
  publishedAt: "2025-09-17T12:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=fTONBWDWke0",

  opening: {
    lines: [
      "今回は、Codex CLIの最新アップデートで可能になった「MCP連携」を実際に設定して使ってみました！",
      "Claude Codeの使いやすさを維持しながら、必要な時だけGPT-5（Codex）の推論力を借りることができる神機能です。",
      "設定はコマンド1つで完了。これで開発効率が劇的に向上します！",
      "（9/19追記：ChatGPT もサブスク契約が必要）",
    ],
  },

  learningPoints: {
    title: "💡 動画のポイント",
    items: [
      "✅ Codex CLIがMCP対応になり、Claude Codeから直接呼び出し可能に",
      "✅ 設定はコマンド1つ「claude mcp add codex codex mcp」で完了",
      "✅ Claude Codeが質問を整理してCodexに投げる二段構えの仕組み",
      "✅ 深い分析はCodex、実装はClaude Codeという最適な使い分けが可能",
      "✅ ChatGPT Plus（月20ドル）でCodexの推論力を活用できてコスパ最高",
    ],
  },

  timestamps: {
    title: "📚 タイムスタンプ",
    items: [
      { time: "00:00", label: "Codexアプデ内容" },
      { time: "00:50", label: "CodexをMCPサーバとして利用可能に！" },
      { time: "01:49", label: "Codexをアップデート" },
      { time: "02:50", label: "ClaudeCodeのMCP設定" },
      { time: "04:53", label: "Codex MCPを使ってみる" },
      { time: "06:34", label: "CodexのWeb検索を有効化" },
      { time: "08:16", label: "Web検索有効化後のCodex MCP" },
      { time: "09:49", label: "CLAUDE.mdに追記するアイデア" },
    ],
  },

  tags: [
    "ClaudeCode",
    "CodexCLI",
    "MCP",
    "AI駆動開発",
    "バイブコーディング",
    "プログラミング",
    "エンジニア",
    "ChatGPT",
    "GPT5",
    "開発効率化",
    "gpt5",
  ],

  customSections: [
    {
      title: "🎯 こんな方におすすめ",
      type: "list",
      items: [
        "Claude Codeの最近の性能低下に悩んでいる方",
        "Codex CLIへの移行を検討している方",
        "AI駆動開発の効率をさらに上げたい方",
        "複雑な分析や推論が必要な開発をしている方",
        "最新のAI開発ツールの使い方を知りたい方",
      ],
    },
    {
      title: "🔗 関連リンク",
      type: "links",
      links: [
        {
          label: "今回の内容を詳しく解説した記事（Qiita）",
          url: "https://qiita.com/tomada/items/6ed639",
        },
        {
          label: "Codex CLI 公式リポジトリ",
          url: "https://github.com/openai/codex",
        },
        {
          label: "Codex MCP設定の公式ドキュメント",
          url: "https://github.com/openai/codex/blob/",
        },
        {
          label: "Model Context Protocol (MCP) 公式サイト",
          url: "https://modelcontextprotocol.io/",
        },
      ],
    },
  ],

  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
