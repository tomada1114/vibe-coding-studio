'use client'

import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import type { RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'

interface RoadmapNodeProps {
  node: RoadmapNodeType
  stepNumber?: number
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

const categoryConfig = {
  intro: {
    emoji: '📘',
    label: '入門講座',
    className: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10',
  },
  basic: {
    emoji: '📗',
    label: '基礎講座',
    className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-700/10',
  },
  practice: {
    emoji: '📙',
    label: '実践講座',
    className: 'bg-violet-50 text-violet-700 ring-1 ring-violet-700/10',
  },
  advanced: {
    emoji: '🎯',
    label: '上級講座',
    className: 'bg-red-50 text-red-700 ring-1 ring-red-700/10',
  },
  optional: {
    emoji: '⚡',
    label: '選択講座',
    className: 'bg-teal-50 text-teal-700 ring-1 ring-teal-700/10',
  },
}

export function RoadmapNode({ node, stepNumber }: RoadmapNodeProps) {
  const router = useRouter()
  const difficulty = difficultyConfig[node.difficulty]
  const category = categoryConfig[node.category]
  const isRequired = node.isRequired

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

  if (!isRequired) {
    // Optional node style
    return (
      <article
        role="article"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="group relative w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-zinc-400 hover:shadow-lg"
      >
        <div className="absolute right-3 top-3">
          <span className="inline-flex items-center rounded-md bg-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
            選択
          </span>
        </div>

        <div className="p-5 pt-6">
          <div className="mb-3 text-center">
            <span
              className={clsx(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                category.className
              )}
            >
              <span>{category.emoji}</span> {category.label}
            </span>
          </div>

          <h3 className="mb-2 text-center text-base font-semibold text-zinc-950 transition-colors group-hover:text-blue-600">
            {node.title}
          </h3>

          <p className="mb-3 text-center text-xs leading-relaxed text-zinc-500">
            {node.description}
          </p>

          <div className="flex justify-center">
            <span
              className={clsx(
                'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium',
                difficulty.className
              )}
            >
              {difficulty.label}
            </span>
          </div>
        </div>
      </article>
    )
  }

  // Required node style
  return (
    <article
      role="article"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative w-full max-w-md cursor-pointer overflow-hidden rounded-2xl border border-zinc-950/5 bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-950/10"
    >
      {stepNumber && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-lg ring-4 ring-white">
            {stepNumber}
          </div>
        </div>
      )}

      <div className="p-6 pt-8 sm:p-8 sm:pt-10">
        <div className="mb-3 text-center">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
              category.className
            )}
          >
            <span>{category.emoji}</span> {category.label}
          </span>
        </div>

        <h3 className="mb-3 text-center text-lg font-semibold text-zinc-950 transition-colors group-hover:text-blue-600">
          {node.title}
        </h3>

        <p className="mb-4 text-center text-sm leading-relaxed text-zinc-600">
          {node.description}
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
            クーポンを見る
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
