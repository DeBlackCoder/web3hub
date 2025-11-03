"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import "../home.css"
import Navbar from "@/components/navbar"

interface User {
  id: number
  address: string
  joinDate: Date
  status: "active" | "inactive" | "flagged"
  posts: number
}

interface AdminStats {
  totalUsers: number
  totalPosts: number
  flaggedUsers: number
  totalMessages: number
}

export default function Admin() {
  const router = useRouter()
  const { currentUserAddress, isAdmin, setCurrentUserAddress } = useAdmin()
  const [walletInput, setWalletInput] = useState("")
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      address: "0x742d...8f6E",
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      status: "active",
      posts: 15,
    },
    {
      id: 2,
      address: "0x8aE4...2cB9",
      joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      status: "active",
      posts: 42,
    },
    {
      id: 3,
      address: "0x5D3B...1Fc2",
      joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      status: "flagged",
      posts: 8,
    },
    {
      id: 4,
      address: "0xAb12...5cD3",
      joinDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
      status: "inactive",
      posts: 23,
    },
  ])

  const stats: AdminStats = {
    totalUsers: users.length,
    totalPosts: users.reduce((sum, u) => sum + u.posts, 0),
    flaggedUsers: users.filter((u) => u.status === "flagged").length,
    totalMessages: 342,
  }

  const handleConnectAdmin = () => {
    const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || "0x742d35Cc6634C0532925a3b844Bc2e7B1dDe8f6E"
    if (walletInput.toLowerCase() === adminAddress.toLowerCase()) {
      setCurrentUserAddress(walletInput)
    } else {
      alert("Unauthorized: Only the admin can access this section.")
      setWalletInput("")
    }
  }

  if (!isAdmin) {
    return (
      <div className="admin-container">
        <Navbar showAdmin={true} />
        <main
          className="main-content"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <h1 style={{ fontSize: "28px", marginBottom: "16px", color: "var(--primary)" }}>Admin Access</h1>
            <p style={{ marginBottom: "24px", color: "var(--text-secondary)" }}>
              This section is restricted to administrators only. Please enter your admin wallet address.
            </p>
            <input
              type="text"
              placeholder="Enter admin wallet address"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "2px solid var(--primary)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleConnectAdmin}
              style={{
                width: "100%",
                padding: "12px 24px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Verify Admin Access
            </button>
            <p style={{ marginTop: "24px", fontSize: "12px", color: "var(--text-secondary)" }}>
              If you believe you should have access, contact the platform administrator.
            </p>
          </div>
        </main>
      </div>
    )
  }

  const handleUserAction = (userId: number, action: "activate" | "flag" | "deactivate") => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: action === "activate" ? "active" : action === "flag" ? "flagged" : "inactive",
            }
          : user,
      ),
    )
  }

  return (
    <div className="admin-container">
      <Navbar showAdmin={true} />
      <main className="main-content admin-main">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage platform users and content</p>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-label">Total Users</div>
            <div className="stat-value">{stats.totalUsers}</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-label">Total Posts</div>
            <div className="stat-value">{stats.totalPosts}</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-label">Flagged Users</div>
            <div className="stat-value flagged">{stats.flaggedUsers}</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-label">Total Messages</div>
            <div className="stat-value">{stats.totalMessages}</div>
          </div>
        </div>

        <div className="admin-section">
          <h2 className="admin-section-title">Users Management</h2>
          <div className="users-table">
            <div className="table-header">
              <div className="table-col-address">Address</div>
              <div className="table-col-date">Join Date</div>
              <div className="table-col-posts">Posts</div>
              <div className="table-col-status">Status</div>
              <div className="table-col-actions">Actions</div>
            </div>
            {users.map((user) => (
              <div key={user.id} className="table-row">
                <div className="table-col-address table-cell">{user.address}</div>
                <div className="table-col-date table-cell">{user.joinDate.toLocaleDateString()}</div>
                <div className="table-col-posts table-cell">{user.posts}</div>
                <div className={`table-col-status table-cell status-${user.status}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </div>
                <div className="table-col-actions table-cell">
                  <button className="action-btn activate-btn" onClick={() => handleUserAction(user.id, "activate")}>
                    Activate
                  </button>
                  <button className="action-btn flag-btn" onClick={() => handleUserAction(user.id, "flag")}>
                    Flag
                  </button>
                  <button className="action-btn deactivate-btn" onClick={() => handleUserAction(user.id, "deactivate")}>
                    Deactivate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
