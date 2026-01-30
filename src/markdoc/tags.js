import { Callout } from "@/components/Callout"
import { QuickLink, QuickLinks } from "@/components/QuickLinks"
import Image from "next/image"

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: "note",
        matches: ["note", "warning"],
        errorLevel: "critical",
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = "", caption }) => {
      // 相対パスの場合は絶対パスに変換
      const imageSrc = src?.startsWith("/") ? src : `/img/${src}`

      return (
        <figure>
          <Image
            src={imageSrc}
            alt={alt}
            width={800}
            height={600}
            className="h-auto w-full rounded-lg shadow-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            loading="lazy"
          />
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  "quick-links": {
    render: QuickLinks,
  },
  "quick-link": {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
}

export default tags
