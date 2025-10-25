"use client"

import { TOPIC_INFO } from "@/constants/coupon-courses"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CourseDetailHeroProps {
  title: string
  subtitle: string
  topics: string[]
  slug?: string
}

export function CourseDetailHero({
  title,
  subtitle,
  topics,
  slug,
}: CourseDetailHeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
      {/* 背景パターン */}
      <div className="bg-grid-white/[0.05] absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* 戻るリンク */}
        <Link
          href="/coupons"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white sm:mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>クーポン一覧へ戻る</span>
        </Link>

        {/* メインコンテンツ */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl lg:text-4xl">
              {title}
            </h1>

            <p className="mb-6 text-base text-white/90 sm:mb-8 sm:text-lg lg:text-xl">
              {subtitle}
            </p>

            {/* 技術バッジ */}
            <div className="flex flex-wrap items-center gap-3">
              {topics.map(topic => {
                const info = TOPIC_INFO[topic]
                return (
                  <div
                    key={topic}
                    className="rounded-full bg-white px-4 py-2 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="text-sm font-medium text-zinc-900">
                      {info.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* コースサムネイル画像 */}
          {slug && (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 lg:rotate-2 lg:hover:rotate-0">
              <Image
                src={`/images/udemy/${slug}.png`}
                alt={title}
                width={640}
                height={360}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
