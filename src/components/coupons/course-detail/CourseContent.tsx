"use client"

import { useRef } from "react"

interface CourseContentProps {
  description: string
}

export function CourseContent({ description }: CourseContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  const paragraphs = description.split("\n").filter(p => p.trim())

  return (
    <div
      ref={ref}
      className="bg-white px-4 py-6 sm:rounded-2xl sm:p-8 sm:shadow-sm sm:ring-1 sm:ring-zinc-950/5"
    >
      <h2 className="mb-4 text-xl font-bold text-zinc-950 sm:mb-6 sm:text-2xl">
        このような悩みを解決します
      </h2>

      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-zinc-700">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
