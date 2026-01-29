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

export function RoadmapFlow({ course, className }: RoadmapFlowProps) {
  return (
    <div className={clsx('relative mx-auto max-w-4xl', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={course.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex flex-col items-center gap-4"
        >
          {course.nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className="w-full"
            >
              {index > 0 && (
                <div className="flex justify-center pb-4">
                  <RoadmapEdge />
                </div>
              )}

              <div className="flex justify-center pt-4">
                <RoadmapNode node={node} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
