"use client"

import type {
  DifficultyLevel,
  RoadmapNode as RoadmapNodeType,
} from "@/data/roadmaps"
import {
  ArrowTrendingUpIcon,
  ChevronRightIcon,
  FireIcon,
  StarIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface RoadmapNodeProps {
  node: RoadmapNodeType
}

const difficultyIcons: Record<
  DifficultyLevel,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  beginner: SunIcon,
  intermediate: ArrowTrendingUpIcon,
  "intermediate-advanced": FireIcon,
  advanced: StarIcon,
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
          {(() => {
            const Icon = difficultyIcons[node.difficulty]
            return <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          })()}
          {difficulty.label}
        </span>

        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
          学習を開始する
          <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.article>
  )
}
