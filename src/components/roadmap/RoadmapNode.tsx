"use client"

import type {
  DifficultyLevel,
  RoadmapNode as RoadmapNodeType,
} from "@/data/roadmaps"
import { clsx } from "clsx"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface RoadmapNodeProps {
  node: RoadmapNodeType
}

function DifficultyIcon({ level }: { level: DifficultyLevel }) {
  switch (level) {
    case "beginner":
      return (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )
    case "intermediate":
      return (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      )
    case "intermediate-advanced":
      return (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      )
    case "advanced":
      return (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )
  }
}

const difficultyConfig: Record<
  DifficultyLevel,
  { label: string; className: string }
> = {
  beginner: {
    label: "初級",
    className: "bg-green-50 text-green-700",
  },
  intermediate: {
    label: "中級",
    className: "bg-yellow-50 text-yellow-700",
  },
  "intermediate-advanced": {
    label: "中〜上級",
    className: "bg-orange-50 text-orange-700",
  },
  advanced: {
    label: "上級",
    className: "bg-red-50 text-red-700",
  },
}

export function RoadmapNode({ node }: RoadmapNodeProps) {
  const router = useRouter()
  const difficulty = difficultyConfig[node.difficulty]

  const handleClick = () => {
    const { type, url } = node.link
    if (type === "external" || type === "zenn") {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      router.push(url)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <motion.article
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group w-full cursor-pointer rounded-xl border border-gray-200 bg-white p-5 text-left transition-shadow hover:shadow-md sm:p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <h3 className="mb-2 text-base font-semibold text-gray-950">
        {node.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {node.roadmapDescription}
      </p>

      <div className="flex items-center justify-between">
        <span
          className={clsx(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
            difficulty.className
          )}
        >
          <DifficultyIcon level={node.difficulty} />
          {difficulty.label}
        </span>

        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
          学習を開始する
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
        </span>
      </div>
    </motion.article>
  )
}
