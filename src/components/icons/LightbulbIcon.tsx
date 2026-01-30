export function LightbulbIcon({
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
          gradientTransform="matrix(0 21 -21 0 20 11)"
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
          cy={14}
          r={10}
          fill={`url(#${id}-gradient)`}
          fillOpacity={0.2}
        />
        <path
          d="M12 24h8M13 27h6M16 4a8 8 0 00-5 14.24V21a1 1 0 001 1h8a1 1 0 001-1v-2.76A8 8 0 0016 4z"
          stroke="var(--icon-foreground)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </>
  )
}
