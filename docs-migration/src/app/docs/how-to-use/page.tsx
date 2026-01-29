import { ArrowRight, BookOpen, Search, Navigation } from 'lucide-react'
import { type Metadata } from 'next'

import { Button } from '@/components/catalyst/button'
import { HeroBackground } from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'ドキュメントの使い方 - Learning Next',
  description:
    'Learning Nextのドキュメント機能の使い方を詳しく解説。体系的な学習カリキュラム、効率的な読み進め方、検索機能の活用法まで、技術ドキュメントを最大限活用する方法をご紹介します。',
}

interface StepCardProps {
  step: string
  title: string
  description: string
  details: string[]
}

function StepCard({ step, title, description, details }: StepCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-950/5 dark:bg-slate-800 dark:ring-white/10">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
          {step}
        </div>
        <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{title}</h3>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">{description}</p>
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  benefits: string[]
  tips: string[]
}

function FeatureCard({ icon, title, description, benefits, tips }: FeatureCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-950/5 dark:bg-slate-800 dark:ring-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{title}</h3>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">{description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-zinc-950 dark:text-white mb-2">学習効果</h4>
        <ul className="space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-zinc-950 dark:text-white mb-2">効率的な活用法</h4>
        <ul className="space-y-1">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function DocsHowToUsePage() {
  return (
    <div className="overflow-hidden">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <HeroBackground className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:mx-auto lg:max-w-4xl">
            <h1 className="text-4xl font-bold text-zinc-950 sm:text-5xl md:text-6xl dark:text-white">
              <span className="block">ドキュメントの</span>
              <span className="mt-2 block text-blue-600 dark:text-blue-400">使い方ガイド</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-700 md:text-xl dark:text-zinc-300">
              ドキュメントは、プログラミングを体系的に学べる教材です。<br />
              50以上のレッスンで、基礎から実践まで学べます。
            </p>
            <div className="mt-10">
              <Button href="/docs" color="blue" className="flex items-center gap-2">
                ドキュメントを見る
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ドキュメント学習手順セクション */}
      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-950 dark:text-white">
              学習の進め方
            </h2>
            <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
              効果的な学習方法をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="コースを選ぶ"
              description="まずは学びたい分野を決めましょう"
              details={[
                'Ruby、JavaScript、Reactなど豊富な分野から選択',
                '各コースの説明を読んで内容を確認',
                '初心者は基礎コースからスタート',
              ]}
            />
            <StepCard
              step="02"
              title="学習ペースを決める"
              description="無理のないスケジュールを立てましょう"
              details={[
                '毎日の学習時間を決める（例：30分）',
                '無理のない目標を設定する',
                '管理できるペースで進める',
              ]}
            />
            <StepCard
              step="03"
              title="継続して学習する"
              description="レッスンを順番に進めていきましょう"
              details={[
                '最初から順番にレッスンを進める',
                'コード例は実際に試してみる',
                'わからないことは練習問題で確認',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ドキュメント機能セクション */}
      <section className="bg-zinc-50 py-16 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-950 dark:text-white">
              ドキュメントの便利機能
            </h2>
            <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
              学習をさらに効率的にする機能をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<BookOpen className="h-5 w-5" />}
              title="体系的なカリキュラム"
              description="基礎から応用まで、ステップバイステップで学べます"
              benefits={[
                '基礎から順番にスキルを積み上げられる',
                '必要な知識が明確で迷わない',
                '実務で使えるスキルが身につく',
              ]}
              tips={[
                '飛ばさずに最初から順番に進める',
                'わからないときは前のレッスンに戻る',
                '一区切りで全体を振り返ってみる',
              ]}
            />
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              title="検索機能"
              description="忘れた内容や知りたい情報をすぐに見つけられます"
              benefits={[
                '忘れた内容をすぐに確認できる',
                '関連する情報もまとめて見つかる',
                '辞書代わりに使える',
              ]}
              tips={[
                'キーワードで気軽に検索してみる',
                '検索結果から新しい発見もある',
                'たまに過去の学習を振り返ってみる',
              ]}
            />
            <FeatureCard
              icon={<Navigation className="h-5 w-5" />}
              title="ナビゲーション"
              description="今どこを学んでいるか一目でわかります"
              benefits={[
                '学習の全体像がわかる',
                '今どこを学んでいるか明確',
                '関連するトピックへ簡単に移動',
              ]}
              tips={[
                'たまに全体を見渡してみる',
                '関連する内容を一緒に学ぶ',
                '気になるトピックを先に見てみる',
              ]}
            />
          </div>
        </div>
      </section>


      {/* よくある質問セクション */}
      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              よくある質問
            </h2>
          </div>

          <div className="mx-auto max-w-2xl space-y-6">
            {[
              {
                question: 'どのコースから始めればいいですか？',
                answer: '初心者の方はRubyから、Web開発に興味がある方はJavaScriptから始めるのがおすすめです。',
              },
              {
                question: 'どのくらいのペースで進めればいいですか？',
                answer: '毎日30分から1時間程度がおすすめです。無理せず継続できるペースで進めてください。',
              },
              {
                question: 'わからないことがあったらどうしますか？',
                answer: '検索機能で関連する情報を調べたり、練習問題で実際に試してみることで理解が深まります。',
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg bg-zinc-50 p-6 dark:bg-slate-800/50">
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="bg-zinc-50 py-16 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-950 mb-4 dark:text-white">
            ドキュメントで学習を始めましょう
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/docs" color="blue">
              ドキュメントを見る
            </Button>
            <Button href="/about" outline>
              サイトについて
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}