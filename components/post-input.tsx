"use client"

import type React from "react"

import { useState } from "react"

interface PostInputProps {
  onPost: (message: string) => void
}

export default function PostInput({ onPost }: PostInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onPost(message)
      setMessage("")
    }
  }

  return (
    <div className="post-input-container">
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts... What's happening in Web3?"
          className="post-textarea"
        />
        <div className="post-actions">
          <button type="submit" disabled={!message.trim()} className="btn btn-primary">
            Post
          </button>
        </div>
      </form>
    </div>
  )
}
