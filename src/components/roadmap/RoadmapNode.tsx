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

const difficultyConfig: Record<
  DifficultyLevel,
  { label: string; className: string; gradient: string; icon: string }
> = {
  beginner: {
    label: "初級",
    className: "bg-green-50 text-green-700",
    gradient: "from-green-400 to-emerald-500",
    icon: "🌱",
  },
  intermediate: {
    label: "中級",
    className: "bg-yellow-50 text-yellow-700",
    gradient: "from-yellow-400 to-amber-500",
    icon: "📈",
  },
  "intermediate-advanced": {
    label: "中〜上級",
    className: "bg-orange-50 text-orange-700",
    gradient: "from-orange-400 to-red-400",
    icon: "🔥",
  },
  advanced: {
    label: "上級",
    className: "bg-red-50 text-red-700",
    gradient: "from-red-500 to-rose-600",
    icon: "⭐",
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
      className="group relative w-full max-w-md cursor-pointer overflow-hidden rounded-2xl border border-zinc-950/5 bg-white shadow-sm"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div
        className={clsx("h-1 w-full bg-gradient-to-r", difficulty.gradient)}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative p-6 sm:p-8">
        <h3 className="mb-3 text-center text-lg font-semibold text-zinc-950 transition-colors group-hover:text-blue-600">
          {node.title}
        </h3>

        <p className="mb-4 text-center text-sm leading-relaxed text-zinc-600">
          {node.roadmapDescription}
        </p>

        <div className="flex justify-center gap-2">
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-current/10 ring-inset",
              difficulty.className
            )}
          >
            <span aria-hidden="true">{difficulty.icon}</span>
            {difficulty.label}
          </span>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all group-hover:bg-blue-700 group-hover:shadow-md">
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
          </div>
        </div>
      </div>
    </motion.article>
  )
}
