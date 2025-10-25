"use client"

import { CheckCircle, Sparkles, Users, Zap } from "lucide-react"
import { useRef } from "react"

interface Feature {
  title: string
  description: string
}

interface CourseFeaturesProps {
  features: Feature[]
}

const icons = [Sparkles, Zap, CheckCircle, Users]

export function CourseFeatures({ features }: CourseFeaturesProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-6 sm:rounded-2xl sm:p-8"
    >
      <h2 className="mb-6 text-center text-xl font-bold text-zinc-950 sm:mb-8 sm:text-2xl">
        講座の特徴
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {features.map((feature, index) => {
          const Icon = icons[index % icons.length]
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-6"
            >
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/10 transition-transform group-hover:scale-150" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-zinc-950">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-zinc-600">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
