"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AdminContextType {
  currentUserAddress: string | null
  isAdmin: boolean
  setCurrentUserAddress: (address: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [currentUserAddress, setCurrentUserAddress] = useState<string | null>(null)

  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || "0x742d35Cc6634C0532925a3b844Bc2e7B1dDe8f6E"
  const isAdmin = currentUserAddress === adminAddress

  return (
    <AdminContext.Provider value={{ currentUserAddress, isAdmin, setCurrentUserAddress }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminProvider")
  }
  return context
}
