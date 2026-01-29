'use client'

import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import type { RoadmapCourse, RoadmapNode as RoadmapNodeType } from '@/data/roadmaps'
import { RoadmapNode } from './RoadmapNode'
import { RoadmapEdge } from './RoadmapEdge'

interface RoadmapFlowProps {
  course: RoadmapCourse
  className?: string
}

// 分岐グループを表す型
type FlowItem =
  | { type: 'single'; node: RoadmapNodeType; stepNumber: number }
  | { type: 'branch'; mainNode: RoadmapNodeType; optionalNode: RoadmapNodeType; stepNumber: number }

export function RoadmapFlow({ course, className }: RoadmapFlowProps) {
  // 必須ノードと選択ノードを分離
  const requiredNodes = course.nodes.filter((n) => n.isRequired)
  const optionalNodes = course.nodes.filter((n) => !n.isRequired)

  // フローアイテムを構築（分岐を含む）
  const flowItems: FlowItem[] = []
  const usedOptionalIds = new Set<string>()

  requiredNodes.forEach((requiredNode, index) => {
    const stepNumber = index + 1

    // この必須ノードに関連する選択ノードを探す
    const relatedOptional = optionalNodes.find(
      (optNode) =>
        !usedOptionalIds.has(optNode.id) &&
        course.edges.some(
          (edge) => edge.from === requiredNode.id && edge.to === optNode.id
        )
    )

    if (relatedOptional && index < requiredNodes.length - 1) {
      // 分岐として追加（最後の必須ノード以外）
      usedOptionalIds.add(relatedOptional.id)
      flowItems.push({
        type: 'branch',
        mainNode: requiredNode,
        optionalNode: relatedOptional,
        stepNumber,
      })
    } else {
      // 単独ノードとして追加
      flowItems.push({
        type: 'single',
        node: requiredNode,
        stepNumber,
      })
    }
  })

  // 最後の必須ノードに関連する未使用の選択ノードを追加
  optionalNodes.forEach((optNode) => {
    if (!usedOptionalIds.has(optNode.id)) {
      // 最後の必須ノードの後に分岐として表示
      const lastItem = flowItems[flowItems.length - 1]
      if (lastItem && lastItem.type === 'single') {
        // 最後のアイテムを分岐に変換
        flowItems[flowItems.length - 1] = {
          type: 'branch',
          mainNode: lastItem.node,
          optionalNode: optNode,
          stepNumber: lastItem.stepNumber,
        }
        usedOptionalIds.add(optNode.id)
      }
    }
  })

  return (
    <div className={clsx('relative mx-auto max-w-4xl', className)}>
      {/* ノード */}
      <AnimatePresence mode="wait">
        <motion.div
          key={course.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex flex-col items-center gap-4"
        >
          {flowItems.map((item, index) => (
            <motion.div
              key={item.type === 'single' ? item.node.id : item.mainNode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className="w-full"
            >
              {/* エッジ（最初以外） */}
              {index > 0 && (
                <div className="flex justify-center pb-4">
                  <RoadmapEdge />
                </div>
              )}

              {item.type === 'single' ? (
                // 単独ノード
                <div className="flex justify-center pt-4">
                  <RoadmapNode node={item.node} stepNumber={item.stepNumber} />
                </div>
              ) : (
                // 分岐（メイン + オプション）
                <div className="flex flex-col items-center gap-6 pt-4 lg:flex-row lg:items-start lg:justify-center lg:gap-8">
                  <RoadmapNode node={item.mainNode} stepNumber={item.stepNumber} />
                  <RoadmapNode node={item.optionalNode} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
