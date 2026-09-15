import type { UdemyCourse } from "@/types/udemy-course"

export const COURSE_DISPLAY_ORDER = [
  "6981353",
  "6691241",
  "6769253",
  "6732543",
  "6739725",
  "6782117",
  "6783611",
  "6823465",
  "6827941",
  "6801509",
  "6851913",
  "6826831",
  "6772961",
  "6536597",
  "6387599",
  "6327241",
] as const

const UDEMY_COURSES: UdemyCourse[] = [
  {
    id: "6981353",
    slug: "claude-code-perfect-guide",
    title:
      "【Claude Code カスタマイズ完全ガイド】6つの拡張機能を使いこなして開発効率アップ！一歩先のAI駆動開発へ",
    description:
      "Claude Codeの6つのカスタマイズ機能（CLAUDE.md、rules、コマンド、サブエージェント、Skills、Hooks）を完全マスター。コンテキスト節約しながら開発効率を最大化する実践講座。",
    topics: ["claude-code"],
    thumbnail: "/images/udemy/claude-code-perfect-guide.png",
    url: "https://www.udemy.com/course/claude-code-perfect-guide/?referralCode=7062AD44CE74010889E4",
  },
  {
    id: "6691241",
    slug: "claude-code-vibe-coding",
    title:
      "【Claude Code×Vibe Coding】プログラミング未経験OK！ゼロから学べる AI 駆動開発実践講座",
    description:
      "Claude Code×Vibe Codingでプログラミング未経験でもReact・Next.jsで5つのアプリを開発！実践的な開発スキルを身につけることができます。",
    topics: ["claude-code", "react", "nextjs"],
    thumbnail: "/images/udemy/claude-code-vibe-coding.png",
    url: "https://www.udemy.com/course/claude-code-vibe-coding/?referralCode=D041E6472D189B3BC3C0",
  },
  {
    id: "6769253",
    slug: "claude-code-mcp-nextjs",
    title:
      "【Claude Code × MCP完全攻略】Next.jsアプリ開発を劇的に効率化する5つの最新MCPツール実践ガイド",
    description:
      "Claude CodeとMCPツールを組み合わせて開発効率を劇的に向上。Serena、Context7、Playwright、Sequential Thinking、Supabaseの5つのツールを実践的に学びます。",
    topics: ["mcp", "claude-code", "nextjs", "supabase", "playwright"],
    thumbnail: "/images/udemy/claude-code-mcp-nextjs.png",
    url: "https://www.udemy.com/course/claude-code-mcp-nextjs/?referralCode=0422EF97A5F3210CCD59",
  },
  {
    id: "6732543",
    slug: "claude-code-expenses-app",
    title:
      "【Claude Code】実践！本格的なサブスク型家計簿アプリ開発で学ぶAI駆動開発マスター講座",
    description:
      "Vibe Codingで誰でも作れる！課金機能・Clerk認証・Supabaseを統合した本格SaaSアプリ開発。個人開発でストック収入を目指す完全実践ガイド",
    topics: ["claude-code", "typescript"],
    thumbnail: "/images/udemy/claude-code-expenses-app.png",
    url: "https://www.udemy.com/course/claude-code-expenses-app/?referralCode=D8072C627C9E0B5828E4",
  },
  {
    id: "6739725",
    slug: "claude-code-project-tracker",
    title:
      "【Claude Code】Next.js で作るサブスク型・作業時間管理アプリで学ぶ AI 駆動開発【完全版】",
    description:
      "Claude Codeを使ってNext.jsでサブスク型作業時間管理アプリを開発。Stripe決済・Clerk認証・Supabaseを統合した本格SaaS開発を実践的に学べます。",
    topics: ["claude-code", "nextjs", "supabase"],
    thumbnail: "/images/udemy/claude-code-project-tracker.png",
    url: "https://www.udemy.com/course/claude-code-project-tracker/?referralCode=F89DE6FED7828F23F35C",
  },
  {
    id: "6782117",
    slug: "claude-code-expo-template",
    title:
      "Claude Codeでスマホアプリ開発！React Native（Expo）爆速バイブコーディングテンプレートを作ろう",
    description:
      "バイブコーディング専用のReact Native/Expo開発テンプレートを構築。一度作れば使い回せる環境でAIと一緒にスマホアプリを量産。E2E自動テストやMCP連携で開発効率を極限まで高めます。",
    topics: ["claude-code", "expo", "react-native", "mcp"],
    thumbnail: "/images/udemy/claude-code-expo-template.png",
    url: "https://www.udemy.com/course/claude-code-expo-template/?referralCode=220E1F0207A28DE7A14C",
  },
  {
    id: "6783611",
    slug: "claude-code-react-native-5apps",
    title:
      "【未経験OK】Claude CodeとReact Nativeでスマホアプリ開発！5つのアプリでバイブコーディング実践",
    description:
      "プログラミング未経験でもClaude CodeとReact Nativeでスマホアプリ開発！カウンター、計算機、単位変換、Todo、読書記録の5つのアプリを作りながら、バイブコーディングを実践的に学べます。",
    topics: ["claude-code", "react-native", "expo"],
    thumbnail: "/images/udemy/claude-code-react-native-5apps.png",
    url: "https://www.udemy.com/course/claude-code-react-native-5apps/?referralCode=0FA02DD403E254AE48AE",
  },
  {
    id: "6823465",
    slug: "claude-code-python",
    title:
      "【初心者OK】Claude CodeとPythonで学ぶAI駆動開発！アプリ・スクレイピング・ゲーム作成で学ぶ完全ガイド",
    description:
      "Claude CodeとPythonでプログラミング未経験でも7つの実践アプリを開発！FizzBuzzから始めてスクレイピング、GUIアプリ、ゲーム開発まで幅広く学べます。",
    topics: ["claude-code", "python"],
    thumbnail: "/images/udemy/claude-code-python.png",
    url: "https://www.udemy.com/course/claude-code-python/?referralCode=1B7A5F8CD868B6CC9D2D",
  },
  {
    id: "6827941",
    slug: "claude-code-flask",
    title:
      "【Claude Code】FlaskとGeminiで作る Python AI アプリ！実践レベルのAI駆動開発を学ぼう",
    description:
      "Claude CodeとFlaskでPython AIアプリを開発！要件定義から設計・実装まで、プロの開発フローで作る自動レビュー＆バグ診断ツール。初心者も安心のPython Web開発完全ガイド。",
    topics: ["claude-code", "flask", "python", "gemini"],
    thumbnail: "/images/udemy/claude-code-flask.png",
    url: "https://www.udemy.com/course/claude-code-flask/?referralCode=558CB5FE26C0945F6FA4",
  },
  {
    id: "6801509",
    slug: "codex-nextjs",
    title:
      "【Codex CLI】実践レベルのアプリ開発で学ぶバイブコーディング！カスタムコマンド・MCP連携の完全ガイド",
    description:
      "OpenAI CodexのIDE版とCLI版を完全マスター。カスタムコマンドとMCP連携（Context7・Playwright・Supabase）で開発効率10倍。React/Next.jsアプリを作りながら次世代のAI開発手法を習得！",
    topics: ["codex", "nextjs"],
    thumbnail: "/images/udemy/codex-nextjs.png",
    url: "https://www.udemy.com/course/codex-nextjs/?referralCode=F5C07ED4A2914F04D6D2",
  },
  {
    id: "6851913",
    slug: "codex-react-native",
    title:
      "【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践",
    description:
      "OpenAI CodexのIDE版とCLI版を完全マスター。React Native/Expoでスマホアプリ開発を実践。プログラミング未経験でも通知機能、データベース、TypeScriptまで学べる実践講座。",
    topics: ["codex", "expo", "react-native"],
    thumbnail: "/images/udemy/codex-react-native.png",
    url: "https://www.udemy.com/course/codex-react-native/?referralCode=6DB0AFF2545122ECF823",
  },
  {
    id: "6826831",
    slug: "codex-python-fast-api",
    title:
      "CodexでAI駆動開発！Python FastAPI で作る本格的な天気予報 API | バックエンド開発入門",
    description:
      "OpenAI CodexのIDE版とCLI版を完全マスター。Python FastAPIで実用的な天気予報APIを開発。プログラミング未経験でもMCPツール連携、カスタムプロンプトで本格的なバックエンド開発を実践。",
    topics: ["codex", "python", "fastapi"],
    thumbnail: "/images/udemy/codex-python-fast-api.png",
    url: "https://www.udemy.com/course/codex-python-fast-api/?referralCode=E159CDE010F734F6760E",
  },
  {
    id: "6772961",
    slug: "aws-kiro-sd",
    title:
      "【AWS Kiro完全ガイド】仕様駆動開発で学ぶ次世代AI開発 - Next.jsメモアプリ実装からMCP連携まで",
    description:
      "AWSが開発した最新エディタ「Kiro」で仕様駆動開発を学ぶ。要件・設計・タスクの3段階アプローチで、AI開発の品質と効率を劇的に向上させます。",
    topics: ["kiro", "nextjs", "mcp", "playwright"],
    thumbnail: "/images/udemy/aws-kiro-sd.png",
    url: "https://www.udemy.com/course/aws-kiro-sd/?referralCode=14D1CD325DA1F5C54C51",
  },
  {
    id: "6536597",
    slug: "nextjs-ai-pomodoro-timer",
    title:
      "Next.js（React）で作る AI アプリのポートフォリオ実践！モダンフロントエンド開発を初心者でも学べるコース",
    description:
      "Next.jsとGeminiを使って、AIポモドーロタイマーを開発する講座。モダンなフロントエンド開発を学びながら UI 設計まで、実践的なスキルを身につけることができます。",
    topics: ["nextjs", "react", "gemini"],
    thumbnail: "/images/udemy/nextjs-ai-pomodoro-timer.png",
    url: "https://www.udemy.com/course/nextjs-ai-pomodoro-timer/?referralCode=68F9E4EBA775B8792EC0",
  },
  {
    id: "6387599",
    slug: "ruby-on-rails-rspec",
    title:
      "未経験からはじめる Ruby on Rails！Ruby / RSpec も学びながらポートフォリオ公開まで一本で完結",
    description:
      "RubyとRails、さらにRSpecやDeviseも学びながらSNSアプリ開発とデプロイまでこれ一本！Tailwind CSS でデザインも抜群。初心者からエンジニアとしてのキャリアを目指す第一歩をスタートできる完全ガイド",
    topics: ["rails", "ruby", "rspec"],
    thumbnail: "/images/udemy/ruby-on-rails-rspec.png",
    url: "https://www.udemy.com/course/ruby-on-rails-rspec/?referralCode=E67D93CA920B9761199D",
  },
  {
    id: "6327241",
    slug: "rspec-ruby-on-rails",
    title:
      "【RSpec 実践入門】Ruby on Rails 開発者のためのテスト自動化 - 完全ガイド",
    description:
      "テスト未経験でもOK！Ruby/Railsの基礎を確認しながらRSpecの書き方を徹底解説。シンプルな例から実践的なテストまで、現場で使えるテストコーディングスキルが身につきます。",
    topics: ["rspec", "rails", "ruby"],
    thumbnail: "/images/udemy/rspec-ruby-on-rails.png",
    url: "https://www.udemy.com/course/rspec-ruby-on-rails/?referralCode=7E43E652974CF1A7DCDC",
  },
]

export function getAllUdemyCourses(): UdemyCourse[] {
  return UDEMY_COURSES.map(course => ({
    ...course,
    topics: [...course.topics],
  }))
}
