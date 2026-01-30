export function PresetsIcon({ id, color = 'blue' }: { id: string; color?: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-gradient`} cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 21 -21 0 16 7)">
          <stop stopColor={color === 'blue' ? '#0EA5E9' : '#FDE68A'} />
          <stop offset={1} stopColor={color === 'blue' ? '#818CF8' : '#F59E0B'} />
        </radialGradient>
      </defs>
      <g>
        <circle cx={16} cy={16} r={12} fill={`url(#${id}-gradient)`} fillOpacity={0.2} />
        <path d="M8 12h16M8 16h16M8 20h16" stroke="var(--icon-foreground)" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={12} cy={12} r={2} fill="var(--icon-foreground)" />
        <circle cx={20} cy={16} r={2} fill="var(--icon-foreground)" />
        <circle cx={14} cy={20} r={2} fill="var(--icon-foreground)" />
      </g>
    </>
  )
}
