import { clsx } from "clsx"

interface RoadmapEdgeProps {
  className?: string
}

export function RoadmapEdge({ className }: RoadmapEdgeProps) {
  return (
    <div
      className={clsx("h-8 w-px bg-gray-200", className)}
      aria-hidden="true"
    />
  )
}
