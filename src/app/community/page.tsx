import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
// import { Testimonials, type Testimonial } from "@/components/testimonials"
import { Heading, Subheading } from "@/components/text"
import { DISCORD_INVITE_URL } from "@/lib/constants"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import {
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  HashtagIcon,
  LightBulbIcon,
  MegaphoneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "コミュニティ - Vibe Coding Studio",
  description:
    "AI駆動開発を学ぶ仲間と繋がり、最新検証を見ながら一緒に成長するDiscordコミュニティに参加しよう",
}

/**
 * コミュニティページのヒーローセクション
 * - Discord参加への強いCTA
 * - 初心者歓迎のメッセージを強調
 * - レスポンシブデザイン対応
 */
function CommunityHeroSection() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          {/* メインメッセージ */}
          <h1 className="font-display text-6xl/[1.15] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[1.1] md:text-9xl/[1.1]">
            AI駆動開発を
            <br />
            一緒に学ぶ仲間が
            <br />
            待っています
          </h1>

          {/* サブメッセージ - 不安解消 */}
          <div className="mt-8 max-w-2xl">
            <p className="text-xl/8 font-medium text-gray-950/75 sm:text-2xl/9">
              初心者大歓迎 | 見るだけでもOK | 温かい雰囲気
            </p>
            <p className="mt-4 text-lg/8 text-gray-700">
              とまだの最新検証をリアルタイムで見ながら、同じ目標を持つ仲間と一緒に成長できるDiscordコミュニティです。
            </p>
          </div>

          {/* Discord参加ボタン */}
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discordに参加する
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * 不安解消セクション
 * - 訪問者の不安を解消するメッセージ
 * - FAQ形式で具体的な疑問に回答
 */
function AnxietyReliefSection() {
  const anxieties = [
    {
      question: "初心者の自分でも参加して大丈夫?",
      answer:
        "もちろんです!プログラミングを始めたばかりの方が多数参加しています。初歩的な質問も大歓迎で、とまだが丁寧に回答します。",
    },
    {
      question: "見ているだけでも価値ある?",
      answer:
        "はい!投稿3割、ROM7割の方も多いです。とまだの最新検証を見るだけでも勉強になりますし、他のメンバーの質問と回答から学べます。",
    },
    {
      question: "質問したら迷惑じゃない?",
      answer:
        "全く迷惑ではありません。とまだはほぼすべての投稿に反応すると宣言しており、実際に温かく対応しています。知識を持つメンバーも積極的に回答してくれます。",
    },
    {
      question: "忙しくても参加できる?",
      answer:
        "大丈夫です!毎日投稿する必要はありません。週1回、月1回の参加でもOK。過去のやり取りはいつでも見返せます。",
    },
  ]

  return (
    <div className="bg-white py-32">
      <Container>
        <Subheading>安心してください</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          こんな不安、ありませんか?
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2">
          {anxieties.map(anxiety => (
            <div
              key={anxiety.question}
              className="rounded-3xl bg-gray-50 p-8 ring-1 ring-gray-950/5"
            >
              <h3 className="text-lg/7 font-semibold text-gray-950">
                {anxiety.question}
              </h3>
              <p className="mt-4 text-base/7 text-gray-700">
                {anxiety.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * 価値提案セクション（タスク5）
 * - 3つの価値提案をより詳細に提示
 * - 具体的なメリットを箇条書きで説明
 */
function ValuePropositionSection() {
  const valuePropositions = [
    {
      icon: UserGroupIcon,
      title: "同じ目標を持つ仲間との繋がり",
      description: "一人じゃない安心感で学習を継続",
      benefits: [
        "「こんなことできました!」を気軽に報告",
        "他のメンバーの成果を見てモチベーションアップ",
        "つまずいたときは助け合える",
        "学習の孤独感から解放される",
      ],
    },
    {
      icon: LightBulbIcon,
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
      icon: ChatBubbleLeftRightIcon,
      title: "メンバー同士で教え合う文化",
      description: "知識を持つ人が積極的に回答",
      benefits: [
        "とまただけでなく、メンバーも質問に答える",
        "「自分も同じところで詰まりました!」という共感",
        "実際に試した人のリアルな感想が聞ける",
        "気になるツールや記事をシェア",
      ],
    },
  ]

  return (
    <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
      <Container>
        <Subheading>コミュニティの価値</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          ここで得られること
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-3">
          {valuePropositions.map(proposition => (
            <div
              key={proposition.title}
              className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-950/5"
            >
              <proposition.icon className="h-10 w-10 text-gray-950" />
              <h3 className="mt-6 text-xl/7 font-semibold text-gray-950">
                {proposition.title}
              </h3>
              <p className="mt-2 text-sm/6 font-medium text-gray-600">
                {proposition.description}
              </p>
              <ul className="mt-6 space-y-3">
                {proposition.benefits.map(benefit => (
                  <li
                    key={benefit}
                    className="flex items-start text-sm/6 text-gray-700"
                  >
                    <span className="mr-2 text-gray-950">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * コミュニティ説明セクション（タスク6）
 * - AI駆動開発を学ぶ場所であることを明示
 */
function CommunityDescriptionSection() {
  return (
    <div className="relative py-32">
      <Gradient className="absolute inset-2 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Subheading>About Community</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          コミュニティについて
        </Heading>

        <div className="mt-10 sm:mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <p className="text-base/7 text-gray-700">
                Vibe Coding Studioは、AI駆動開発を学ぶ仲間が集まる場所です。
                最新のAI技術を活用した開発手法を、実践を通じて学ぶコミュニティです。
              </p>
              <p className="mt-4 text-base/7 text-gray-700">
                とまだの最新検証を見ながら一緒に成長できる環境を提供しています。
                初心者からベテランまで、あらゆるレベルの開発者が参加しています。
              </p>
            </div>

            {/* とまだのプロフィール画像 */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-gray-100 ring-1 ring-gray-950/5">
                <Image
                  src="/tomada.png"
                  alt="とまだ（Tomada）のプロフィール画像"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * チャンネル紹介セクション（タスク7）
 * - 各チャンネルの目的と活用方法を説明
 */
function ChannelIntroductionSection() {
  const channels = [
    {
      icon: UserGroupIcon,
      name: "自己紹介",
      description: "まずはここで簡単に自己紹介!数行でOKです",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      name: "times-all",
      description:
        "各自の個人スレッド(times)が集まる場所。X感覚で気軽につぶやけます",
    },
    {
      icon: LightBulbIcon,
      name: "学習報告",
      description: "学んだことを報告。初歩的な内容も大歓迎です",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      name: "雑談",
      description: "日々の学習や開発の記録を自由に。気軽に交流できます",
    },
    {
      icon: MegaphoneIcon,
      name: "とまだの検証部屋",
      description:
        "YouTube化前の最新情報をリアルタイム共有。失敗も含めた試行錯誤が見られます",
    },
    {
      icon: HashtagIcon,
      name: "お問合せ",
      description: "とまだにクローズドで相談できるチャンネル",
    },
  ]

  return (
    <div className="bg-white py-32">
      <Container>
        <Subheading>Discord チャンネル</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          チャンネル紹介
        </Heading>
        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          Discordコミュニティには、目的に応じた複数のチャンネルがあります。
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2">
          {channels.map(channel => (
            <div
              key={channel.name}
              className="relative rounded-3xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-950/5"
            >
              <channel.icon className="h-10 w-10 text-gray-950" />
              <h3 className="mt-6 text-xl/7 font-semibold text-gray-950">
                {channel.name}
              </h3>
              <p className="mt-4 text-base/7 text-gray-600">
                {channel.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * コミュニティメンバーのテスティモニアルデータ（タスク8.1）
 * 一旦コメントアウト
 */
// const communityTestimonials: Testimonial[] = [
//   {
//     img: "/testimonials/community-member-1.jpg",
//     name: "田中 健太",
//     title: "フロントエンドエンジニア",
//     quote:
//       "AI駆動開発の実践的な知識を得られ、とまださんの最新検証が非常に参考になっています。コミュニティの雰囲気も温かく、質問しやすい環境です。",
//   },
//   {
//     img: "/testimonials/community-member-2.jpg",
//     name: "佐藤 美咲",
//     title: "バックエンドエンジニア",
//     quote:
//       "コミュニティメンバーと気軽に質問し合える環境が素晴らしいです。AI技術の最新トレンドをキャッチアップしながら、実践的なスキルも磨けています。",
//   },
//   {
//     img: "/testimonials/community-member-3.jpg",
//     name: "鈴木 大輔",
//     title: "フルスタックエンジニア",
//     quote:
//       "同じ目標を持つ仲間と繋がれて、モチベーションが維持できています。とまださんの検証を見ながら一緒に成長できる環境は他にはないと思います。",
//   },
// ]

/**
 * FAQ項目の型定義
 */
interface FAQItem {
  question: string
  answer: string
}

/**
 * Testimonial型の定義（一旦コメントアウト）
 */
// type Testimonial = {
//   img: string
//   name: string
//   title: string
//   quote: string
// }

/**
 * こんな人におすすめセクション
 * - ターゲットユーザーを明確化
 * - チェックリスト形式で提示
 */
function RecommendedForSection() {
  const recommendedPeople = [
    "AI駆動開発を学び始めたばかりの初心者",
    "Claude Code/Cursor/Codex を使いこなしたい",
    "一人での学習に限界を感じている",
    "同じ目標を持つ仲間が欲しい",
    "とまだに直接質問したい",
    "最新のAIツール情報をいち早くキャッチアップしたい",
    "見ているだけでも学べる環境が欲しい",
    "自分のペースで参加したい",
  ]

  return (
    <div className="relative py-32">
      <Gradient className="absolute inset-2 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Subheading>Who should join</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          こんな人におすすめ
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-2">
          {recommendedPeople.map(person => (
            <div
              key={person}
              className="flex items-start rounded-2xl bg-white/80 p-6 ring-1 ring-gray-950/5"
            >
              <span className="mr-3 mt-0.5 text-gray-950">•</span>
              <p className="text-base/7 text-gray-700">
                {person}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * FAQデータ（タスク9.1）
 */
const faqItems: FAQItem[] = [
  {
    question: "Discordコミュニティは無料で参加できますか？",
    answer:
      "はい、完全無料で参加できます。Discordアカウントがあれば誰でも参加可能です。",
  },
  {
    question: "初心者でも参加できますか？",
    answer:
      "もちろんです！初心者からベテランまで、あらゆるレベルの開発者が参加しています。わからないことは気軽に質問できる環境を提供しています。",
  },
  {
    question: "どのような内容を学べますか？",
    answer:
      "AI駆動開発の最新技術、Claude Codeの活用方法、プロンプトエンジニアリング、実践的な開発手法などを学べます。とまださんの最新検証も共有されます。",
  },
  {
    question: "コミュニティのルールはありますか？",
    answer:
      "相互尊重とフレンドリーな雰囲気を大切にしています。具体的なルールはDiscord参加後にご確認ください。",
  },
  {
    question: "質問への回答はどのくらいで得られますか？",
    answer:
      "コミュニティメンバーの活動状況によりますが、多くの場合、数時間以内に何らかの反応があります。活発なコミュニティなので、すぐに助けを得られることが多いです。",
  },
]

/**
 * FAQセクション（タスク9.2）
 * - Headless UI Disclosureでアコーディオン実装
 * - FAQ項目クリックで回答を展開/折りたたみ
 */
function FAQSection() {
  return (
    <div className="bg-white py-32">
      <Container>
        <Subheading>FAQ</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          よくある質問
        </Heading>
        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          コミュニティに関するよくある質問とその回答をまとめました。
        </p>

        <div className="mt-10 space-y-4 sm:mt-16">
          {faqItems.map((item, index) => (
            <Disclosure key={index} as="div" className="rounded-2xl bg-gray-50">
              <DisclosureButton className="group flex w-full items-center justify-between px-6 py-5 text-left">
                <span className="text-lg/7 font-semibold text-gray-950">
                  {item.question}
                </span>
                <ChevronDownIcon className="size-6 text-gray-950 transition group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="px-6 pt-2 pb-5 text-base/7 text-gray-600">
                {item.answer}
              </DisclosurePanel>
            </Disclosure>
          ))}
        </div>
      </Container>
    </div>
  )
}

/**
 * 最終CTAセクション（タスク10）
 * - ページ最下部にDiscord参加ボタンを配置
 * - ヒーローセクションのCTAと視覚的に一貫性のあるデザイン
 */
function FinalCTASection() {
  return (
    <div className="bg-white py-32">
      <Container>
        <div className="text-center">
          <Heading as="h2" className="text-center">
            今すぐ参加しよう
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            AI駆動開発を学ぶ仲間が待っています。Discordコミュニティで一緒に成長しましょう。
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discordに参加する
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

/**
 * コミュニティページ
 * - ヒーローセクション（詳細化済み）
 * - 不安解消セクション（新規追加）
 * - 価値提案セクション（詳細拡張済み）
 * - コミュニティ説明セクション（タスク6）
 * - チャンネル紹介セクション（改善済み）
 * - こんな人におすすめセクション（新規追加）
 * - FAQセクション（タスク9）
 * - 最終CTAセクション（タスク10）
 * - AsyncErrorBoundaryによるエラーハンドリング
 */
export default function CommunityPage() {
  return (
    <div className="overflow-hidden">
      <AsyncErrorBoundary>
        <CommunityHeroSection />
      </AsyncErrorBoundary>
      <main>
        <AsyncErrorBoundary>
          <AnxietyReliefSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <ValuePropositionSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <CommunityDescriptionSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <ChannelIntroductionSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <RecommendedForSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <FAQSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <FinalCTASection />
        </AsyncErrorBoundary>
      </main>
      <AsyncErrorBoundary>
        <Footer hideCallToAction={true} />
      </AsyncErrorBoundary>
    </div>
  )
}
