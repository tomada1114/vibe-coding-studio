export function ThemingIcon({
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
        <circle
          cx={16}
          cy={16}
          r={8}
          stroke="var(--icon-foreground)"
          strokeWidth={1.5}
          fill="none"
        />
        <path d="M16 8v16" stroke="var(--icon-foreground)" strokeWidth={1.5} />
        <path
          d="M16 8a8 8 0 010 16"
          fill="var(--icon-foreground)"
          fillOpacity={0.3}
        />
      </g>
    </>
  )
}
