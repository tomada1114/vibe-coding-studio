import { ArrowRight, List, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { Heading } from '@/components/catalyst/heading'
import BreadcrumbWithStructuredData from '@/components/common/BreadcrumbWithStructuredData'
import { Devicon } from '@/components/icons/Devicon'
import { navigation } from '@/lib/navigation'
import { generateDocsBreadcrumb } from '@/lib/seo/breadcrumb-utils'

/**
 * 特徴セクションの項目の型定義
 */
export type FeatureItem = {
  /**
   * 表示するLucideアイコン
   */
  icon: LucideIcon
  /**
   * 特徴のタイトル
   */
  title: string
  /**
   * 特徴の説明文
   */
  description: string
}

/**
 * 対象者セクションの項目の型定義
 */
export type TargetAudienceItem = {
  /**
   * 表示するLucideアイコン
   */
  icon: LucideIcon
  /**
   * 対象者のタイトル
   */
  title: string
  /**
   * 対象者の説明文
   */
  description: string
}

/**
 * カリキュラムチャプターの型定義
 */
export type CurriculumChapter = {
  /**
   * チャプターのタイトル
   */
  title: string
  /**
   * チャプターの説明文（HTML可）
   */
  description: string
}

/**
 * CTAセクションの型定義
 */
export type CtaSection = {
  /**
   * CTAのタイトル
   */
  title: string
  /**
   * CTAの説明文（HTML可）
   */
  description: string
  /**
   * メインボタンのテキスト
   */
  primaryButtonText: string
  /**
   * メインボタンのリンク先
   */
  primaryButtonLink: string
  /**
   * サブボタンのテキスト
   */
  secondaryButtonText: string
  /**
   * サブボタンのリンク先
   */
  secondaryButtonLink: string
}

/**
 * メタデータの型定義
 */
export type CourseMetadata = {
  /**
   * ページのタイトル
   */
  title: string
  /**
   * ページの説明文
   */
  description: string
}

/**
 * 動画コースの型定義
 */
export type VideoCourse = {
  /**
   * コースのタイトル
   */
  title: string
  /**
   * コースに関連するタグ
   */
  tags: string[]
  /**
   * 割引率
   */
  discount: string
}

/**
 * 動画コースセクションの型定義
 */
export type VideoCoursesSection = {
  /**
   * セクションのタイトル
   */
  title: string
  /**
   * セクションの説明
   */
  description: string
  /**
   * CTAボタンのテキスト
   */
  ctaText: string
  /**
   * CTAボタンのリンク先
   */
  ctaLink: string
  /**
   * 特徴リスト
   */
  features: FeatureItem[]
  /**
   * コースリスト（オプショナル）
   */
  courses?: VideoCourse[]
}

/**
 * コースコンテンツの型定義
 */
export type CourseContent = {
  /**
   * コースのタイトル
   */
  title: string
  /**
   * コースの詳細説明
   */
  description: string
  /**
   * コースの短い説明
   */
  shortDescription: string
  /**
   * ヒーローセクションのタグライン
   */
  tagline: string
  /**
   * ページのメタデータ
   */
  meta: CourseMetadata
  /**
   * コースの特徴リスト
   */
  features: FeatureItem[]
  /**
   * 対象者リスト
   */
  targetAudience: TargetAudienceItem[]
  /**
   * カリキュラムのチャプター
   */
  curriculum: CurriculumChapter[]
  /**
   * 動画コースセクション（オプショナル）
   */
  videoCourses?: VideoCoursesSection
  /**
   * CTAセクションの内容
   */
  cta: CtaSection
  /**
   * チャプターの総数
   */
  chapterCount: number
}

/**
 * テーマカラーの型定義
 */
export type ThemeColors = {
  primary: string
  accent: string
  accentDark: string
  gradient: {
    from: string
    to: string
    darkFrom: string
    darkTo: string
  }
  bg: {
    light: string
    dark: string
  }
  border: {
    light: string
    dark: string
  }
  text: {
    accent: string
    accentDark: string
    hover: string
    hoverDark: string
  }
  button: {
    bg: string
    bgHover: string
    bgDark: string
    bgHoverDark: string
    outline: string
  }
}

/**
 * カリキュラムコンポーネントのプロパティ
 */
export type CurriculumProps = {
  /**
   * コースのスラグ（例: 'ruby', 'rails'）
   */
  slug: string
  /**
   * コース固有のコンテンツ設定
   */
  courseContent: CourseContent
  /**
   * テーマカラー設定
   */
  themeColors: ThemeColors
}

/**
 * カリキュラムページの共通コンポーネント
 *
 * このコンポーネントは言語やフレームワークごとのカリキュラムページを
 * 統一されたレイアウトで表示するために使用します。
 */
export function Curriculum({ slug, courseContent, themeColors }: CurriculumProps) {
  // パンくずリストのデータ
  const breadcrumbs = generateDocsBreadcrumb(slug, courseContent.title)

  // 現在のコースのナビゲーション情報を取得
  const currentCourse = navigation.find(course => course.slug === slug)
  const chapters = currentCourse?.links || []

  return (
    <div className="w-full md:w-4xl">
      {/* パンくずリスト */}
      <div className="container mx-auto px-4 pt-8">
        <BreadcrumbWithStructuredData items={breadcrumbs} />
      </div>

      {/* ヒーローセクション */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-24">
          <div className="text-center">
            {/* アイコンを表示 */}
            <div className="mt-8 mb-6 flex justify-center">
              <Devicon slug={slug} size="4xl" className="animate-pulse-slow" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              {courseContent.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
              <strong>{courseContent.tagline}</strong>
              <br />
              {courseContent.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* クイックナビゲーション - チャプター一覧 */}
      {chapters.length > 0 && (
        <section className="container mx-auto px-4 py-8 sm:px-6">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
              <List className={`h-5 w-5 ${themeColors.text.accent} `} />
              <h2 className="text-lg font-semibold text-slate-900">チャプター一覧</h2>
            </div>
            <div className="p-4">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {chapters.map((chapter, index) => (
                  <Link
                    key={index}
                    href={chapter.href}
                    className={`flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-all hover:border-gray-200 hover:shadow-sm ${themeColors.text.hover} `}
                  >
                    <div
                      className={`h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r ${themeColors.gradient.from} ${themeColors.gradient.to} flex items-center justify-center text-sm font-semibold text-white`}
                    >
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">{chapter.title}</p>
                      <p className="text-xs text-slate-500">
                        {chapter.children?.length || 0}個のレッスン
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 特徴セクション */}
      <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <h2 className="mb-8 text-center text-xl font-bold tracking-tight text-slate-900">
          このカリキュラムの
          <span className={`${themeColors.text.accent} `}>特徴</span>
        </h2>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
          {courseContent.features.map((feature, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-0 border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="p-6 pb-4">
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className={`h-10 w-10 rounded-lg bg-gradient-to-r ${themeColors.gradient.from} ${themeColors.gradient.to} p-2.5 text-white shadow-md sm:h-12 sm:w-12 sm:rounded-xl sm:p-3`}
                  >
                    {feature.icon && <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />}
                  </div>
                  <div className="h-12 w-12 opacity-10 sm:h-16 sm:w-16">
                    {feature.icon && (
                      <feature.icon className={`h-full w-full ${themeColors.text.accent}`} />
                    )}
                  </div>
                </div>
                <Heading level={3} className="text-lg font-bold sm:text-xl">
                  <strong>{feature.title}</strong>
                </Heading>
                <p className="text-sm text-slate-600 sm:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 適した対象者 */}
      <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div
          className={`rounded-2xl bg-gradient-to-br ${themeColors.bg.light} via-slate-50 to-white p-6 shadow-lg sm:p-8 md:rounded-3xl md:p-12 md:shadow-xl`}
        >
          <h2 className="mb-8 text-center text-xl font-bold tracking-tight text-slate-900">
            こんな方に
            <span className={`${themeColors.text.accent} `}>最適な</span>
            コンテンツです
          </h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {courseContent.targetAudience.map((target, index) => (
              <div
                key={index}
                className="group rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl sm:p-8"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${themeColors.gradient.from} ${themeColors.gradient.to} text-white shadow-md transition-transform group-hover:scale-110 sm:mb-6 sm:h-14 sm:w-14`}
                >
                  {target.icon && <target.icon className="h-6 w-6 sm:h-7 sm:w-7" />}
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 sm:mb-3 sm:text-2xl">
                  <strong>{target.title}</strong>
                </h3>
                <p className="text-base text-slate-600 sm:text-lg">{target.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* カリキュラム内容 */}
      <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            カリキュラム
            <span className={`${themeColors.text.accent} `}>内容</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:mt-6 sm:text-lg md:text-xl">
            <strong>{courseContent.chapterCount}つのチャプター</strong>で体系的に{' '}
            {courseContent.title} を学びます
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {courseContent.curriculum.map((chapter, index) => {
            // 対応するナビゲーション情報を検索
            const navChapter = chapters[index]
            const hasLink = navChapter?.href

            return (
              <div
                key={index}
                className={`group overflow-hidden border-0 border-l-4 ${themeColors.border.light} rounded-lg bg-white shadow-md transition-all hover:-translate-x-1 hover:shadow-xl`}
              >
                {hasLink ? (
                  <Link href={navChapter.href} className="block">
                    <div className="bg-white pt-6 pr-4 pb-2 pl-4 sm:pr-6 sm:pl-6">
                      <div className="flex items-center justify-between">
                        <Heading
                          level={3}
                          className="flex-1 text-base font-bold sm:text-lg md:text-xl"
                        >
                          <strong className={`${themeColors.text.hover} transition-colors`}>
                            {chapter.title}
                          </strong>
                        </Heading>
                        <ArrowRight
                          className={`ml-3 h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 ${themeColors.text.accent}`}
                        />
                      </div>
                    </div>
                    <div className="bg-white pt-2 pr-4 pb-6 pl-4 sm:pr-6 sm:pl-6">
                      <p
                        className="text-sm text-slate-600 sm:text-base"
                        dangerouslySetInnerHTML={{ __html: chapter.description }}
                      ></p>
                      {navChapter.children && (
                        <p className={`mt-2 text-xs ${themeColors.text.accent} font-medium`}>
                          {navChapter.children.length}個のレッスン
                        </p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <>
                    <div className="bg-white pt-6 pb-2 pl-4 sm:pl-6">
                      <Heading level={3} className="text-base font-bold sm:text-lg md:text-xl">
                        <strong>{chapter.title}</strong>
                      </Heading>
                    </div>
                    <div className="bg-white pt-2 pb-6 pl-4 sm:pl-6">
                      <p
                        className="text-sm text-slate-600 sm:text-base"
                        dangerouslySetInnerHTML={{ __html: chapter.description }}
                      ></p>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 動画コースセクション */}
      {courseContent.videoCourses && (
        <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {courseContent.videoCourses.title}
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 sm:mt-6 sm:text-lg">
                {courseContent.videoCourses.description}
              </p>
            </div>

            {/* 特徴 */}
            <div className="mb-10 grid gap-6 sm:mb-12 sm:grid-cols-2">
              {courseContent.videoCourses.features.map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${themeColors.gradient.from} ${themeColors.gradient.to} text-white shadow-md`}
                    >
                      {feature.icon && <feature.icon className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">{feature.title}</h3>
                      <p className="text-sm text-slate-600 sm:text-base">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA ボタン */}
            <div className="text-center">
              <Link
                href={courseContent.videoCourses.ctaLink}
                className={`inline-flex items-center gap-2 rounded-md ${themeColors.button.bg} px-6 py-3 text-base font-semibold text-white shadow-sm transition-all ${themeColors.button.bgHover} hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${themeColors.button.outline}`}
              >
                {courseContent.videoCourses.ctaText}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-balance text-slate-900">
            {courseContent.cta.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-sm/6 text-pretty text-slate-600 sm:mt-6 sm:text-base/7 md:text-lg/8"
            dangerouslySetInnerHTML={{ __html: courseContent.cta.description }}
          ></p>
          <div className="mt-8 flex flex-col items-center justify-center gap-y-4 sm:mt-10 sm:flex-row sm:gap-x-6">
            <Link
              href={courseContent.cta.primaryButtonLink}
              className={`w-full rounded-md ${themeColors.button.bg} px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all ${themeColors.button.bgHover} hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${themeColors.button.outline} sm:w-auto sm:px-5 sm:py-3 sm:text-base`}
            >
              {courseContent.cta.primaryButtonText}
            </Link>
            <Link
              href={courseContent.cta.secondaryButtonLink}
              className={`flex w-full items-center justify-center text-sm font-semibold text-slate-900 transition-colors ${themeColors.text.hover} sm:w-auto sm:justify-start sm:text-base`}
            >
              {courseContent.cta.secondaryButtonText}{' '}
              <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
