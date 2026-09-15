import { DocsMobileMenu } from "@/components/docs/DocsMobileMenu"
import { DocsSidebar } from "@/components/docs/DocsSidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden">
      <DocsMobileMenu />

      <main id="main-content">
        <div className="max-w-8xl relative mx-auto flex justify-center sm:px-2 lg:px-8 xl:px-12">
          <DocsSidebar />
          <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
