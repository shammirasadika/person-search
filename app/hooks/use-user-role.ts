"use client"

import { useSession } from "next-auth/react"

export function useUserRole() {
  const { data: session } = useSession()
  
  const isAdmin = session?.user?.role === "admin"
  const isUser = session?.user?.role === "user"
  const role = session?.user?.role || null

  return {
    isAdmin,
    isUser,
    role,
    session
  }
}
