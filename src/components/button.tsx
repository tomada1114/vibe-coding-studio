import * as Headless from "@headlessui/react"
import { clsx } from "clsx"
import { Link } from "./link"

const baseClasses = clsx(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors",
  "data-disabled:pointer-events-none data-disabled:opacity-40"
)

const variants = {
  primary: clsx(
    "rounded-full border border-transparent bg-gray-950 shadow-md text-white",
    "data-disabled:bg-gray-950 data-hover:bg-gray-800"
  ),
  secondary: clsx(
    "relative rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15 text-gray-950",
    "after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]",
    "data-disabled:bg-white/15 data-hover:bg-white/20"
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
