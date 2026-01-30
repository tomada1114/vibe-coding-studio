export function HeroBackground({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1026 1026"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx={513}
        cy={513}
        r={513}
        fill="url(#hero-gradient)"
        fillOpacity="0.15"
      />
      <circle
        cx={513}
        cy={513}
        r={400}
        fill="url(#hero-gradient-2)"
        fillOpacity="0.1"
      />
      <defs>
        <radialGradient
          id="hero-gradient"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(513 513) rotate(90) scale(513)"
        >
          <stop stopColor="#3B82F6" />
          <stop offset={1} stopColor="#3B82F6" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id="hero-gradient-2"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(513 513) rotate(90) scale(400)"
        >
          <stop stopColor="#60A5FA" />
          <stop offset={1} stopColor="#60A5FA" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  )
}
