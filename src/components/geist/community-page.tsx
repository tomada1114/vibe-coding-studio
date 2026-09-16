import { DiscordMemberCount } from "@/components/discord-member-count"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { DISCORD_INVITE_URL } from "@/lib/constants"
import { getSiteUrl } from "@/lib/seo/site-url"
import Image from "next/image"

const communityDescription =
  "AI駆動開発を学ぶ仲間と繋がり、最新検証を見ながら一緒に成長するDiscordコミュニティに参加しよう"

const valuePropositions = [
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
] as const

const startHereItems = [
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
] as const

const channels = [
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
    description: "学んだことを報告するチャンネル。初歩的な内容も歓迎です。",
  },
  {
    label: "LOUNGE",
    name: "雑談",
    description: "日々の学習や開発の記録を自由に共有し、気軽に交流できます。",
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
] as const

const recommendedPeople = [
  "AI駆動開発を学び始めたばかりの初心者",
  "Claude Code / Cursor / Codex を使いこなしたい",
  "一人での学習に限界を感じている",
  "同じ目標を持つ仲間が欲しい",
  "とまだに直接質問したい",
  "最新のAIツール情報をいち早くキャッチアップしたい",
  "見ているだけでも学べる環境が欲しい",
  "自分のペースで参加したい",
] as const

const faqItems = [
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
] as const

function CommunityStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vibe Coding Studio",
    url: `${getSiteUrl()}/community`,
    sameAs: [
      "https://x.com/muscle_coding",
      "https://www.youtube.com/@vibe-coding-studio",
      "https://qiita.com/tomada",
      "https://note.com/tomada",
    ],
    description: communityDescription,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

function SectionHeading({
  label,
  children,
}: {
  label: string
  children: string
}) {
  return (
    <header>
      <p className="gg-label">{label}</p>
      <h2 className="text-text-primary mt-3 text-[28px] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[36px] sm:leading-[1.2]">
        {children}
      </h2>
    </header>
  )
}

function CommunityHero() {
  return (
    <div className="gg-glow relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="gg-grid-field pointer-events-none absolute inset-0 -z-10"
      />
      <div className="mx-auto max-w-[1120px] px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8">
        <p className="gg-label">COMMUNITY</p>
        <h1 className="text-text-primary mt-4 max-w-[800px] text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[56px] sm:leading-[1.1]">
          AI駆動開発を
          <br />
          一緒に学ぶ仲間が待っています
        </h1>
        <p className="gg-prose-ja text-text-secondary mt-6 max-w-[720px] text-[18px]">
          とまだの最新検証をリアルタイムで見ながら、同じ目標を持つ仲間と一緒に成長できるDiscordコミュニティです。
        </p>
        <p className="text-text-primary mt-4 text-[16px] font-medium sm:text-[18px]">
          初心者大歓迎 | 見るだけでもOK | 温かい雰囲気
        </p>

        <div className="mt-8 max-w-[560px]">
          <div className="gg-cell border-border border">
            <p className="gg-label">MEMBERS</p>
            <div className="text-text-primary mt-3">
              <AsyncErrorBoundary fallback={null}>
                <DiscordMemberCount />
              </AsyncErrorBoundary>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gg-btn gg-btn-primary"
          >
            Discordに参加する
          </a>
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  return (
    <div className="gg-surface">
      <CommunityStructuredData />
      <main id="main-content">
        <CommunityHero />
        <div aria-hidden="true" className="gg-rule-accent" />

        <div className="mx-auto max-w-[1120px] px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
          <section className="mt-12 sm:mt-16">
            <SectionHeading label="VALUE">ここで得られること</SectionHeading>
            <div className="gg-cell-grid mt-6 grid-cols-1 lg:grid-cols-3">
              {valuePropositions.map(proposition => (
                <article key={proposition.title} className="gg-cell">
                  <p className="gg-label">{proposition.label}</p>
                  <h3 className="text-text-primary mt-3 text-[20px] leading-[1.5] font-medium">
                    {proposition.title}
                  </h3>
                  <p className="text-text-secondary mt-2 text-[14px] leading-[1.7] font-medium">
                    {proposition.description}
                  </p>
                  <ul className="gg-prose-ja text-text-secondary mt-5 space-y-2 text-[14px]">
                    {proposition.benefits.map(benefit => (
                      <li key={benefit} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="text-accent mt-[0.15em]"
                        >
                          /
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label="ABOUT">コミュニティについて</SectionHeading>
            <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
              初心者大歓迎 | 見るだけでもOK | 温かい雰囲気
            </p>
            <div className="gg-cell-grid mt-6 grid-cols-1 lg:grid-cols-[1fr_280px]">
              <div className="gg-cell">
                <Image
                  src="/vcs-logo-wide-transparent.png"
                  alt="Vibe Coding Studio"
                  width={300}
                  height={100}
                  sizes="(max-width: 640px) 240px, 300px"
                  className="h-auto w-full max-w-[300px]"
                />
                <div className="mt-6 space-y-4">
                  <p className="gg-prose-ja text-text-secondary text-[16px]">
                    Vibe Coding
                    Studioは、AI駆動開発を学ぶ仲間が集まる場所です。最新のAI技術を活用した開発手法を、実践を通じて学ぶコミュニティです。
                  </p>
                  <p className="gg-prose-ja text-text-secondary text-[16px]">
                    また、最新のAI駆動開発情報を共有しあうことで、一緒に成長できる環境を提供しています。初心者からベテランまで、あらゆるレベルの開発者が参加しています。
                  </p>
                </div>
              </div>
              <div className="gg-cell flex items-center justify-center">
                <Image
                  src="/tomada.png"
                  alt="とまだ（Tomada）のプロフィール画像"
                  width={560}
                  height={560}
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="h-auto w-full max-w-[280px]"
                />
              </div>
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label="START HERE">
              参加前の不安に答えます
            </SectionHeading>
            <div className="gg-cell-grid mt-6 grid-cols-1 md:grid-cols-2">
              {startHereItems.map(item => (
                <article key={item.question} className="gg-cell">
                  <h3 className="text-text-primary text-[18px] leading-[1.5] font-medium">
                    {item.question}
                  </h3>
                  <p className="gg-prose-ja text-text-secondary mt-3 text-[14px]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label="CHANNELS">チャンネル紹介</SectionHeading>
            <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
              Discordコミュニティには、目的に応じた複数のチャンネルがあります。
            </p>
            <div className="gg-cell-grid mt-6 grid-cols-1 md:grid-cols-2">
              {channels.map(channel => (
                <article key={channel.name} className="gg-cell">
                  <p className="gg-label">{channel.label}</p>
                  <h3 className="text-text-primary mt-3 text-[20px] leading-[1.5] font-medium">
                    {channel.name}
                  </h3>
                  <p className="gg-prose-ja text-text-secondary mt-3 text-[14px]">
                    {channel.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label="AUDIENCE">こんな人におすすめ</SectionHeading>
            <div className="gg-cell-grid mt-6 grid-cols-1 md:grid-cols-2">
              {recommendedPeople.map(person => (
                <div key={person} className="gg-cell flex items-start gap-3">
                  <span aria-hidden="true" className="text-accent mt-[0.15em]">
                    /
                  </span>
                  <p className="gg-prose-ja text-text-secondary text-[16px]">
                    {person}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <SectionHeading label="FAQ">よくある質問</SectionHeading>
            <p className="gg-prose-ja text-text-secondary mt-5 max-w-[720px] text-[16px] sm:text-[18px]">
              コミュニティに関するよくある質問とその回答をまとめました。
            </p>
            <div className="gg-cell-grid mt-6 grid-cols-1">
              {faqItems.map(item => (
                <details
                  key={item.question}
                  className="gg-cell open:bg-surface-1"
                >
                  <summary className="text-text-primary cursor-pointer list-none pr-8 text-[18px] leading-[1.5] font-medium marker:hidden">
                    {item.question}
                  </summary>
                  <p className="gg-prose-ja text-text-secondary mt-4 text-[14px]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-16 sm:mt-24">
            <div className="gg-cell border-border border text-center sm:p-10">
              <p className="gg-label">JOIN</p>
              <h2 className="text-text-primary mt-3 text-[28px] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[36px] sm:leading-[1.2]">
                今すぐ参加しよう
              </h2>
              <p className="gg-prose-ja text-text-secondary mx-auto mt-4 max-w-[560px] text-[16px] sm:text-[18px]">
                AI駆動開発を学ぶ仲間が待っています。
                <br />
                Discordコミュニティで一緒に成長しましょう！
              </p>
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gg-btn gg-btn-primary mt-7"
              >
                Discordに参加する
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
