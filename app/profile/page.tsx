"use client"

import Link from "next/link"
import { useState } from "react"
import { useProfile } from "@/lib/profile-context"
import { useWallet } from "@/lib/wallet-context"
import ProfileEditor from "@/components/profile-editor"
import Navbar from "@/components/navbar"
import "../home.css"

export default function ProfilePage() {
  const { profile } = useProfile()
  const { connectedWallet } = useWallet()
  const [isEditing, setIsEditing] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar showAdmin={false} />
      <div className="main-content" style={{ paddingTop: "120px" }}>
        <div className="profile-page">
          <div className="profile-header">
            <div className="profile-header-avatar">
              {profile.image ? (
                <img src={profile.image || "/placeholder.svg"} alt={profile.name} />
              ) : (
                getInitials(profile.name)
              )}
            </div>
            <h1 className="profile-header-name">{profile.name}</h1>
            {connectedWallet && <div className="profile-header-address">{connectedWallet}</div>}
            <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>

          {isEditing ? (
            <ProfileEditor onClose={() => setIsEditing(false)} />
          ) : (
            <div className="profile-form">
              <div className="form-group">
                <label className="form-label">Bio</label>
                <p style={{ color: "var(--text-light)", lineHeight: "1.6" }}>{profile.bio}</p>
              </div>

              <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid var(--border-light)" }}>
                <Link
                  href="/dashboard"
                  style={{ color: "var(--primary-color)", textDecoration: "none", fontWeight: "600" }}
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
