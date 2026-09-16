/**
 * i18n — メッセージ辞書
 *
 * 翻訳対象はヘッダー・フッター・トップページ（個人プロフィール）の 3 面のみ。
 * `ja` を基準とし、`en` は同じ構造を持つ（型で強制する）。
 *
 * 英訳はオーナーによる校正を前提とした下書き。
 *
 * ここに書くのは「表示される文字列」だけ。URL・数値・書誌情報などの事実は
 * `src/lib/constants.ts` や `src/data/book.ts` を単一の情報源とし、
 * 辞書には複製しない。
 */

import type { Locale } from "./locale"

export type NavKey = "home" | "docs" | "community" | "coupons"

type CareerEntry = {
  /** Mono ラベルに出す年。"NOW" は現在進行中を示す */
  year: string
  title: string
  body: string
}

export type Dictionary = {
  meta: {
    title: string
    description: string
  }
  nav: {
    label: string
    items: Record<NavKey, string>
  }
  header: {
    skipToContent: string
    languageGroupLabel: string
    themeToggleLabel: string
    themeToggleToLight: string
    themeToggleToDark: string
    menuOpen: string
    menuClose: string
  }
  footer: {
    siteHeading: string
    communityHeading: string
    socialHeading: string
    discord: string
    copyright: string
  }
  hero: {
    label: string
    name: string
    nameRomaji: string
    legalName: string
    role: string
    lead: string
    photoAlt: string
    primaryCta: string
    secondaryCta: string
    tertiaryCta: string
  }
  stats: {
    since: string
    sinceValue: string
    courses: string
    students: string
    studentsValue: string
  }
  book: {
    label: string
    heading: string
    lead: string
    body: string[]
    releaseLabel: string
    publisherLabel: string
    priceLabel: string
    formatLabel: string
    isbnLabel: string
    tocCta: string
  }
  teaching: {
    label: string
    heading: string
    items: {
      label: string
      title: string
      body: string
      cta: string
    }[]
  }
  career: {
    label: string
    heading: string
    entries: CareerEntry[]
  }
  credentials: {
    certificationsLabel: string
    certificationsHeading: string
    certifications: string[]
    speakingLabel: string
    speakingHeading: string
    speakingDate: string
    speakingTitle: string
    speakingSubtitle: string
    speakingBody: string
    speakingCta: string
  }
  links: {
    label: string
    heading: string
    lead: string
  }
}

const ja: Dictionary = {
  meta: {
    title: "とまだ（増山友司） - AI駆動開発の実践者・教育者",
    description:
      "アメリカ在住のソフトウェアエンジニア。技術評論社から『Claude Codeで作って学ぶ AI駆動アプリ開発入門』を刊行。Udemy・YouTube でAI駆動開発を教えています。",
  },
  nav: {
    label: "メインナビゲーション",
    items: {
      home: "ホーム",
      docs: "学習",
      community: "コミュニティ",
      coupons: "クーポン",
    },
  },
  header: {
    skipToContent: "メインコンテンツへスキップ",
    languageGroupLabel: "言語切り替え",
    themeToggleLabel: "テーマを切り替え",
    themeToggleToLight: "ライトテーマに切り替え",
    themeToggleToDark: "ダークテーマに切り替え",
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
  },
  footer: {
    siteHeading: "サイト",
    communityHeading: "コミュニティ",
    socialHeading: "ソーシャル",
    discord: "Discord",
    copyright: "Vibe Coding Studio.",
  },
  hero: {
    label: "Profile",
    name: "とまだ",
    nameRomaji: "Tomada",
    legalName: "増山友司 / Tomoshi Masuyama",
    role: "ソフトウェアエンジニア／AI駆動開発の実践者・教育者",
    lead: "アメリカ在住。2016年にSIerでキャリアを始め、2021年にWebアプリケーションエンジニアへ転身、2024年に独立しました。現在はアメリカ企業の開発プロジェクトに参画しながら、書籍・Udemy・YouTube を通じてAI駆動開発を教えています。",
    photoAlt: "とまだ（Tomada）のプロフィール画像",
    primaryCta: "著書を見る",
    secondaryCta: "Udemy講座",
    tertiaryCta: "YouTube",
  },
  stats: {
    since: "Since",
    sinceValue: "2016",
    courses: "Courses",
    students: "Udemy students",
    studentsValue: "10,000+",
  },
  book: {
    label: "Book",
    heading: "著書",
    lead: "Claude Codeでの開発を、実際にアプリを作りながら追える入門書を書きました。",
    body: [
      "Claude Codeのインストールと最初の対話から始めて、@記法やスラッシュコマンドといった対話の基本、CLAUDE.mdでプロジェクトのルールを渡す方法、MCPでPlaywrightやSupabaseとつなぐ手順までを、手を動かしながら追える構成にしました。",
      "終盤では学んだことを総動員して、Next.jsとSupabaseでタスク管理アプリを作り、Vercelにデプロイして公開するところまで進みます。既存コードの読み解きとリファクタリング、GitHub上でのレビュー依頼やチーム開発での運用も扱っています。",
      "これからClaude Codeを使う方に向けた入門書ですが、すでに使っている方にも、CLAUDE.mdの階層的な管理やMCPの実運用、チームへの展開といった形で読んでいただける内容です。",
    ],
    releaseLabel: "発売日",
    publisherLabel: "出版社",
    priceLabel: "価格",
    formatLabel: "判型",
    isbnLabel: "ISBN",
    tocCta: "目次を見る（技術評論社）",
  },
  teaching: {
    label: "Teaching",
    heading: "教育活動",
    items: [
      {
        label: "Udemy",
        title: "Udemy講師",
        body: "AI駆動開発を中心に講座を公開しています。受講者は累計1万人を超えました。",
        cta: "コース一覧を見る（クーポン付き）",
      },
      {
        label: "YouTube",
        title: "YouTube運営",
        body: "Claude Code や Codex CLI の検証結果を、実際に動かしながら公開しています。",
        cta: "チャンネルを見る",
      },
      {
        label: "Discord",
        title: "コミュニティ運営",
        body: "AI駆動開発を学ぶ人が集まり、検証結果や詰まったところを共有するDiscordを運営しています。",
        cta: "コミュニティを見る",
      },
    ],
  },
  career: {
    label: "Career",
    heading: "経歴",
    entries: [
      {
        year: "2016",
        title: "北海道大学大学院を修了、SIerでキャリアをスタート",
        body: "理学院 物性物理学専攻を修了後、SIerでネットワーク・サーバ基盤構築のシステムエンジニアに。提案から要件定義・設計・構築・保守運用までを一貫して担当し、チームを率いるプロジェクトマネジメントも経験。",
      },
      {
        year: "2019",
        title: "セキュリティベンダーへ転職",
        body: "法人向けセキュリティ製品のテクニカルサポートエンジニアとして、ログ解析や高度なトラブルシューティングに従事。Pythonによる業務自動化をきっかけに、プログラミングの面白さに目覚める。",
      },
      {
        year: "2021",
        title: "Webアプリケーションエンジニアに転身",
        body: "独学とスクールでの学習を経て、大規模な金融系メディアの開発へ。開発チームリーダー・スクラムマスターとして、新規機能開発とチーム運営をリード。",
      },
      {
        year: "2024",
        title: "フリーランスとして独立",
        body: "金融系メディアや運輸系システムの開発、大規模システムのリプレイスなど、多様な開発を経験。法人向けのAI駆動開発導入支援・コンサルティングも手がけた。",
      },
      {
        year: "2025",
        title: "アメリカ企業の開発プロジェクトに参画",
        body: "カナダからの応募をきっかけに、アメリカに本社を置く企業と業務委託契約を締結。英語でのコミュニケーションのもと、未経験の技術スタックにもAI駆動開発で対応し、半年間のプロジェクトを完遂した。",
      },
      {
        year: "NOW",
        title: "カナダを経てアメリカへ拠点を移す",
        body: "カナダ在住時は日本・北米の開発プロジェクトにフルリモートで参画。現在はアメリカを拠点に、OSS・個人開発での実践と、Udemy・YouTube・コミュニティを通じたAI駆動開発の教育・発信に注力している。",
      },
    ],
  },
  credentials: {
    certificationsLabel: "Certifications",
    certificationsHeading: "取得資格",
    certifications: [
      "AWS認定ソリューションアーキテクト - プロフェッショナル",
      "AWS認定DevOpsエンジニア - プロフェッショナル",
      "AWS認定セキュリティ - 専門知識",
      "CCNP Routing and Switching",
      "情報処理安全確保支援士試験 合格",
      "応用情報技術者",
      "TOEIC 910点",
    ],
    speakingLabel: "Speaking",
    speakingHeading: "登壇実績",
    speakingDate: "2025 · Online",
    speakingTitle: "東京AI祭 プレイベント（2025年）",
    speakingSubtitle: "Claude Code vs Codex CLI 徹底比較（オンライン）",
    speakingBody:
      "両ツールを日常的に併用している経験から、カスタムコマンドの柔軟性、サブエージェント機能、IDE拡張対応、コミュニティの充実度を比較しました。",
    speakingCta: "イベント詳細を見る",
  },
  links: {
    label: "Links",
    heading: "リンク",
    lead: "発信しているアカウントの一覧です。",
  },
}

const en: Dictionary = {
  meta: {
    title: "Tomada (Tomoshi Masuyama) - AI-driven development, in practice",
    description:
      "Software engineer based in the U.S. Author of “Building AI-Driven Apps with Claude Code” (Gijutsu-Hyohron). Teaching AI-driven development on Udemy and YouTube.",
  },
  nav: {
    label: "Main navigation",
    items: {
      home: "Home",
      docs: "Learn",
      community: "Community",
      coupons: "Coupons",
    },
  },
  header: {
    skipToContent: "Skip to main content",
    languageGroupLabel: "Language",
    themeToggleLabel: "Toggle theme",
    themeToggleToLight: "Switch to light theme",
    themeToggleToDark: "Switch to dark theme",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  footer: {
    siteHeading: "Site",
    communityHeading: "Community",
    socialHeading: "Social",
    discord: "Discord",
    copyright: "Vibe Coding Studio.",
  },
  hero: {
    label: "Profile",
    name: "Tomada",
    nameRomaji: "とまだ",
    legalName: "Tomoshi Masuyama",
    role: "Software engineer · practitioner and teacher of AI-driven development",
    lead: "Based in the U.S. I started out at a systems integrator in 2016, moved into web application development in 2021, and went independent in 2024. I now work on a U.S. company's product while teaching AI-driven development through a book, Udemy courses, and YouTube.",
    photoAlt: "Portrait of Tomada (Tomoshi Masuyama)",
    primaryCta: "See the book",
    secondaryCta: "Udemy courses",
    tertiaryCta: "YouTube",
  },
  stats: {
    since: "Since",
    sinceValue: "2016",
    courses: "Courses",
    students: "Udemy students",
    studentsValue: "10,000+",
  },
  book: {
    label: "Book",
    heading: "Book",
    lead: "An introduction to Claude Code that you follow by building a real app.",
    body: [
      "The book starts with installing Claude Code and holding your first conversation with it, then covers the basics of that conversation — @ references and slash commands — how to hand a project its rules through CLAUDE.md, and how to connect Playwright and Supabase over MCP. Every step is something you can follow along with at the keyboard.",
      "In the later chapters you put all of it together: you build a task management app with Next.js and Supabase, then deploy and publish it on Vercel. Reading and refactoring existing code, requesting reviews on GitHub, and working this way as a team are covered too.",
      "It is written for people about to pick up Claude Code, but there is material here for current users as well — layered CLAUDE.md management, running MCP in earnest, and rolling the practice out to a team.",
    ],
    releaseLabel: "Released",
    publisherLabel: "Publisher",
    priceLabel: "Price",
    formatLabel: "Format",
    isbnLabel: "ISBN",
    tocCta: "Table of contents (Gijutsu-Hyohron)",
  },
  teaching: {
    label: "Teaching",
    heading: "Teaching",
    items: [
      {
        label: "Udemy",
        title: "Udemy instructor",
        body: "Courses centred on AI-driven development. More than 10,000 students to date.",
        cta: "Browse the courses (with coupons)",
      },
      {
        label: "YouTube",
        title: "YouTube channel",
        body: "I publish what I find when I put Claude Code and Codex CLI to work, running the tools on camera.",
        cta: "Visit the channel",
      },
      {
        label: "Discord",
        title: "Community",
        body: "A Discord where people learning AI-driven development share what they have tried and where they got stuck.",
        cta: "See the community",
      },
    ],
  },
  career: {
    label: "Career",
    heading: "Career",
    entries: [
      {
        year: "2016",
        title:
          "Graduated from Hokkaido University, started out at a systems integrator",
        body: "After a master's in condensed matter physics, I joined a systems integrator as a systems engineer building network and server infrastructure. I covered the whole span from proposal through requirements, design, build and operations, and led projects as a manager.",
      },
      {
        year: "2019",
        title: "Moved to a security vendor",
        body: "Technical support engineer for enterprise security products, working on log analysis and deep troubleshooting. Automating my own work in Python is what got me interested in programming.",
      },
      {
        year: "2021",
        title: "Became a web application engineer",
        body: "After studying on my own and at a bootcamp, I moved onto a large financial media product. As development team lead and scrum master I led both new feature work and the running of the team.",
      },
      {
        year: "2024",
        title: "Went independent",
        body: "Financial media, transport systems, and large-scale system replacements, among other work. I also advised companies on adopting AI-driven development.",
      },
      {
        year: "2025",
        title: "Joined a U.S. company's development project",
        body: "An application sent from Canada led to a contract with a U.S.-headquartered company. Working in English, I used AI-driven development to pick up a stack I had never touched, and saw the six-month project through to completion.",
      },
      {
        year: "NOW",
        title: "From Canada to the U.S.",
        body: "While living in Canada I worked fully remotely on projects in Japan and North America. I am now based in the U.S., splitting my time between open source and personal projects and teaching AI-driven development through Udemy, YouTube and the community.",
      },
    ],
  },
  credentials: {
    certificationsLabel: "Certifications",
    certificationsHeading: "Certifications",
    certifications: [
      "AWS Certified Solutions Architect – Professional",
      "AWS Certified DevOps Engineer – Professional",
      "AWS Certified Security – Specialty",
      "CCNP Routing and Switching",
      "Registered Information Security Specialist (Japan)",
      "Applied Information Technology Engineer (Japan)",
      "TOEIC 910",
    ],
    speakingLabel: "Speaking",
    speakingHeading: "Speaking",
    speakingDate: "2025 · Online",
    speakingTitle: "Tokyo AI Festival, pre-event (2025)",
    speakingSubtitle: "Claude Code vs Codex CLI, compared in depth (online)",
    speakingBody:
      "Drawing on using both tools daily, I compared how flexible their custom commands are, their sub-agent features, IDE extension support, and the state of each community.",
    speakingCta: "Event details",
  },
  links: {
    label: "Links",
    heading: "Links",
    lead: "Where I publish.",
  },
}

export const dictionaries: Record<Locale, Dictionary> = { ja, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
