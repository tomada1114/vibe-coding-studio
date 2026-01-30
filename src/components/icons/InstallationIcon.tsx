export function InstallationIcon({
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
        <path
          d="M16 8v10m0 0l-4-4m4 4l4-4"
          stroke="var(--icon-foreground)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 22h12"
          stroke="var(--icon-foreground)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </g>
    </>
  )
}
