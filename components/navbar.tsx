"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useWallet } from "@/lib/wallet-context"
import { useProfile } from "@/lib/profile-context"
import { useAdmin } from "@/lib/admin-context"
import WalletModal from "./wallet-modal"

interface NavbarProps {
  showAdmin: boolean
}

export default function Navbar({ showAdmin }: NavbarProps) {
  const { connectedWallet, isConnected, disconnectWallet } = useWallet()
  const { profile } = useProfile()
  const { isAdmin } = useAdmin()
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">💎 Web3 Hub</div>
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link href="/social" className="nav-link">
              Social
            </Link>
            {isAdmin && showAdmin && (
              <Link href="/admin" className="nav-link">
                Admin
              </Link>
            )}

            {isConnected ? (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button className="profile-menu-btn" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                  <div className="profile-avatar">
                    {profile.image ? (
                      <img src={profile.image || "/placeholder.svg"} alt={profile.name} />
                    ) : (
                      getInitials(profile.name)
                    )}
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--text-light)" }}>
                    {connectedWallet?.slice(0, 6)}...{connectedWallet?.slice(-4)}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <Link
                      href="/profile"
                      className="profile-dropdown-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      View Profile
                    </Link>
                    <div className="profile-dropdown-divider" />
                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        disconnectWallet()
                        setProfileDropdownOpen(false)
                      }}
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="connect-btn" onClick={() => setWalletModalOpen(true)}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </>
  )
}
