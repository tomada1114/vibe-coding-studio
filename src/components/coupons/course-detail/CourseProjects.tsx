"use client"

import {
  Brain,
  Code2,
  Database,
  Palette,
  Rocket,
  StickyNote,
  Timer,
} from "lucide-react"
import { useRef } from "react"

interface Project {
  title: string
  tech: string
  description: string
}

interface CourseProjectsProps {
  projects: Project[]
}

const projectIcons = [
  Code2,
  Palette,
  Timer,
  StickyNote,
  Brain,
  Rocket,
  Database,
]

export function CourseProjects({ projects }: CourseProjectsProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="bg-white px-4 py-6 sm:rounded-2xl sm:p-6 sm:shadow-sm sm:ring-1 sm:ring-zinc-950/5 lg:p-8"
    >
      <h2 className="mb-4 text-xl font-bold text-zinc-950 sm:mb-6 sm:text-2xl">
        作成する{projects.length > 5 ? "" : projects.length + "つの"}
        プロジェクト
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {projects.map((project, index) => {
          const Icon = projectIcons[index % projectIcons.length]
          return (
            <div
              key={index}
              className="group flex items-start gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-zinc-50 sm:gap-4 sm:p-4"
            >
              {/* アイコン */}
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>

              {/* テキスト部分 */}
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                  <h3 className="font-semibold text-zinc-950">
                    {project.title}
                  </h3>
                  <span className="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
                    {project.tech}
                  </span>
                </div>

                <p className="text-sm text-zinc-600">{project.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:mt-6 sm:p-4">
        <p className="text-sm text-zinc-700">
          <span className="font-semibold">💡 段階的な学習:</span>{" "}
          簡単なプロジェクトから始めて、徐々に複雑な技術へステップアップしていきます。
        </p>
      </div>
    </div>
  )
}
