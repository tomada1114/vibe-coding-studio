'use client'

import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import type { RoadmapCourse } from '@/data/roadmaps'
import { RoadmapNode } from './RoadmapNode'
import { RoadmapEdge } from './RoadmapEdge'

interface RoadmapFlowProps {
  course: RoadmapCourse
  className?: string
}

function StartMarker() {
  return (
    <div className="flex flex-col items-center gap-1.5 pb-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
        <svg
          className="h-4 w-4 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <span className="text-xs font-medium text-zinc-500">スタート</span>
    </div>
  )
}

function GoalMarker() {
  return (
    <div className="flex flex-col items-center gap-1.5 pt-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-pink-400 to-purple-500 shadow-lg shadow-purple-500/25">
        <span className="text-lg" aria-hidden="true">
          🎯
        </span>
      </div>
      <span className="bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-xs font-bold text-transparent">
        目標達成！
      </span>
    </div>
  )
}

export function RoadmapFlow({ course, className }: RoadmapFlowProps) {
  return (
    <div className={clsx('relative mx-auto max-w-4xl', className)}>
      <div className="pointer-events-none absolute inset-x-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-200 via-pink-200 to-purple-200 opacity-40" />

      <AnimatePresence mode="wait">
        <motion.div
          key={course.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex flex-col items-center gap-2"
        >
          <StartMarker />

          {course.nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: index * 0.1,
              }}
              className="w-full"
            >
              {index > 0 && (
                <div className="flex justify-center pb-2">
                  <RoadmapEdge />
                </div>
              )}

              <div className="flex justify-center pt-2">
                <RoadmapNode node={node} />
              </div>
            </motion.div>
          ))}

          {course.nodes.length > 0 && (
            <>
              <div className="flex justify-center py-2">
                <RoadmapEdge />
              </div>
              <GoalMarker />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
