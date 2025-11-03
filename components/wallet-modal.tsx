"use client"

import { useState } from "react"
import { useWallet } from "@/lib/wallet-context"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectWallet } = useWallet()
  const [address, setAddress] = useState("")

  if (!isOpen) return null

  const handleConnect = (provider: string) => {
    if (provider === "manual") {
      if (address.trim()) {
        connectWallet(address)
        setAddress("")
        onClose()
      }
    } else {
      // Simulate wallet connection
      const mockAddresses: Record<string, string> = {
        metamask: "0x742d35Cc6634C0532925a3b844Bc2e7B1dDe8f6E",
        walletconnect: "0x8aE4D8a3f1c2B5e9D7F8C3E9B5F2A1C8D9E7F5A3",
        coinbase: "0x1234567890ABCDEf1234567890abcdef12345678",
      }
      connectWallet(mockAddresses[provider] || "0xConnectedWallet123")
      onClose()
    }
  }

  return (
    <div className="wallet-modal">
      <div className="wallet-modal-content">
        <div className="wallet-modal-header">
          <h2 className="wallet-modal-title">Connect Wallet</h2>
          <button className="wallet-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="wallet-providers">
          <button className="wallet-provider-btn" onClick={() => handleConnect("metamask")}>
            <span>🦊</span>
            <span>MetaMask</span>
          </button>
          <button className="wallet-provider-btn" onClick={() => handleConnect("walletconnect")}>
            <span>🔗</span>
            <span>WalletConnect</span>
          </button>
          <button className="wallet-provider-btn" onClick={() => handleConnect("coinbase")}>
            <span>💙</span>
            <span>Coinbase Wallet</span>
          </button>
        </div>

        <div style={{ textAlign: "center", marginBottom: "16px", color: "var(--muted-light)" }}>or</div>

        <input
          type="text"
          placeholder="Enter wallet address manually"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="wallet-address-input"
        />

        <div className="wallet-modal-footer">
          <button className="wallet-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="wallet-connect-btn" onClick={() => handleConnect("manual")}>
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}
