"use client"

import type { RoadmapCourse } from "@/data/roadmaps"
import { clsx } from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { RoadmapEdge } from "./RoadmapEdge"
import { RoadmapNode } from "./RoadmapNode"

interface RoadmapFlowProps {
  course: RoadmapCourse
  className?: string
}

export function RoadmapFlow({ course, className }: RoadmapFlowProps) {
  return (
    <div className={clsx("mx-auto max-w-2xl", className)}>
      <AnimatePresence mode="wait">
        <motion.ol
          key={course.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative space-y-0"
        >
          {course.nodes.map((node, index) => (
            <motion.li
              key={node.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                delay: index * 0.08,
              }}
              className="relative flex gap-6"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-sm font-semibold text-gray-950">
                  {index + 1}
                </div>
                {index < course.nodes.length - 1 && (
                  <div className="flex flex-1 justify-center py-1">
                    <RoadmapEdge />
                  </div>
                )}
              </div>

              <div
                className={clsx(
                  "flex-1 pb-8",
                  index === course.nodes.length - 1 && "pb-0"
                )}
              >
                <RoadmapNode node={node} />
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  )
}
