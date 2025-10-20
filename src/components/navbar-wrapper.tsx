"use client"

import { Navbar } from "./navbar"

export function NavbarWrapper({ banner }: { banner?: React.ReactNode }) {
  return <Navbar banner={banner} />
}
