import { clsx } from "clsx"

/**
 * スペクトラムビーム
 *
 * ロゴ5色（橙→マゼンタ→紫→青→ティール）のグラデーション線。
 * サイトの唯一のシグネチャ装飾として、ページトップ・eyebrow・
 * ナビ下線・カード上辺などの「線」にのみ使用する（面では使わない）。
 */
export function SpectrumBeam({
  className,
  animated = false,
}: {
  className?: string
  animated?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "block h-0.5 w-full bg-(image:--gradient-spectrum)",
        animated && "origin-left animate-beam-draw motion-reduce:animate-none",
        className
      )}
    />
  )
}
