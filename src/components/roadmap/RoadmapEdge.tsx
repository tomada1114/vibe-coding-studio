import { clsx } from "clsx"

interface RoadmapEdgeProps {
  className?: string
  height?: number
}

export function RoadmapEdge({ className, height = 32 }: RoadmapEdgeProps) {
  const gradientId = `edge-gradient-${Math.random().toString(36).slice(2, 8)}`

  return (
    <svg className={clsx("w-8", className)} height={height} aria-hidden="true">
      <style>
        {`
          @keyframes flowDown {
            0% { stroke-dashoffset: 12; }
            100% { stroke-dashoffset: 0; }
          }
          .flow-line {
            animation: flowDown 1s linear infinite;
          }
          @keyframes pulseDown {
            0% { opacity: 0; transform: translateY(0); }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; transform: translateY(${height}px); }
          }
          .pulse-dot {
            animation: pulseDown 2.5s ease-in-out infinite;
          }
        `}
      </style>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff1be" />
          <stop offset="50%" stopColor="#ee87cb" />
          <stop offset="100%" stopColor="#b060ff" />
        </linearGradient>
      </defs>
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
      <line
        x1="16"
        y1="0"
        x2="16"
        y2={height}
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle
        cx="16"
        cy="0"
        r="3"
        fill={`url(#${gradientId})`}
        className="pulse-dot"
      />
    </svg>
  )
}
