"use client"

import { useState } from "react"
import { useAdmin } from "@/lib/admin-context"
import PostFeed from "@/components/post-feed"
import PostInput from "@/components/post-input"
import ChatSection from "@/components/chat-section"
import Navbar from "@/components/navbar"
import "../home.css"

interface Reply {
  id: number
  address: string
  message: string
  timestamp: Date
}

interface Post {
  id: number
  address: string
  message: string
  timestamp: Date
  likes: number
  liked: boolean
  replies: Reply[]
}

type SocialTab = "feed" | "chats"

export default function Social() {
  const { isAdmin } = useAdmin()
  const [activeTab, setActiveTab] = useState<SocialTab>("feed")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      address: "0x742d...8f6E",
      message: "Just launched my new NFT collection! 🚀 Check it out on OpenSea.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 42,
      liked: false,
      replies: [],
    },
    {
      id: 2,
      address: "0x8aE4...2cB9",
      message: "ETH is looking bullish. Accumulating more in this dip 📈",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 128,
      liked: false,
      replies: [],
    },
    {
      id: 3,
      address: "0x5D3B...1Fc2",
      message: "Anyone else attending the blockchain conference next month?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      likes: 35,
      liked: false,
      replies: [],
    },
  ])

  const handleNewPost = (message: string) => {
    const newPost: Post = {
      id: posts.length + 1,
      address: "0xYourAddress...1234",
      message,
      timestamp: new Date(),
      likes: 0,
      liked: false,
      replies: [],
    }
    setPosts([newPost, ...posts])
  }

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)))
  }

  return (
    <div className="social-container">
      <Navbar showAdmin={isAdmin} />
      <main className="main-content social-main">
        <div className="social-tabs">
          <button className={`social-tab ${activeTab === "feed" ? "active" : ""}`} onClick={() => setActiveTab("feed")}>
            Feed
          </button>
          <button
            className={`social-tab ${activeTab === "chats" ? "active" : ""}`}
            onClick={() => setActiveTab("chats")}
          >
            Chats
          </button>
        </div>

        {activeTab === "feed" && (
          <div className="social-wrapper">
            <PostInput onPost={handleNewPost} />
            <PostFeed posts={posts} onUpdatePost={handleUpdatePost} />
          </div>
        )}

        {activeTab === "chats" && <ChatSection />}
      </main>
    </div>
  )
}
