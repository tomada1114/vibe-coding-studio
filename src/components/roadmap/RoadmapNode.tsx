'use client'

import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import type { RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'

interface RoadmapNodeProps {
  node: RoadmapNodeType
}

const difficultyConfig = {
  beginner: { label: '初級', className: 'bg-green-50 text-green-700' },
  intermediate: { label: '中級', className: 'bg-yellow-50 text-yellow-700' },
  'intermediate-advanced': {
    label: '中〜上級',
    className: 'bg-orange-50 text-orange-700',
  },
  advanced: { label: '上級', className: 'bg-red-50 text-red-700' },
}

export function RoadmapNode({ node }: RoadmapNodeProps) {
  const router = useRouter()
  const difficulty = difficultyConfig[node.difficulty]

  const handleClick = () => {
    const { type, url } = node.link
    if (type === 'external' || type === 'zenn') {
      window.open(url, '_blank')
    } else {
      router.push(url)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <article
      role="article"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative w-full max-w-md cursor-pointer overflow-hidden rounded-2xl border border-zinc-950/5 bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-950/10"
    >
      <div className="p-6 sm:p-8">
        <h3 className="mb-3 text-center text-lg font-semibold text-zinc-950 transition-colors group-hover:text-blue-600">
          {node.title}
        </h3>

        <p className="mb-4 text-center text-sm leading-relaxed text-zinc-600">
          {node.roadmapDescription}
        </p>

        <div className="flex justify-center gap-2">
          <span
            className={clsx(
              'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium',
              difficulty.className
            )}
          >
            {difficulty.label}
          </span>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-all group-hover:gap-2">
            学習を開始する
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </article>
  )
}
