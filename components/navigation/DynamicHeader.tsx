"use client"

import { useHeader } from "@/contexts/HeaderContext"

export function DynamicHeader() {
  const { headerContent } = useHeader()
  return <>{headerContent}</>
}
