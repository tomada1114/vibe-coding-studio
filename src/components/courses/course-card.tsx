import { UDEMY_COURSE_TOPICS } from "@/data/udemy-courses/topics"
import type { UdemyCourse } from "@/types/udemy-course"
import Image from "next/image"

const topicNames = new Map(
  UDEMY_COURSE_TOPICS.map(topic => [topic.slug, topic.name])
)

export function CourseCard({
  course,
  topicsLabel,
}: {
  course: UdemyCourse
  topicsLabel?: string
}) {
  return (
    <article className="gg-cell gg-cell-hover">
      <a
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={640}
          height={360}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 560px"
          className="aspect-video w-full rounded-[6px] border border-border object-cover"
        />

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="gg-label">Course</p>
          <span aria-hidden="true" className="text-sm text-text-secondary">
            ↗
          </span>
        </div>

        <h2 className="mt-3 text-[20px] leading-[1.45] font-medium text-text-primary">
          {course.title}
        </h2>
        <p className="mt-3 text-[14px] gg-prose-ja text-text-secondary">
          {course.description}
        </p>

        <ul aria-label={topicsLabel} className="mt-5 flex flex-wrap gap-2">
          {course.topics.map(topic => (
            <li key={topic} className="gg-tag">
              {topicNames.get(topic) ?? topic}
            </li>
          ))}
        </ul>
      </a>
    </article>
  )
}
