import { clsx } from "clsx"
import { Link } from "./link"

type HeadingProps = {
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  dark?: boolean
} & React.ComponentPropsWithoutRef<
  "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>

export function Heading({
  className,
  as: Element = "h2",
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl"
      )}
    />
  )
}

export function Subheading({
  className,
  as: Element = "h2",
  children,
  ...props
}: Omit<HeadingProps, "dark">) {
  return (
    <Element
      {...props}
      className={clsx(
        className,
        "flex items-center gap-2 font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase"
      )}
    >
      <span
        aria-hidden="true"
        className="h-0.5 w-3 shrink-0 bg-(image:--gradient-spectrum)"
      />
      {children}
    </Element>
  )
}

export function Lead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={clsx(className, "text-2xl font-medium text-gray-500")}
      {...props}
    />
  )
}

// Catalyst Text Components

export function Text({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="text"
      {...props}
      className={clsx(
        className,
        "text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400"
      )}
    />
  )
}

export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        "text-zinc-950 underline decoration-zinc-950/50 data-hover:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white"
      )}
    />
  )
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      {...props}
      className={clsx(className, "font-medium text-zinc-950 dark:text-white")}
    />
  )
}

export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        "rounded-sm border border-zinc-950/10 bg-zinc-950/2.5 px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white"
      )}
    />
  )
}
