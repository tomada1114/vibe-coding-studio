import clsx from 'clsx'

export function Prose<T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: React.ComponentPropsWithoutRef<T> & {
  as?: T
}) {
  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        className,
        'prose max-w-none prose-zinc',
        // headings - SWELL風スタイル
        'prose-headings:scroll-mt-28 prose-headings:font-bold prose-headings:text-zinc-950 lg:prose-headings:scroll-mt-[8.5rem]',
        // h1
        'prose-h1:mt-0 prose-h1:mb-8 prose-h1:text-4xl prose-h1:first:mt-0',
        // h2 - sky系統の背景
        'prose-h2:mt-16 prose-h2:mb-8 prose-h2:bg-sky-100 prose-h2:px-6 prose-h2:py-4 prose-h2:text-3xl prose-h2:first:mt-0',
        // h3 - 下線スタイル
        'prose-h3:mt-12 prose-h3:mb-4 prose-h3:border-b-2 prose-h3:border-sky-600 prose-h3:pb-3 prose-h3:text-2xl prose-h3:first:mt-0',
        // h4 - 左側にsky色のボーダー
        'prose-h4:mt-10 prose-h4:mb-3 prose-h4:border-l-4 prose-h4:border-sky-400 prose-h4:pl-4 prose-h4:text-xl prose-h4:first:mt-0',
        // h5
        'prose-h5:mt-8 prose-h5:mb-2 prose-h5:text-lg prose-h5:first:mt-0',
        // h6
        'prose-h6:mt-6 prose-h6:mb-2 prose-h6:text-base prose-h6:first:mt-0',
        // paragraph
        'prose-p:mb-6 prose-p:text-base prose-p:leading-loose prose-p:text-zinc-700',
        // lead
        'prose-lead:text-zinc-700',
        // links
        'prose-a:font-medium prose-a:text-sky-600 prose-a:underline prose-a:decoration-1 prose-a:underline-offset-2 prose-a:transition-all prose-a:hover:text-sky-700 prose-a:hover:decoration-2',
        // lists
        'prose-ul:mb-6 prose-ul:space-y-2 prose-ul:text-zinc-700',
        'prose-ol:mb-6 prose-ol:space-y-2 prose-ol:text-zinc-700',
        'prose-li:ml-2 prose-li:leading-relaxed sm:prose-li:ml-4',
        // strong
        'prose-strong:font-bold prose-strong:text-zinc-950',
        // emphasis
        'prose-em:text-zinc-800 prose-em:italic',
        // blockquote
        'prose-blockquote:my-8 prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 prose-blockquote:bg-zinc-50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:pl-6 prose-blockquote:text-zinc-700 prose-blockquote:italic',
        // pre
        'prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
        // table
        'prose-table:my-8 prose-table:w-auto prose-table:min-w-0 prose-table:border-collapse prose-table:border prose-table:border-zinc-200',
        'prose-th:border prose-th:border-zinc-200 prose-th:bg-zinc-50 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-medium prose-th:text-zinc-950',
        'prose-td:border prose-td:border-zinc-200 prose-td:px-4 prose-td:py-2 prose-td:text-zinc-700',
        // hr
        'prose-hr:my-12 prose-hr:border-t prose-hr:border-zinc-200',
        // images
        'prose-img:mx-auto prose-img:my-8 prose-img:h-auto prose-img:max-w-full prose-img:rounded-lg prose-img:border prose-img:border-zinc-200 prose-img:shadow-md'
      )}
      {...props}
    />
  )
}
