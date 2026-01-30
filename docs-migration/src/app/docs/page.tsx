import { ArrowRight, Construction } from "lucide-react"
import Link from "next/link"

import BreadcrumbWithStructuredData from "@/components/common/BreadcrumbWithStructuredData"
import { Devicon } from "@/components/icons/Devicon"
import { getCoursesForListPage } from "@/lib/course-constants"
import { generateDocsBreadcrumb } from "@/lib/seo/breadcrumb-utils"

export const metadata = {
  title: "学習コース一覧",
  description: "プログラミングの各種スキルを体系的に学べるオンラインコース一覧",
}

/**
 * コース一覧ページ
 *
 * 利用可能な全てのコースを表示し、各コースの詳細ページにリンクします
 */
export default async function DocsPage() {
  // コース定数ファイルからソート済みのコース情報を取得
  const {
    foundationsCourses,
    frontendCourses,
    backendCourses,
    infrastructureCourses,
    dataAiCourses,
  } = getCoursesForListPage()

  // フロントエンドコースを利用可能なものと準備中のものに分離
  const availableFrontendCourses = frontendCourses.filter(
    course => course.available
  )
  const comingSoonFrontendCourses = frontendCourses.filter(
    course => !course.available
  )

  // パンくずリストのデータ
  const breadcrumbs = generateDocsBreadcrumb()

  return (
    <div className="container mx-auto px-4 py-16">
      <BreadcrumbWithStructuredData items={breadcrumbs} className="mb-8" />

      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          学習コース一覧
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          スキルアップをサポートする体系的なプログラミング学習コンテンツ
        </p>

        {/* 使い方ガイドリンク */}
        <div className="mt-8">
          <Link
            href="/docs/how-to-use"
            className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200 transition-all hover:bg-blue-100 hover:ring-blue-300"
          >
            📚 ドキュメントの使い方ガイド
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* フロントエンドコース */}
      <div className="mb-16">
        <div className="mb-8 flex items-center">
          <h2 className="text-2xl font-bold">フロントエンド開発</h2>
          {/* 利用可能なフロントエンドコースがない場合のみ「準備中」バッジを表示 */}
          {availableFrontendCourses.length === 0 && (
            <span className="ml-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              準備中
            </span>
          )}
          <div className="ml-4 h-px flex-grow bg-gray-200"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* 利用可能なフロントエンドコース */}
          {availableFrontendCourses.map(course => (
            <div
              key={course.slug}
              className="rounded-3xl border border-gray-200 p-8 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Devicon
                    slug={course.slug}
                    size="lg"
                    className={course.colors.text}
                  />
                  <h2
                    id={`course-${course.slug}`}
                    className={`text-xl font-semibold ${course.colors.text}`}
                  >
                    {course.title}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{course.shortDescription}</p>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>

              <Link
                href={course.topPagePath}
                aria-describedby={`course-${course.slug}`}
                className={`group mt-6 block rounded-md ${course.colors.buttonBg} px-4 py-3 text-center font-semibold text-white shadow-sm ${course.colors.buttonHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
              >
                <span className="flex items-center justify-center">
                  コースを見る
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          ))}

          {/* 準備中のフロントエンドコース */}
          {comingSoonFrontendCourses.map(course => (
            <div
              key={course.slug}
              className="rounded-3xl border border-gray-200 p-8 opacity-70 grayscale transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Devicon
                    slug={course.slug}
                    size="lg"
                    className="text-gray-500"
                  />
                  <h2
                    id={`course-${course.slug}`}
                    className="text-xl font-semibold text-gray-500"
                  >
                    {course.title}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{course.shortDescription}</p>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>

              <div className="group mt-6 block rounded-md bg-gray-400 px-4 py-3 text-center font-semibold text-white opacity-50 shadow-sm">
                <span className="flex items-center justify-center">
                  Coming Soon
                  <Construction className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* バックエンドコース */}
      <div className="mb-16">
        <div className="mb-8 flex items-center">
          <h2 className="text-2xl font-bold">バックエンド開発</h2>
          <div className="ml-4 h-px flex-grow bg-gray-200"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {backendCourses.map(course => (
            <div
              key={course.slug}
              className={`rounded-3xl border border-gray-200 p-8 transition-all ${
                course.available ? "hover:shadow-lg" : "opacity-70 grayscale"
              }`}
            >
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Devicon
                    slug={course.slug}
                    size="lg"
                    className={
                      course.available ? course.colors.text : "text-gray-500"
                    }
                  />
                  <h2
                    id={`course-${course.slug}`}
                    className={`text-xl font-semibold ${
                      course.available ? course.colors.text : "text-gray-500"
                    }`}
                  >
                    {course.title}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{course.shortDescription}</p>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>

              {course.available ? (
                <Link
                  href={course.topPagePath}
                  aria-describedby={`course-${course.slug}`}
                  className={`group mt-6 block rounded-md ${course.colors.buttonBg} px-4 py-3 text-center font-semibold text-white shadow-sm ${course.colors.buttonHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  <span className="flex items-center justify-center">
                    コースを見る
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ) : (
                <div className="group mt-6 block rounded-md bg-gray-400 px-4 py-3 text-center font-semibold text-white opacity-50 shadow-sm">
                  <span className="flex items-center justify-center">
                    Coming Soon
                    <Construction className="ml-2 h-4 w-4" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* データ分析・AIコース */}
      <div className="mb-16">
        <div className="mb-8 flex items-center">
          <h2 className="text-2xl font-bold">データ分析・AI</h2>
          <div className="ml-4 h-px flex-grow bg-gray-200"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dataAiCourses.map(course => (
            <div
              key={course.slug}
              className={`rounded-3xl border border-gray-200 p-8 transition-all ${
                course.available ? "hover:shadow-lg" : "opacity-70 grayscale"
              }`}
            >
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Devicon
                    slug={course.slug}
                    size="lg"
                    className={
                      course.available ? course.colors.text : "text-gray-500"
                    }
                  />
                  <h2
                    id={`course-${course.slug}`}
                    className={`text-xl font-semibold ${
                      course.available ? course.colors.text : "text-gray-500"
                    }`}
                  >
                    {course.title}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{course.shortDescription}</p>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>

              {course.available ? (
                <Link
                  href={course.topPagePath}
                  aria-describedby={`course-${course.slug}`}
                  className={`group mt-6 block rounded-md ${course.colors.buttonBg} px-4 py-3 text-center font-semibold text-white shadow-sm ${course.colors.buttonHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  <span className="flex items-center justify-center">
                    コースを見る
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ) : (
                <div className="group mt-6 block rounded-md bg-gray-400 px-4 py-3 text-center font-semibold text-white opacity-50 shadow-sm">
                  <span className="flex items-center justify-center">
                    Coming Soon
                    <Construction className="ml-2 h-4 w-4" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* インフラストラクチャコース */}
      <div className="mb-16">
        <div className="mb-8 flex items-center">
          <h2 className="text-2xl font-bold">インフラ・DevOps</h2>
          <div className="ml-4 h-px flex-grow bg-gray-200"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {infrastructureCourses.map(course => (
            <div
              key={course.slug}
              className={`rounded-3xl border border-gray-200 p-8 transition-all ${
                course.available ? "hover:shadow-lg" : "opacity-70 grayscale"
              }`}
            >
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Devicon
                    slug={course.slug}
                    size="lg"
                    className={
                      course.available ? course.colors.text : "text-gray-500"
                    }
                  />
                  <h2
                    id={`course-${course.slug}`}
                    className={`text-xl font-semibold ${
                      course.available ? course.colors.text : "text-gray-500"
                    }`}
                  >
                    {course.title}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{course.shortDescription}</p>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>

              {course.available ? (
                <Link
                  href={course.topPagePath}
                  aria-describedby={`course-${course.slug}`}
                  className={`group mt-6 block rounded-md ${course.colors.buttonBg} px-4 py-3 text-center font-semibold text-white shadow-sm ${course.colors.buttonHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  <span className="flex items-center justify-center">
                    コースを見る
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ) : (
                <div className="group mt-6 block rounded-md bg-gray-400 px-4 py-3 text-center font-semibold text-white opacity-50 shadow-sm">
                  <span className="flex items-center justify-center">
                    Coming Soon
                    <Construction className="ml-2 h-4 w-4" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 基礎・開発ツールコース */}
      <div className="mb-16">
        <div className="mb-8 flex items-center">
          <h2 className="text-2xl font-bold">基礎・開発ツール</h2>
          <div className="ml-4 h-px flex-grow bg-gray-200"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {foundationsCourses.map(course => (
            <div
              key={course.slug}
              className={`rounded-3xl border border-gray-200 p-8 transition-all ${
                course.available ? "hover:shadow-lg" : "opacity-70 grayscale"
              }`}
            >
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Devicon
                    slug={course.slug}
                    size="lg"
                    className={
                      course.available ? course.colors.text : "text-gray-500"
                    }
                  />
                  <h2
                    id={`course-${course.slug}`}
                    className={`text-xl font-semibold ${
                      course.available ? course.colors.text : "text-gray-500"
                    }`}
                  >
                    {course.title}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{course.shortDescription}</p>
              <p className="mt-2 text-sm text-gray-500">{course.description}</p>

              {course.available ? (
                <Link
                  href={course.topPagePath}
                  aria-describedby={`course-${course.slug}`}
                  className={`group mt-6 block rounded-md ${course.colors.buttonBg} px-4 py-3 text-center font-semibold text-white shadow-sm ${course.colors.buttonHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  <span className="flex items-center justify-center">
                    コースを見る
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ) : (
                <div className="group mt-6 block rounded-md bg-gray-400 px-4 py-3 text-center font-semibold text-white opacity-50 shadow-sm">
                  <span className="flex items-center justify-center">
                    Coming Soon
                    <Construction className="ml-2 h-4 w-4" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          定期的に新しいコンテンツを追加しています
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          あなたのスキル向上をサポートする様々なコースをご用意しています。
        </p>
      </div>
    </div>
  )
}
