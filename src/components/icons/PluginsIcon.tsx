export function PluginsIcon({
  id,
  color = "blue",
}: {
  id: string
  color?: string
}) {
  return (
    <>
      <defs>
        <radialGradient
          id={`${id}-gradient`}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 7)"
        >
          <stop stopColor={color === "blue" ? "#0EA5E9" : "#FDE68A"} />
          <stop
            offset={1}
            stopColor={color === "blue" ? "#818CF8" : "#F59E0B"}
          />
        </radialGradient>
      </defs>
      <g>
        <circle
          cx={16}
          cy={16}
          r={12}
          fill={`url(#${id}-gradient)`}
          fillOpacity={0.2}
        />
        <rect
          x={8}
          y={8}
          width={7}
          height={7}
          rx={1}
          stroke="var(--icon-foreground)"
          strokeWidth={1.5}
          fill="none"
        />
        <rect
          x={17}
          y={8}
          width={7}
          height={7}
          rx={1}
          stroke="var(--icon-foreground)"
          strokeWidth={1.5}
          fill="none"
        />
        <rect
          x={8}
          y={17}
          width={7}
          height={7}
          rx={1}
          stroke="var(--icon-foreground)"
          strokeWidth={1.5}
          fill="none"
        />
        <rect
          x={17}
          y={17}
          width={7}
          height={7}
          rx={1}
          stroke="var(--icon-foreground)"
          strokeWidth={1.5}
          fill="none"
        />
      </g>
    </>
  )
}
