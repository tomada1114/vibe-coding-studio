'use client'

import Image from 'next/image'
import { Button } from '@/components/catalyst/button'
import { TOPIC_INFO } from '@/constants/coupon-courses'
import type { Coupon } from '@/types/coupon'

interface TopicFilterProps {
  coupons: Coupon[]
  selectedTopics: string[]
  onTopicToggle: (topic: string) => void
  onClearFilter: () => void
}

export function TopicFilter({
  coupons,
  selectedTopics,
  onTopicToggle,
  onClearFilter,
}: TopicFilterProps) {
  // フィルタに表示するトピックを定義（固定）
  const FILTER_TOPICS = [
    'claude-code',
    'codex',
    'python',
    'expo',
    'react-native',
    'nextjs',
    'kiro',
    'rails',
    'react',
  ]

  // 実際に使用されているトピックのみをフィルタリング
  const usedTopics = new Set<string>()
  coupons.forEach(coupon => {
    coupon.courseInfo.topics.forEach(topic => {
      usedTopics.add(topic)
    })
  })

  // 定義されたトピックの中で、実際に使用されているものだけを表示
  const availableTopics = FILTER_TOPICS.filter(topic => usedTopics.has(topic))

  return (
    <div className="mb-12 rounded-2xl border border-zinc-950/5 bg-white p-8 shadow-sm backdrop-blur-sm">
      <h3 className="mb-6 text-xl font-semibold text-zinc-950">技術スタックでフィルタ</h3>

      <div className="flex flex-wrap gap-4">
        {availableTopics.map(topic => {
          const topicInfo = TOPIC_INFO[topic]
          if (!topicInfo) return null // トピック情報が見つからない場合はスキップ
          const isSelected = selectedTopics.includes(topic)

          return (
            <button
              key={topic}
              onClick={() => onTopicToggle(topic)}
              className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-3 transition-all duration-300 ease-out ${
                isSelected
                  ? 'scale-105 border-blue-500/30 bg-blue-50/80 shadow-lg ring-1 shadow-blue-500/10 ring-blue-500/20'
                  : 'border-zinc-950/10 bg-white hover:scale-105 hover:border-zinc-950/20 hover:bg-zinc-50/80 hover:shadow-md'
              }`}
              aria-pressed={isSelected}
              aria-label={`${topicInfo.name}でフィルタ${isSelected ? '（選択中）' : ''}`}
            >
              {topicInfo.isLocal ? (
                <Image
                  src={topicInfo.icon}
                  alt={topicInfo.name}
                  width={24}
                  height={24}
                  className="object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <Image
                  src={topicInfo.icon}
                  alt={topicInfo.name}
                  width={24}
                  height={24}
                  className="object-contain"
                  loading="lazy"
                  decoding="async"
                  unoptimized
                />
              )}
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  isSelected ? 'text-blue-700' : 'text-zinc-700 group-hover:text-zinc-900'
                }`}
              >
                {topicInfo.name}
              </span>
            </button>
          )
        })}

        {selectedTopics.length > 0 && (
          <Button
            onClick={onClearFilter}
            outline
            className="ml-auto flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium transition-all duration-200 hover:bg-zinc-50"
          >
            フィルタをクリア
          </Button>
        )}
      </div>

      {selectedTopics.length > 0 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <span>「{TOPIC_INFO[selectedTopics[0]]?.name}」でフィルタされています</span>
        </div>
      )}
    </div>
  )
}
