/**
 * i18n — メッセージ辞書
 *
 * 翻訳対象はヘッダー・フッター・トップページ（個人プロフィール）・講座一覧・コミュニティの 5 面。
 * `ja` を基準とし、`en` は同じ構造を持つ（型で強制する）。
 *
 * 英訳はオーナーによる校正を前提とした下書き。
 *
 * ここに書くのは「表示される文字列」だけ。URL・数値・書誌情報などの事実は
 * `src/lib/constants.ts` や `src/data/book.ts` を単一の情報源とし、
 * 辞書には複製しない。
 */

import type { Locale } from "./locale"

export type NavKey = "home" | "community" | "courses"

type CareerEntry = {
  /** Mono ラベルに出す年。"NOW" は現在進行中を示す */
  year: string
  title: string
  body: string
}

type CommunityQuestion = {
  question: string
  answer: string
}

type CommunityValueItem = {
  label: string
  title: string
  description: string
  benefits: string[]
}

type CommunityChannel = {
  label: string
  name: string
  description: string
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
  courses: {
    metaTitle: string
    metaDescription: string
    label: string
    title: string
    lead: string
  }
  community: {
    metaTitle: string
    metaDescription: string
    ogTitle: string
    hero: {
      label: string
      title: string
      lead: string
      highlights: string
      memberLabel: string
      cta: string
    }
    value: {
      label: string
      heading: string
      items: CommunityValueItem[]
    }
    about: {
      label: string
      heading: string
      lead: string
      logoAlt: string
      profileAlt: string
      paragraphs: string[]
    }
    startHere: {
      label: string
      heading: string
      items: CommunityQuestion[]
    }
    channels: {
      label: string
      heading: string
      lead: string
      items: CommunityChannel[]
    }
    audience: {
      label: string
      heading: string
      items: string[]
    }
    faq: {
      label: string
      heading: string
      lead: string
      items: CommunityQuestion[]
    }
    join: {
      label: string
      heading: string
      lead: string[]
      cta: string
    }
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
      community: "コミュニティ",
      courses: "講座",
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
        cta: "コース一覧を見る",
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
  courses: {
    metaTitle: "講座一覧",
    metaDescription: "著者が公開しているUdemy講座の一覧です。",
    label: "Courses",
    title: "講座一覧",
    lead: "著者が公開しているUdemy講座を、公開順に紹介しています。",
  },
  community: {
    metaTitle: "コミュニティ",
    metaDescription:
      "AI駆動開発を学ぶ仲間と繋がり、最新検証を見ながら一緒に成長するDiscordコミュニティに参加しよう",
    ogTitle: "コミュニティ - Vibe Coding Studio",
    hero: {
      label: "COMMUNITY",
      title: "AI駆動開発を一緒に学ぶ仲間が待っています",
      lead: "とまだの最新検証をリアルタイムで見ながら、同じ目標を持つ仲間と一緒に成長できるDiscordコミュニティです。",
      highlights: "初心者大歓迎 | 見るだけでもOK | 温かい雰囲気",
      memberLabel: "名の仲間が参加中",
      cta: "Discordに参加する",
    },
    value: {
      label: "VALUE",
      heading: "ここで得られること",
      items: [
        {
          label: "PEOPLE",
          title: "同じ目標を持つ仲間との繋がり",
          description: "一人じゃない安心感で学習を継続",
          benefits: [
            "「こんなことできました！」を気軽に報告",
            "他のメンバーの成果を見てモチベーションアップ",
            "つまずいたときは助け合える",
            "学習の孤独感から解放される",
          ],
        },
        {
          label: "RESEARCH",
          title: "とまだの最新検証をリアルタイムで",
          description: "YouTube動画になる前の情報をキャッチ",
          benefits: [
            "「今日はこの新機能試してます」をリアルタイム共有",
            "失敗も含めた試行錯誤のプロセスが見られる",
            "検証中のツールの生の様子",
            "ほぼすべての投稿にとまだが反応",
          ],
        },
        {
          label: "SHARING",
          title: "メンバー同士で教え合う文化",
          description: "知識を持つ人が積極的に回答",
          benefits: [
            "とまだだけでなく、メンバーも質問に答える",
            "「自分も同じところで詰まりました！」という共感",
            "実際に試した人のリアルな感想が聞ける",
            "気になるツールや記事をシェア",
          ],
        },
      ],
    },
    about: {
      label: "ABOUT",
      heading: "コミュニティについて",
      lead: "初心者大歓迎 | 見るだけでもOK | 温かい雰囲気",
      logoAlt: "Vibe Coding Studio",
      profileAlt: "とまだ（Tomada）のプロフィール画像",
      paragraphs: [
        "Vibe Coding Studioは、AI駆動開発を学ぶ仲間が集まる場所です。最新のAI技術を活用した開発手法を、実践を通じて学ぶコミュニティです。",
        "また、最新のAI駆動開発情報を共有しあうことで、一緒に成長できる環境を提供しています。初心者からベテランまで、あらゆるレベルの開発者が参加しています。",
      ],
    },
    startHere: {
      label: "START HERE",
      heading: "参加前の不安に答えます",
      items: [
        {
          question: "初心者の自分でも参加して大丈夫?",
          answer:
            "もちろんです！プログラミングを始めたばかりの方が多数参加しています。初歩的な質問も大歓迎で、とまだが丁寧に回答します。",
        },
        {
          question: "見ているだけでも価値ある?",
          answer:
            "はい！投稿3割、ROM7割の方も多いです。とまだの最新検証を見るだけでも勉強になりますし、他のメンバーの質問と回答から学べます。",
        },
        {
          question: "質問したら迷惑じゃない?",
          answer:
            "全く迷惑ではありません。とまだはほぼすべての投稿に反応すると宣言しており、実際に温かく対応しています。知識を持つメンバーも積極的に回答してくれます。",
        },
        {
          question: "忙しくても参加できる?",
          answer:
            "大丈夫です！毎日投稿する必要はありません。週1回、月1回の参加でもOK。過去のやり取りはいつでも見返せます。",
        },
      ],
    },
    channels: {
      label: "CHANNELS",
      heading: "チャンネル紹介",
      lead: "Discordコミュニティには、目的に応じた複数のチャンネルがあります。",
      items: [
        {
          label: "WELCOME",
          name: "自己紹介",
          description: "まずはここで簡単に自己紹介。数行で参加できます。",
        },
        {
          label: "TIMES",
          name: "times-all",
          description:
            "各自の個人スレッド（times）が集まる場所。X感覚で気軽につぶやけます。",
        },
        {
          label: "PROGRESS",
          name: "学習報告",
          description:
            "学んだことを報告するチャンネル。初歩的な内容も歓迎です。",
        },
        {
          label: "LOUNGE",
          name: "雑談",
          description:
            "日々の学習や開発の記録を自由に共有し、気軽に交流できます。",
        },
        {
          label: "RESEARCH",
          name: "とまだの検証部屋",
          description:
            "YouTube化前の最新情報をリアルタイム共有。失敗も含めた試行錯誤が見られます。",
        },
        {
          label: "PRIVATE",
          name: "お問合せ",
          description: "とまだにクローズドで相談できるチャンネルです。",
        },
      ],
    },
    audience: {
      label: "AUDIENCE",
      heading: "こんな人におすすめ",
      items: [
        "AI駆動開発を学び始めたばかりの初心者",
        "Claude Code / Cursor / Codex を使いこなしたい",
        "一人での学習に限界を感じている",
        "同じ目標を持つ仲間が欲しい",
        "とまだに直接質問したい",
        "最新のAIツール情報をいち早くキャッチアップしたい",
        "見ているだけでも学べる環境が欲しい",
        "自分のペースで参加したい",
      ],
    },
    faq: {
      label: "FAQ",
      heading: "よくある質問",
      lead: "コミュニティに関するよくある質問とその回答をまとめました。",
      items: [
        {
          question: "Discordコミュニティは無料で参加できますか？",
          answer:
            "はい、完全無料で参加できます。Discordアカウントがあれば誰でも参加可能です。",
        },
        {
          question: "初心者でも参加できますか？",
          answer:
            "もちろんです！初心者からベテランまで、あらゆるレベルの開発者が参加しています。プログラミング未経験の方も大歓迎です。わからないことは気軽に質問できる環境を提供しています。",
        },
        {
          question: "どのような内容を学べますか？",
          answer:
            "AI駆動開発の最新技術、Claude Code / Codex / Cursor の活用方法、プロンプトエンジニアリング、実践的な開発手法などがシェアされています。とまだの最新検証も共有されますので、試行錯誤のプロセスを含めて学ぶ機会が得られます。",
        },
        {
          question: "コミュニティのルールはありますか？",
          answer:
            "相互尊重とフレンドリーな雰囲気を大切にしており、厳密なルールは設けておりません。具体的なルールはDiscord参加後にご確認ください。",
        },
        {
          question: "質問への回答はどのくらいで得られますか？",
          answer:
            "とまだが気付けば即座に回答しますので、普段は数時間〜半日ぐらいでお答えしています。また、コミュニティメンバーが回答してくださることもあるので、すぐに回答を得られることもあります。",
        },
      ],
    },
    join: {
      label: "JOIN",
      heading: "今すぐ参加しよう",
      lead: [
        "AI駆動開発を学ぶ仲間が待っています。",
        "Discordコミュニティで一緒に成長しましょう！",
      ],
      cta: "Discordに参加する",
    },
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
      community: "Community",
      courses: "Courses",
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
        cta: "Browse the courses",
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
  courses: {
    metaTitle: "Courses",
    metaDescription: "A list of Udemy courses published by Tomada.",
    label: "Courses",
    title: "Courses",
    lead: "Browse Udemy courses in the order they were published.",
  },
  community: {
    metaTitle: "Community",
    metaDescription:
      "Learn AI-driven development with peers, follow experiments as they happen, and grow together in our Discord community.",
    ogTitle: "Community - Vibe Coding Studio",
    hero: {
      label: "COMMUNITY",
      title:
        "Learn AI-driven development with peers who are building alongside you",
      lead: "Follow Tomada's latest experiments in real time and grow with people working toward the same goal in this Discord community.",
      highlights:
        "Beginners welcome | Lurking is fine | A friendly place to learn",
      memberLabel: "members learning together",
      cta: "Join Discord",
    },
    value: {
      label: "VALUE",
      heading: "What you can do here",
      items: [
        {
          label: "PEOPLE",
          title: "Stay connected to people with the same goal",
          description:
            "Keep learning with the reassurance that you are not alone",
          benefits: [
            "Share updates like “I built this!” without overthinking it",
            "Stay motivated by seeing what other members make",
            "Help each other when something gets stuck",
            "Leave the isolation of learning on your own",
          ],
        },
        {
          label: "RESEARCH",
          title: "See Tomada's latest experiments in real time",
          description: "Catch the work before it becomes a YouTube video",
          benefits: [
            "See updates like “I am trying this new feature today” as they happen",
            "Follow the trial-and-error process, including the failures",
            "See tools in their raw testing phase",
            "Tomada responds to almost every post",
          ],
        },
        {
          label: "SHARING",
          title: "Learn from members who share what they know",
          description: "People who have tried it answer questions",
          benefits: [
            "Get answers from members as well as Tomada",
            "Hear “I got stuck in the same place” from people who understand",
            "Learn from honest reactions by people who have tried it",
            "Share useful tools and articles",
          ],
        },
      ],
    },
    about: {
      label: "ABOUT",
      heading: "About the community",
      lead: "Beginners welcome | Lurking is fine | A friendly place to learn",
      logoAlt: "Vibe Coding Studio",
      profileAlt: "Portrait of Tomada",
      paragraphs: [
        "Vibe Coding Studio is a place for people learning AI-driven development. It is a practical community for learning how to use the latest AI technology in development.",
        "Members share what they learn about AI-driven development and grow together. Developers at every level, from beginners to experienced practitioners, take part.",
      ],
    },
    startHere: {
      label: "START HERE",
      heading: "Questions people often have before joining",
      items: [
        {
          question: "Is it okay to join as a beginner?",
          answer:
            "Absolutely. Many members are just starting out with programming. Beginner questions are welcome, and Tomada takes the time to answer them.",
        },
        {
          question: "Is there value in just reading?",
          answer:
            "Yes. Many members mostly read. You can learn by following Tomada's latest experiments and reading other members' questions and answers.",
        },
        {
          question: "Will questions bother people?",
          answer:
            "Not at all. Tomada aims to respond to almost every post, and members with relevant knowledge often join in with warm, practical answers.",
        },
        {
          question: "Can I join when I am busy?",
          answer:
            "Yes. There is no need to post every day. Joining once a week or once a month is fine, and past conversations are always there to revisit.",
        },
      ],
    },
    channels: {
      label: "CHANNELS",
      heading: "Channel guide",
      lead: "The Discord community has several channels for different kinds of participation.",
      items: [
        {
          label: "WELCOME",
          name: "Introductions",
          description:
            "Start with a short introduction. A few lines are enough.",
        },
        {
          label: "TIMES",
          name: "times-all",
          description:
            "A place for personal times threads. Post casually, like you would on X.",
        },
        {
          label: "PROGRESS",
          name: "Learning reports",
          description:
            "Share what you learned. Beginner-level updates are welcome.",
        },
        {
          label: "LOUNGE",
          name: "Lounge",
          description:
            "Share daily learning and development notes and talk with other members.",
        },
        {
          label: "RESEARCH",
          name: "Tomada's lab",
          description:
            "See the latest experiments before YouTube, including the failed attempts.",
        },
        {
          label: "PRIVATE",
          name: "Questions",
          description: "A private channel for questions to Tomada.",
        },
      ],
    },
    audience: {
      label: "AUDIENCE",
      heading: "Who this is for",
      items: [
        "You are just starting to learn AI-driven development",
        "You want to get more from Claude Code, Cursor, or Codex",
        "You have reached the limits of learning alone",
        "You want peers working toward the same goal",
        "You want to ask Tomada questions directly",
        "You want to keep up with new AI tools early",
        "You want a place where reading alone is useful",
        "You want to participate at your own pace",
      ],
    },
    faq: {
      label: "FAQ",
      heading: "Frequently asked questions",
      lead: "Answers to common questions about the community.",
      items: [
        {
          question: "Is the Discord community free to join?",
          answer:
            "Yes. It is completely free; anyone with a Discord account can join.",
        },
        {
          question: "Can beginners join?",
          answer:
            "Absolutely. Developers at every level take part, including people who have never programmed before. It is a friendly place to ask questions.",
        },
        {
          question: "What can I learn there?",
          answer:
            "Members share the latest AI-driven development techniques, ways to use Claude Code, Codex, and Cursor, prompt engineering, and practical development methods. Tomada's latest experiments are shared too, including the process of trial and error.",
        },
        {
          question: "Are there community rules?",
          answer:
            "Mutual respect and a friendly atmosphere matter here. The detailed rules are available after joining Discord.",
        },
        {
          question: "How quickly do questions get answered?",
          answer:
            "Tomada often answers as soon as he sees a post, usually within a few hours to half a day. Other members may answer sooner.",
        },
      ],
    },
    join: {
      label: "JOIN",
      heading: "Join the community",
      lead: [
        "People learning AI-driven development are waiting to meet you.",
        "Grow together in the Vibe Coding Studio Discord community.",
      ],
      cta: "Join Discord",
    },
  },
}

export const dictionaries: Record<Locale, Dictionary> = { ja, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
