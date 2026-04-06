import type { CourseInfo, TopicInfo } from "@/types/coupon"

export const COURSE_INFO: Record<string, CourseInfo> = {
  // Codex × React Native講座
  "6851913": {
    originalPrice: 14800,
    description:
      "OpenAI CodexのIDE版とCLI版を完全マスター。React Native/Expoでスマホアプリ開発を実践。プログラミング未経験でも通知機能、データベース、TypeScriptまで学べる実践講座。",
    slug: "codex-react-native",
    title:
      "【Codex × スマホアプリ開発】AI駆動開発で作る！React Native ではじめるモバイルアプリ開発実践",
    topics: ["codex", "expo", "react-native"],
    promotionUrl:
      "https://www.udemy.com/course/codex-react-native/?referralCode=6DB0AFF2545122ECF823",
  },
  // Claude Code × Flask講座
  "6827941": {
    originalPrice: 7600,
    description:
      "Claude CodeとFlaskでPython AIアプリを開発！要件定義から設計・実装まで、プロの開発フローで作る自動レビュー＆バグ診断ツール。初心者も安心のPython Web開発完全ガイド。",
    slug: "claude-code-flask",
    title:
      "【Claude Code】FlaskとGeminiで作る Python AI アプリ！実践レベルのAI駆動開発を学ぼう",
    topics: ["claude-code", "flask", "python", "gemini"],
    promotionUrl:
      "https://www.udemy.com/course/claude-code-flask/?referralCode=558CB5FE26C0945F6FA4",
  },
  // Claude Code × Python講座
  "6823465": {
    originalPrice: 4800,
    description:
      "Claude CodeとPythonでプログラミング未経験でも7つの実践アプリを開発！FizzBuzzから始めてスクレイピング、GUIアプリ、ゲーム開発まで幅広く学べます。",
    slug: "claude-code-python",
    title:
      "【初心者OK】Claude CodeとPythonで学ぶAI駆動開発！アプリ・スクレイピング・ゲーム作成で学ぶ完全ガイド",
    topics: ["claude-code", "python"],
    promotionUrl:
      "https://www.udemy.com/course/claude-code-python/?referralCode=1B7A5F8CD868B6CC9D2D",
  },
  // Claude Code 作業時間管理アプリ講座
  "6739725": {
    originalPrice: 11800,
    description:
      "Claude Codeを使ってNext.jsでサブスク型作業時間管理アプリを開発。Stripe決済・Clerk認証・Supabaseを統合した本格SaaS開発を実践的に学べます。",
    slug: "claude-code-project-tracker",
    title:
      "【Claude Code】Next.js で作るサブスク型・作業時間管理アプリで学ぶ AI 駆動開発【完全版】",
    topics: ["claude-code", "nextjs", "supabase"],
    promotionUrl:
      "https://www.udemy.com/course/claude-code-project-tracker/?referralCode=F89DE6FED7828F23F35C",
  },
  // Claude Code 家計簿アプリ講座
  "6732543": {
    originalPrice: 12800,
    description:
      "Vibe Codingで誰でも作れる！課金機能・Clerk認証・Supabaseを統合した本格SaaSアプリ開発。個人開発でストック収入を目指す完全実践ガイド",
    slug: "claude-code-expenses-app",
    title:
      "【Claude Code】実践！本格的なサブスク型家計簿アプリ開発で学ぶAI駆動開発マスター講座",
    topics: ["claude-code", "typescript"],
    promotionUrl:
      "https://www.udemy.com/course/claude-code-expenses-app/?referralCode=D8072C627C9E0B5828E4",
  },
  // Gemini CLI 講座
  "6694011": {
    originalPrice: 5600,
    description:
      "Gemini CLIとVibe Codingを使って、プログラミング未経験でもマインドマップアプリを開発！無料で始められる実践的な開発講座です。",
    slug: "gemini_cli_vibe_coding_mind_map",
    title:
      "【無料ではじめる】Gemini CLI x Vibe Coding入門 - プログラミング未経験から作れるマインドマップ",
    topics: ["gemini", "nextjs", "react"],
    promotionUrl:
      "https://www.udemy.com/course/gemini_cli_vibe_coding_mind_map/?referralCode=0FBF56A85D2B6FD677EC",
  },
  // Claude Code × Vibe Coding 講座
  "6691241": {
    originalPrice: 8800,
    description:
      "Claude Code×Vibe Codingでプログラミング未経験でもReact・Next.jsで5つのアプリを開発！実践的な開発スキルを身につけることができます。",
    slug: "claude-code-vibe-coding",
    title:
      "【Claude Code×Vibe Coding】プログラミング未経験OK！ゼロから学べる AI 駆動開発実践講座",
    topics: ["claude-code", "react", "nextjs"],
    promotionUrl:
      "https://www.udemy.com/course/claude-code-vibe-coding/?referralCode=D041E6472D189B3BC3C0",
  },
  // Next.js 講座
  "6536597": {
    originalPrice: 8800,
    description:
      "Next.jsとGeminiを使って、AIポモドーロタイマーを開発する講座。モダンなフロントエンド開発を学びながら UI 設計まで、実践的なスキルを身につけることができます。",
    slug: "nextjs-ai-pomodoro-timer",
    title:
      "Next.js（React）で作る AI アプリのポートフォリオ実践！モダンフロントエンド開発を初心者でも学べるコース",
    topics: ["nextjs", "react", "gemini"],
    promotionUrl:
      "https://www.udemy.com/course/nextjs-ai-pomodoro-timer/?referralCode=68F9E4EBA775B8792EC0",
  },
  // Rails 講座
  "6387599": {
    originalPrice: 12800,
    description:
      "RubyとRails、さらにRSpecやDeviseも学びながらSNSアプリ開発とデプロイまでこれ一本！Tailwind CSS でデザインも抜群。初心者からエンジニアとしてのキャリアを目指す第一歩をスタートできる完全ガイド",
    slug: "ruby-on-rails-rspec",
    title:
      "未経験からはじめる Ruby on Rails！Ruby / RSpec も学びながらポートフォリオ公開まで一本で完結",
    topics: ["rails", "ruby", "rspec"],
    promotionUrl:
      "https://www.udemy.com/course/ruby-on-rails-rspec/?referralCode=E67D93CA920B9761199D",
  },
  // RSpec 講座
  "6327241": {
    originalPrice: 7600,
    description:
      "テスト未経験でもOK！Ruby/Railsの基礎を確認しながらRSpecの書き方を徹底解説。シンプルな例から実践的なテストまで、現場で使えるテストコーディングスキルが身につきます。",
    slug: "rspec-ruby-on-rails",
    title:
      "【RSpec 実践入門】Ruby on Rails 開発者のためのテスト自動化 - 完全ガイド",
    topics: ["rspec", "rails", "ruby"],
    promotionUrl:
      "https://www.udemy.com/course/rspec-ruby-on-rails/?referralCode=7E43E652974CF1A7DCDC",
  },
  // AWS Kiro 講座
  "6772961": {
    originalPrice: 9800,
    description:
      "AWSが開発した最新エディタ「Kiro」で仕様駆動開発を学ぶ。要件・設計・タスクの3段階アプローチで、AI開発の品質と効率を劇的に向上させます。",
    slug: "aws-kiro-sd",
    title:
      "【AWS Kiro完全ガイド】仕様駆動開発で学ぶ次世代AI開発 - Next.jsメモアプリ実装からMCP連携まで",
    topics: ["kiro", "nextjs", "mcp", "playwright"],
    promotionUrl:
      "https://www.udemy.com/course/aws-kiro-sd/?referralCode=14D1CD325DA1F5C54C51",
  },
  // Claude Code × MCP 講座
  "6769253": {
    originalPrice: 10000,
    description:
      "Claude CodeとMCPツールを組み合わせて開発効率を劇的に向上。Serena、Context7、Playwright、Sequential Thinking、Supabaseの5つのツールを実践的に学びます。",
    slug: "claude-code-mcp-nextjs",
    title:
      "【Claude Code × MCP完全攻略】Next.jsアプリ開発を劇的に効率化する5つの最新MCPツール実践ガイド",
    topics: ["mcp", "claude-code", "nextjs", "supabase", "playwright"],
    promotionUrl:
      "https://www.udemy.com/course/claude-code-mcp-nextjs/?referralCode=0422EF97A5F3210CCD59",
  },
  // Claude Code × React Native 講座
  "6783611": {
    originalPrice: 10000,
    description:
      "プログラミング未経験でもClaude CodeとReact Nativeでスマホアプリ開発！カウンター、計算機、単位変換、Todo、読書記録の5つのアプリを作りながら、バイブコーディングを実践的に学べます。",
    slug: "claude-code-react-native-5apps",
    title:
      "【未経験OK】Claude CodeとReact Nativeでスマホアプリ開発！5つのアプリでバイブコーディング実践",
    topics: ["claude-code", "react-native", "expo"],
    promotionUrl:
      "https://www.udemy.com/course/draft/6783611/?referralCode=0FA02DD403E254AE48AE",
  },
  // Claude Code × Expoテンプレート講座
  "6782117": {
    originalPrice: 9800,
    description:
      "バイブコーディング専用のReact Native/Expo開発テンプレートを構築。一度作れば使い回せる環境でAIと一緒にスマホアプリを量産。E2E自動テストやMCP連携で開発効率を極限まで高めます。",
    slug: "claude-code-expo-template",
    title:
      "Claude Codeでスマホアプリ開発！React Native（Expo）爆速バイブコーディングテンプレートを作ろう",
    topics: ["claude-code", "expo", "react-native", "mcp"],
    promotionUrl:
      "https://www.udemy.com/course/claude-code-expo-template/?referralCode=220E1F0207A28DE7A14C",
  },
  // Codex CLI 講座
  "6801509": {
    originalPrice: 14800,
    description:
      "OpenAI CodexのIDE版とCLI版を完全マスター。カスタムコマンドとMCP連携（Context7・Playwright・Supabase）で開発効率10倍。React/Next.jsアプリを作りながら次世代のAI開発手法を習得！",
    slug: "codex-nextjs",
    title:
      "【Codex CLI】実践レベルのアプリ開発で学ぶバイブコーディング！カスタムコマンド・MCP連携の完全ガイド",
    topics: ["codex", "nextjs"],
    promotionUrl:
      "https://www.udemy.com/course/codex-nextjs/?referralCode=F5C07ED4A2914F04D6D2",
  },
  // Codex × FastAPI 講座
  "6826831": {
    originalPrice: 9800,
    description:
      "OpenAI CodexのIDE版とCLI版を完全マスター。Python FastAPIで実用的な天気予報APIを開発。プログラミング未経験でもMCPツール連携、カスタムプロンプトで本格的なバックエンド開発を実践。",
    slug: "codex-python-fast-api",
    title:
      "CodexでAI駆動開発！Python FastAPI で作る本格的な天気予報 API | バックエンド開発入門",
    topics: ["codex", "python", "fastapi"],
    promotionUrl:
      "https://www.udemy.com/course/codex-python-fast-api/?referralCode=E159CDE010F734F6760E",
  },
  // Claude Code カスタマイズ完全ガイド講座
  "6981353": {
    originalPrice: 19800,
    description:
      "Claude Codeの6つのカスタマイズ機能（CLAUDE.md、rules、コマンド、サブエージェント、Skills、Hooks）を完全マスター。コンテキスト節約しながら開発効率を最大化する実践講座。",
    slug: "claude-code-perfect-guide",
    title:
      "【Claude Code カスタマイズ完全ガイド】6つの拡張機能を使いこなして開発効率アップ！一歩先のAI駆動開発へ",
    topics: ["claude-code"],
    promotionUrl:
      "https://www.udemy.com/course/claude-code-perfect-guide/?referralCode=7062AD44CE74010889E4",
  },
}

export const TOPIC_INFO: Record<string, TopicInfo> = {
  "claude-code": {
    slug: "claude-code",
    name: "Claude Code",
    icon: "/images/topics/claude.svg",
    isLocal: true,
  },
  stripe: {
    slug: "stripe",
    name: "Stripe",
    icon: "/images/topics/stripe.png",
    isLocal: true,
  },
  gemini: {
    slug: "gemini",
    name: "Gemini",
    icon: "/images/topics/gemini.svg",
    isLocal: true,
  },
  react: {
    slug: "react",
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg",
  },
  nextjs: {
    slug: "nextjs",
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg",
  },
  typescript: {
    slug: "typescript",
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  rails: {
    slug: "rails",
    name: "Rails",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rails/rails-plain-wordmark.svg",
  },
  ruby: {
    slug: "ruby",
    name: "Ruby",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original-wordmark.svg",
  },
  rspec: {
    slug: "rspec",
    name: "RSpec",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rspec/rspec-original-wordmark.svg",
  },
  supabase: {
    slug: "supabase",
    name: "Supabase",
    icon: "/images/topics/supabase.svg",
    isLocal: true,
  },
  kiro: {
    slug: "kiro",
    name: "AWS Kiro",
    icon: "/images/topics/kiro.svg",
    isLocal: true,
  },
  mcp: {
    slug: "mcp",
    name: "MCP",
    icon: "/images/topics/mcp.svg",
    isLocal: true,
  },
  playwright: {
    slug: "playwright",
    name: "Playwright",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
  },
  "react-native": {
    slug: "react-native",
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactnative/reactnative-original.svg",
  },
  expo: {
    slug: "expo",
    name: "Expo",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg",
  },
  tamagui: {
    slug: "tamagui",
    name: "Tamagui",
    icon: "https://tamagui.dev/img/tamagui.svg",
  },
  maestro: {
    slug: "maestro",
    name: "Maestro",
    icon: "https://maestro.mobile.dev/logo.svg",
  },
  codex: {
    slug: "codex",
    name: "Codex",
    icon: "/images/topics/codex.svg",
    isLocal: true,
  },
  python: {
    slug: "python",
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  flask: {
    slug: "flask",
    name: "Flask",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
  },
  fastapi: {
    slug: "fastapi",
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  },
}

export const POPULAR_COURSE_IDS = [
  "6851913", // 新講座：Codex × React Native
  "6827941",
  "6823465",
  "6801509",
  "6782117",
  "6783611",
  "6772961",
  "6769253",
  "6739725",
  "6691241",
]

/**
 * クーポン一覧ページでの完全な表示順序
 * この配列の順序で表示されます（先頭が最初に表示される）
 *
 * 優先順位:
 * 1. Claude Codeシリーズ（基礎 → 応用 → スマホアプリ → Python）
 * 2. Codexシリーズ（基礎 → 応用・スマホアプリ → バックエンド）
 * 3. Gemini CLIシリーズ
 * 4. Kiroシリーズ
 * 5. その他（Next.js、Rails、RSpec）
 */
export const COURSE_DISPLAY_ORDER = [
  // === Claude Codeシリーズ ===
  // 基礎 → 応用
  "6981353", // Claude Code カスタマイズ完全ガイド - 6つの拡張機能を使いこなす
  "6691241", // Claude Code × Vibe Coding - 未経験OK、ゼロから学べる基礎
  "6769253", // Claude Code × MCP - Next.jsアプリ開発効率化（5つのMCPツール）
  "6732543", // Claude Code × 家計簿 - Stripeサブスク型アプリ
  "6739725", // Claude Code × 作業時間管理 - サブスク型・作業時間管理アプリ

  // スマホアプリ系
  "6782117", // Claude Code × Expoテンプレート - React Native爆速テンプレート
  "6783611", // Claude Code × React Native 5apps - 5つのアプリで実践

  // Python系
  "6823465", // Claude Code × Python - 基礎・スクレイピング・ゲーム
  "6827941", // Claude Code × Flask - Flask実践レベルのAIアプリ

  // === Codexシリーズ ===
  "6801509", // Codex CLI - Next.jsアプリ開発でカスタムコマンド・MCP連携（基礎）
  "6851913", // Codex × React Native - スマホアプリ開発実践（応用）
  "6826831", // Codex × FastAPI - Python FastAPI天気予報API開発（バックエンド）

  // === Gemini CLIシリーズ ===
  "6694011", // Gemini CLI - マインドマップアプリ

  // === Kiroシリーズ ===
  "6772961", // AWS Kiro - 仕様駆動開発でNext.jsメモアプリ

  // === その他 ===
  "6536597", // Next.js × AIポモドーロ - Next.js × Gemini
  "6387599", // Rails - Ruby on Rails完全ガイド
  "6327241", // RSpec - Rails開発者向けテスト自動化
] as const
