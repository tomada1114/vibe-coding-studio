"use client"

import { TOPIC_INFO } from "@/constants/coupon-courses"

interface TechStackBadgesProps {
  topics: string[]
}

export function TechStackBadges({ topics }: TechStackBadgesProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {topics.map(topic => {
        const info = TOPIC_INFO[topic]
        return (
          <div
            key={topic}
            className="flex items-center gap-2 rounded-lg border border-zinc-950/10 bg-zinc-50 px-3 py-2 transition-colors hover:border-zinc-950/20 hover:bg-zinc-100"
          >
            <span className="text-xs text-zinc-700">{info.name}</span>
          </div>
        )
      })}
    </div>
  )
}
