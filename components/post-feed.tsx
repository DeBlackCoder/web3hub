"use client"

import { useState } from "react"

interface Reply {
  id: number
  address: string
  message: string
  timestamp: Date
  replies?: Reply[]
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

interface PostFeedProps {
  posts: Post[]
  onUpdatePost: (updatedPost: Post) => void
}

function formatTime(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

interface ReplyItemProps {
  reply: Reply
  postId: number
  onReplyToReply: (postId: number, parentReplyId: number | null, message: string, replyPath: number[]) => void
  replyingTo: { postId: number; replyPath: number[] } | null
  setReplyingTo: (value: { postId: number; replyPath: number[] } | null) => void
  replyMessage: string
  setReplyMessage: (value: string) => void
  depth?: number
}

function ReplyItem({
  reply,
  postId,
  onReplyToReply,
  replyingTo,
  setReplyingTo,
  replyMessage,
  setReplyMessage,
  depth = 0,
}: ReplyItemProps) {
  const [showNested, setShowNested] = useState(false)
  const isReplyingToThis = replyingTo?.postId === postId && replyingTo?.replyPath?.join(",") === reply.id?.toString()

  return (
    <div className={`reply-item reply-depth-${Math.min(depth, 3)}`}>
      <div className="reply-header">
        <div className="reply-address">{reply.address}</div>
        <div className="reply-time">{formatTime(reply.timestamp)}</div>
      </div>
      <div className="reply-message">{reply.message}</div>

      <div className="reply-actions-inline">
        <button className="reply-action-link" onClick={() => setReplyingTo({ postId, replyPath: [reply.id] })}>
          💬 Reply
        </button>
        {reply.replies && reply.replies.length > 0 && (
          <button className="reply-action-link" onClick={() => setShowNested(!showNested)}>
            {showNested ? "Hide" : "Show"} {reply.replies.length} {reply.replies.length === 1 ? "reply" : "replies"}
          </button>
        )}
      </div>

      {isReplyingToThis && (
        <div className="reply-input-section nested">
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Write a reply..."
            className="reply-textarea"
          />
          <div className="reply-actions">
            <button
              className="btn btn-primary"
              disabled={!replyMessage.trim()}
              onClick={() => {
                onReplyToReply(postId, reply.id, replyMessage, [reply.id])
              }}
            >
              Reply
            </button>
            <button className="btn btn-secondary" onClick={() => setReplyingTo(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showNested && reply.replies && reply.replies.length > 0 && (
        <div className="nested-replies">
          {reply.replies.map((nestedReply) => (
            <ReplyItem
              key={nestedReply.id}
              reply={nestedReply}
              postId={postId}
              onReplyToReply={onReplyToReply}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyMessage={replyMessage}
              setReplyMessage={setReplyMessage}
              depth={(depth || 0) + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function PostFeed({ posts, onUpdatePost }: PostFeedProps) {
  const [replyingTo, setReplyingTo] = useState<{ postId: number; replyPath: number[] } | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set())

  const handleLike = (post: Post) => {
    const updatedPost = {
      ...post,
      liked: !post.liked,
      likes: post.liked ? post.likes - 1 : post.likes + 1,
    }
    onUpdatePost(updatedPost)
  }

  const handleReplySubmit = (postId: number) => {
    if (!replyMessage.trim()) return

    const post = posts.find((p) => p.id === postId)
    if (!post) return

    const newReply: Reply = {
      id: Math.random(),
      address: "0xYourAddress...1234",
      message: replyMessage,
      timestamp: new Date(),
      replies: [],
    }

    const updatedPost = {
      ...post,
      replies: [...post.replies, newReply],
    }

    onUpdatePost(updatedPost)
    setReplyMessage("")
    setReplyingTo(null)
  }

  const handleReplyToReply = (postId: number, parentReplyId: number, message: string, replyPath: number[]) => {
    if (!message.trim()) return

    const post = posts.find((p) => p.id === postId)
    if (!post) return

    const newReply: Reply = {
      id: Math.random(),
      address: "0xYourAddress...1234",
      message,
      timestamp: new Date(),
      replies: [],
    }

    const updateReplyNested = (replies: Reply[]): Reply[] => {
      return replies.map((reply) => {
        if (reply.id === parentReplyId) {
          return {
            ...reply,
            replies: [...(reply.replies || []), newReply],
          }
        }
        if (reply.replies && reply.replies.length > 0) {
          return {
            ...reply,
            replies: updateReplyNested(reply.replies),
          }
        }
        return reply
      })
    }

    const updatedPost = {
      ...post,
      replies: updateReplyNested(post.replies),
    }

    onUpdatePost(updatedPost)
    setReplyMessage("")
    setReplyingTo(null)
  }

  const handleShare = (post: Post) => {
    const shareText = `Check out this post from ${post.address}:\n\n"${post.message}"\n\nShared from Web3 Hub`

    if (navigator.share) {
      navigator
        .share({
          title: "Web3 Hub Post",
          text: shareText,
        })
        .catch(() => {
          copyToClipboard(shareText)
        })
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Post copied to clipboard!")
    })
  }

  const toggleReplies = (postId: number) => {
    const newSet = new Set(expandedReplies)
    if (newSet.has(postId)) {
      newSet.delete(postId)
    } else {
      newSet.add(postId)
    }
    setExpandedReplies(newSet)
  }

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <div key={post.id} className="post-item card">
          <div className="post-header">
            <div className="post-address">{post.address}</div>
            <div className="post-time">{formatTime(post.timestamp)}</div>
          </div>
          <div className="post-message">{post.message}</div>

          <div className="post-stats">
            <span>{post.likes} likes</span>
            <span>{post.replies.length} replies</span>
          </div>

          <div className="post-footer">
            <button className={`post-action ${post.liked ? "liked" : ""}`} onClick={() => handleLike(post)}>
              {post.liked ? "❤️" : "🤍"} Like
            </button>
            <button className="post-action" onClick={() => setReplyingTo({ postId: post.id, replyPath: [] })}>
              💬 Reply
            </button>
            <button className="post-action" onClick={() => handleShare(post)}>
              🔄 Share
            </button>
          </div>

          {replyingTo?.postId === post.id && replyingTo?.replyPath.length === 0 && (
            <div className="reply-input-section">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Write a reply..."
                className="reply-textarea"
              />
              <div className="reply-actions">
                <button
                  className="btn btn-primary"
                  disabled={!replyMessage.trim()}
                  onClick={() => handleReplySubmit(post.id)}
                >
                  Reply
                </button>
                <button className="btn btn-secondary" onClick={() => setReplyingTo(null)}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {post.replies.length > 0 && (
            <div className="replies-section">
              <button className="toggle-replies" onClick={() => toggleReplies(post.id)}>
                {expandedReplies.has(post.id) ? "Hide" : "Show"} {post.replies.length}{" "}
                {post.replies.length === 1 ? "reply" : "replies"}
              </button>

              {expandedReplies.has(post.id) && (
                <div className="replies-list">
                  {post.replies.map((reply) => (
                    <ReplyItem
                      key={reply.id}
                      reply={reply}
                      postId={post.id}
                      onReplyToReply={handleReplyToReply}
                      replyingTo={replyingTo}
                      setReplyingTo={setReplyingTo}
                      replyMessage={replyMessage}
                      setReplyMessage={setReplyMessage}
                      depth={0}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
