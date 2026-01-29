import { clsx } from 'clsx'

interface RoadmapLegendProps {
  className?: string
}

export function RoadmapLegend({ className }: RoadmapLegendProps) {
  return (
    <div
      className={clsx(
        'flex justify-center gap-8 border-t border-zinc-200 pt-8',
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm text-zinc-600">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
          1
        </div>
        <span>必須講座</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-zinc-600">
        <div className="h-5 w-8 rounded border-2 border-dashed border-zinc-300"></div>
        <span>選択講座</span>
      </div>
    </div>
  )
}
