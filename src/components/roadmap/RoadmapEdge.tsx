import { clsx } from 'clsx'

interface RoadmapEdgeProps {
  className?: string
  height?: number
}

export function RoadmapEdge({ className, height = 32 }: RoadmapEdgeProps) {
  return (
    <svg
      className={clsx('w-8', className)}
      height={height}
      aria-hidden="true"
    >
      <style>
        {`
          @keyframes flowDown {
            0% { stroke-dashoffset: 12; }
            100% { stroke-dashoffset: 0; }
          }
          .flow-line {
            animation: flowDown 1s linear infinite;
          }
        `}
      </style>
      <line
        x1="16"
        y1="0"
        x2="16"
        y2={height}
        stroke="#e4e4e7"
        strokeWidth="2"
        strokeDasharray="8,4"
        className="flow-line"
      />
    </svg>
  )
}
