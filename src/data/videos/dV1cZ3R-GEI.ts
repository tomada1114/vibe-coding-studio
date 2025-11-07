import { commonSections } from "@/data/shared/common-sections"
import type { VideoMetadata } from "@/types/video"

/**
 * CLI（コマンドライン）実践練習動画
 * ターミナルの基本的なコマンド操作を実際に手を動かして学ぶ実践編
 */
export const video_dV1cZ3R_GEI: VideoMetadata = {
  // 基本情報
  id: "dV1cZ3R-GEI",
  title: "CLI(コマンドラインインターフェース)を練習してみよう",
  publishedAt: "2025-11-06T00:00:00+09:00",
  videoUrl: "https://www.youtube.com/watch?v=dV1cZ3R-GEI",

  // 冒頭セクション
  opening: {
    lines: [
      "この動画では、ターミナルを使って一通りの基本的な操作を学んでいきます。",
      "Macのターミナルを使用していきますが、Windowsの方はgitbashをお勧めします。",
      "実際に手を動かしながら、フォルダーやファイルの操作、各種コマンドの使い方を実践的にマスターしていきましょう！",
    ],
  },

  // 学べる内容セクション
  learningPoints: {
    title: "💡 この動画で学べること",
    items: [
      "✅ ターミナルの起動方法とホームディレクトリの概念",
      "✅ pwd（現在位置確認）、cd（ディレクトリ移動）、ls（ファイル一覧表示）の実践",
      "✅ mkdir（フォルダー作成）、touch（ファイル作成）の使い方",
      "✅ mv（移動・リネーム）、cp（コピー）コマンドの活用法",
      "✅ rm、rmdir、rm -rf（削除系コマンド）の違いと注意点",
      "✅ cat（ファイル内容表示）、grep（文字列検索）の基本操作",
    ],
  },

  // タグ
  tags: [
    "CLI",
    "コマンドライン",
    "ターミナル",
    "Mac",
    "gitbash",
    "ファイル操作",
    "ディレクトリ操作",
    "初心者向け",
    "pwd",
    "cd",
    "ls",
    "mkdir",
    "touch",
    "mv",
    "cp",
    "rm",
    "grep",
    "cat",
  ],

  // 関連動画セクション
  relatedVideos: {
    title: "🎬 関連動画",
    videos: [
      {
        title: "ターミナル（コマンドライン）とは？初心者向け基本操作ガイド",
        url: "https://www.youtube.com/watch?v=OfXZCu6xJJg",
      },
      {
        title: "VSCode（Visual Studio Code）のインストールと使い方",
        url: "https://www.youtube.com/watch?v=Mwp4_DYGzTI",
      },
      {
        title: "AIが書いたコード、いつコミットする？失敗しないGit運用術",
        url: "https://www.youtube.com/watch?v=1LP4ZAsU_UI",
      },
    ],
  },

  // Udemy講座誘導セクション
  udemyCourses: {
    title: "🚀 体系的に学びたい方へ",
    description:
      "プログラミング初心者からベテランまで、あなたのレベルに合わせたUdemy講座を多数ご用意しています。",
    cta: {
      text: "Udemy講座を見る",
      url: "https://www.vibecodingstudio.dev/coupons",
    },
  },

  // 共通セクション
  social: commonSections.social,
  discordCommunity: commonSections.discordCommunity,
  engagement: commonSections.engagement,
}
