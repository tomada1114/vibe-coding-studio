import * as Headless from "@headlessui/react"
import NextLink, { type LinkProps } from "next/link"
import { forwardRef } from "react"

export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Headless.DataInteractive as={NextLink as any} ref={ref} {...props} />
})
