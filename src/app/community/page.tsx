import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { AsyncErrorBoundary } from "@/components/error-boundary"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { Navbar } from "@/components/navbar"
import { Testimonials, type Testimonial } from "@/components/testimonials"
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
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "コミュニティ - Vibe Coding Studio",
  description:
    "AI駆動開発を学ぶ仲間と繋がり、最新検証を見ながら一緒に成長するDiscordコミュニティに参加しよう",
}

/**
 * コミュニティページのヒーローセクション
 * - Discord参加への強いCTA
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
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            AI駆動開発を
            <br />
            共に学ぶ場へ
          </h1>

          {/* CTAメッセージ */}
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            今すぐDiscordコミュニティに参加して、AI駆動開発の最新検証とノウハウを共有しましょう
          </p>

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
 * 価値提案セクション（タスク5）
 * - 3つの価値提案をレスポンシブグリッドで表示
 * - Heroiconsでアイコン表示
 */
function ValuePropositionSection() {
  const valuePropositions = [
    {
      icon: UserGroupIcon,
      title: "仲間と繋がる",
      description: "AI駆動開発を学ぶ仲間と交流し、一緒に成長できる場所です",
    },
    {
      icon: LightBulbIcon,
      title: "最新検証",
      description:
        "とまだの最新AI技術検証を見ながら、実践的なノウハウを学べます",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "気軽に質問",
      description: "わからないことを気軽に質問できる、フレンドリーな環境です",
    },
  ]

  return (
    <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
      <Container>
        <Subheading>コミュニティの価値</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          ここで得られること
        </Heading>

        {/* レスポンシブグリッド: スマホ1カラム、タブレット2カラム、PC3カラム */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {valuePropositions.map(proposition => (
            <div
              key={proposition.title}
              className="relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-950/5"
            >
              <proposition.icon className="h-10 w-10 text-gray-950" />
              <h3 className="mt-6 text-xl font-semibold text-gray-950">
                {proposition.title}
              </h3>
              <p className="mt-4 text-base text-gray-600">
                {proposition.description}
              </p>
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
              <p className="text-lg text-gray-600">
                Vibe Coding Studioは、AI駆動開発を学ぶ仲間が集まる場所です。
                最新のAI技術を活用した開発手法を、実践を通じて学ぶコミュニティです。
              </p>
              <p className="mt-4 text-lg text-gray-600">
                とまだの最新検証を見ながら一緒に成長できる環境を提供しています。
                初心者からベテランまで、あらゆるレベルの開発者が参加しています。
              </p>
            </div>

            <div className="flex items-center justify-center rounded-3xl bg-gray-100 p-12">
              <div className="text-center">
                <SparklesIcon className="mx-auto h-20 w-20 text-gray-500" />
                <p className="mt-4 text-gray-500">
                  AI駆動開発の未来を一緒に作りましょう
                </p>
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
      icon: HashtagIcon,
      name: "一般チャンネル",
      description: "日常の開発に関する雑談や情報共有をするチャンネルです",
    },
    {
      icon: MegaphoneIcon,
      name: "お知らせチャンネル",
      description:
        "コミュニティの重要なお知らせや、とまだの最新検証を共有します",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      name: "質問チャンネル",
      description: "技術的な質問や相談を気軽にできるチャンネルです",
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

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {channels.map(channel => (
            <div
              key={channel.name}
              className="relative rounded-3xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-950/5"
            >
              <channel.icon className="h-10 w-10 text-gray-950" />
              <h3 className="mt-6 text-xl font-semibold text-gray-950">
                {channel.name}
              </h3>
              <p className="mt-4 text-base text-gray-600">
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
 */
const communityTestimonials: Testimonial[] = [
  {
    img: "/testimonials/community-member-1.jpg",
    name: "田中 健太",
    title: "フロントエンドエンジニア",
    quote:
      "AI駆動開発の実践的な知識を得られ、とまださんの最新検証が非常に参考になっています。コミュニティの雰囲気も温かく、質問しやすい環境です。",
  },
  {
    img: "/testimonials/community-member-2.jpg",
    name: "佐藤 美咲",
    title: "バックエンドエンジニア",
    quote:
      "コミュニティメンバーと気軽に質問し合える環境が素晴らしいです。AI技術の最新トレンドをキャッチアップしながら、実践的なスキルも磨けています。",
  },
  {
    img: "/testimonials/community-member-3.jpg",
    name: "鈴木 大輔",
    title: "フルスタックエンジニア",
    quote:
      "同じ目標を持つ仲間と繋がれて、モチベーションが維持できています。とまださんの検証を見ながら一緒に成長できる環境は他にはないと思います。",
  },
]

/**
 * FAQ項目の型定義
 */
interface FAQItem {
  question: string
  answer: string
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
                <span className="text-lg font-semibold text-gray-950">
                  {item.question}
                </span>
                <ChevronDownIcon className="size-6 text-gray-950 transition group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="px-6 pt-2 pb-5 text-base text-gray-600">
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
 * - ヒーローセクション
 * - 価値提案セクション（タスク5）
 * - コミュニティ説明セクション（タスク6）
 * - チャンネル紹介セクション（タスク7）
 * - 参加者の声セクション（タスク8）
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
          <ValuePropositionSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <CommunityDescriptionSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <ChannelIntroductionSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <Testimonials
            testimonials={communityTestimonials}
            subheading="コミュニティメンバーの声"
            heading="参加者の声"
            hideCallToAction={true}
          />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <FAQSection />
        </AsyncErrorBoundary>
        <AsyncErrorBoundary>
          <FinalCTASection />
        </AsyncErrorBoundary>
      </main>
      <AsyncErrorBoundary>
        <Footer />
      </AsyncErrorBoundary>
    </div>
  )
}
