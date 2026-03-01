"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/logout").then(() => {
      router.push("/login")
    })
  }, [])

  return <div>Выход...</div>
}
