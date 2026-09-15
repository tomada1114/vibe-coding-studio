import { CouponPageLayout } from "@/components/coupons/CouponPageLayout"
import { getLatestCoupons, getMaxDiscountRate } from "@/lib/coupons/coupon-data"
import { ChevronRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

// 静的生成 + ISR（1時間ごとに再生成）
export const dynamic = "force-static"
export const revalidate = 3600

// 動的メタデータ生成（サーバー側で生成）
export async function generateMetadata(): Promise<Metadata> {
  const coupons = getLatestCoupons()
  const maxDiscountRate = getMaxDiscountRate(coupons)

  // 現在の年月を取得（SSG時に決定）
  const metadataDate = new Date()
  const year = metadataDate.getFullYear()
  const month = metadataDate.getMonth() + 1

  const title = `【${year}年${month}月】当サイト限定！オリジナルUdemy講座の特別割引クーポン一覧`
  const description = `Vibe Coding Studio限定の特別価格でUdemy講座を受講できます。最大${maxDiscountRate}%OFFのクーポンを配布中。AI開発、React、Next.js、Ruby on Rails、RSpecなど実践的な技術を学べる講座が勢揃い。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "/coupons",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: "/coupons",
    },
  }
}

export default function CouponsPage() {
  const coupons = getLatestCoupons()
  const maxDiscountRate = getMaxDiscountRate(coupons)

  // 現在の年月を取得（SSG時に決定、Hydration Error防止）
  const pageDate = new Date()
  const year = pageDate.getFullYear()
  const month = pageDate.getMonth() + 1

  // 構造化データの生成（サーバー側で生成）
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `【${year}年${month}月】当サイト限定！オリジナルUdemy講座の特別割引クーポン一覧`,
    description: `Vibe Coding Studio限定の特別価格でUdemy講座を受講できます。最大${maxDiscountRate}%OFFのクーポンを配布中。`,
    itemListElement: coupons.map((coupon, index) => ({
      "@type": "Course",
      position: index + 1,
      name: coupon.courseInfo.title,
      description: coupon.courseInfo.description,
      provider: {
        "@type": "Organization",
        name: "Udemy",
        sameAs: "https://www.udemy.com",
      },
      offers: {
        "@type": "Offer",
        price: coupon.discountPrice,
        priceCurrency: "JPY",
        url: coupon.courseCouponUrl,
        priceValidUntil: coupon.endDateTime.toISOString().split("T")[0],
        availability: "https://schema.org/InStock",
      },
    })),
  }

  return (
    <div className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* メインコンテンツ */}
      <main id="main-content" className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* パンくずリスト */}
          <nav className="mb-10" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-500 transition-colors duration-200 hover:text-zinc-700"
                >
                  ホーム
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mx-2 h-4 w-4 text-zinc-400" />
                <span className="font-medium text-zinc-950">クーポン</span>
              </li>
            </ol>
          </nav>

          {/* ヘッダーセクション */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-700/10">
                <span className="text-xs">🎆</span>
                {year}年{month}月 特別オファー
              </div>
              <h1 className="mb-6 text-4xl leading-tight font-bold text-zinc-950 sm:text-5xl lg:text-6xl">
                当サイト限定！
                <br className="sm:hidden" />
                <span className="text-zinc-950">Udemy講座特別クーポン</span>
              </h1>
            </div>

            <div className="mx-auto max-w-4xl text-center">
              <p className="text-lg leading-relaxed text-zinc-600 sm:text-xl">
                Vibe Coding Studioでは、著者が作成したUdemy講座を
                <span className="mx-1 inline-flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1 text-base font-semibold text-red-700">
                  最大{maxDiscountRate}%OFF
                </span>
                の特別価格で提供しています
              </p>
              <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">
                AI開発、React、Next.js、Ruby on Rails、RSpecなど
                <br className="hidden sm:inline" />
                実践的な技術を基礎から学べる講座を揃えました
              </p>
            </div>
          </div>

          {/* クーポン一覧 */}
          <CouponPageLayout coupons={coupons} />
        </div>
      </main>
    </div>
  )
}
