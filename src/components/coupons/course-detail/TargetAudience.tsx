'use client'

import { useRef } from 'react'
import { User, Briefcase, Rocket, Target } from 'lucide-react'

interface Audience {
  title: string
  points: string[]
}

interface TargetAudienceProps {
  audiences: Audience[]
}

const audienceIcons = [User, Target, Briefcase, Rocket]

export function TargetAudience({ audiences }: TargetAudienceProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="bg-white px-4 py-6 sm:rounded-2xl sm:p-8 sm:shadow-sm sm:ring-1 sm:ring-zinc-950/5"
    >
      <h2 className="mb-6 text-xl font-bold text-zinc-950 sm:mb-8 sm:text-2xl">
        こんな方におすすめ
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {audiences.map((audience, index) => {
          const Icon = audienceIcons[index % audienceIcons.length]
          return (
            <div
              key={index}
              className="rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-lg sm:p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-zinc-950">{audience.title}</h3>
              </div>

              <ul className="space-y-2">
                {audience.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-2 text-sm text-zinc-600">
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
