"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SupplyOfficerRootPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/asset-intelligence/operator/supply-officer/home")
  }, [router])

  return null
}
