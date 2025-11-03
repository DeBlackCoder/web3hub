"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface WalletContextType {
  connectedWallet: string | null
  isConnected: boolean
  connectWallet: (address: string) => void
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)

  const connectWallet = (address: string) => {
    setConnectedWallet(address)
    localStorage.setItem("connectedWallet", address)
  }

  const disconnectWallet = () => {
    setConnectedWallet(null)
    localStorage.removeItem("connectedWallet")
  }

  return (
    <WalletContext.Provider
      value={{
        connectedWallet,
        isConnected: !!connectedWallet,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider")
  }
  return context
}
