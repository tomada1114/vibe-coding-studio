export function WarningIcon({ id, color = 'amber' }: { id: string; color?: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-gradient`} cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 21 -21 0 16 7)">
          <stop stopColor={color === 'amber' ? '#FDE68A' : '#0EA5E9'} />
          <stop offset={1} stopColor={color === 'amber' ? '#F59E0B' : '#818CF8'} />
        </radialGradient>
      </defs>
      <g>
        <circle cx={16} cy={16} r={12} fill={`url(#${id}-gradient)`} fillOpacity={0.2} />
        <path d="M16 6l12 20H4L16 6z" stroke="var(--icon-foreground)" strokeWidth={1.5} strokeLinejoin="round" fill="none" />
        <path d="M16 14v4" stroke="var(--icon-foreground)" strokeWidth={2} strokeLinecap="round" />
        <circle cx={16} cy={22} r={1} fill="var(--icon-foreground)" />
      </g>
    </>
  )
}
