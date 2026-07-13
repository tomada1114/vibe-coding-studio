import * as Headless from "@headlessui/react"
import { clsx } from "clsx"
import { Link } from "./link"

const baseClasses = clsx(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  "data-disabled:pointer-events-none data-disabled:opacity-40"
)

const variants = {
  primary: clsx(
    "rounded-full border border-transparent bg-gray-950 shadow-md text-white",
    "data-disabled:bg-gray-950 data-hover:bg-gray-800",
    "data-hover:shadow-[0_1px_0_0] data-hover:shadow-spectrum-violet"
  ),
  secondary: clsx(
    "rounded-full border border-transparent bg-white ring-1 ring-gray-300 text-gray-950",
    "data-disabled:bg-white data-hover:ring-gray-400"
  ),
  outline: clsx(
    "rounded-lg border border-transparent text-gray-950 shadow-sm ring-1 ring-black/10",
    "data-disabled:bg-transparent data-hover:bg-gray-50"
  ),
} as const

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
}

type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
)

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  className = clsx(baseClasses, variants[variant], sizes[size], className)

  if (typeof props.href === "undefined") {
    return <Headless.Button {...props} className={className} />
  }

  return <Link {...props} className={className} />
}
