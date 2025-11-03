"use client"

import type React from "react"

import { useState } from "react"

interface Message {
  id: number
  sender: string
  text: string
  timestamp: Date
}

interface Chat {
  id: number
  address: string
  lastMessage: string
  unread: number
  messages: Message[]
}

export default function ChatSection() {
  const [selectedChat, setSelectedChat] = useState<number | null>(0)
  const [messageInput, setMessageInput] = useState("")
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      address: "0x742d...8f6E",
      lastMessage: "Thanks for the collab!",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "0x742d...8f6E",
          text: "Hey, interested in collaborating?",
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
        },
        {
          id: 2,
          sender: "0xYou...1234",
          text: "Definitely! Let's discuss details",
          timestamp: new Date(Date.now() - 50 * 60 * 1000),
        },
        {
          id: 3,
          sender: "0x742d...8f6E",
          text: "Thanks for the collab!",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
      ],
    },
    {
      id: 2,
      address: "0x8aE4...2cB9",
      lastMessage: "See you at the conference!",
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "0x8aE4...2cB9",
          text: "Are you going to the conference?",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 2,
          sender: "0xYou...1234",
          text: "Yes, definitely!",
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        },
        {
          id: 3,
          sender: "0x8aE4...2cB9",
          text: "See you at the conference!",
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
        },
      ],
    },
    {
      id: 3,
      address: "0x5D3B...1Fc2",
      lastMessage: "Portfolio looks amazing",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "0x5D3B...1Fc2",
          text: "Your NFT portfolio looks amazing!",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
        {
          id: 2,
          sender: "0xYou...1234",
          text: "Thank you so much!",
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        },
      ],
    },
  ])

  const currentChat = selectedChat !== null ? chats[selectedChat] : null

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || selectedChat === null) return

    const updatedChats = [...chats]
    const newMessage: Message = {
      id: (currentChat?.messages.length ?? 0) + 1,
      sender: "0xYou...1234",
      text: messageInput,
      timestamp: new Date(),
    }

    updatedChats[selectedChat].messages.push(newMessage)
    updatedChats[selectedChat].lastMessage = messageInput
    updatedChats[selectedChat].unread = 0

    setChats(updatedChats)
    setMessageInput("")
  }

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3 className="chat-sidebar-title">Messages</h3>
        <div className="chat-list">
          {chats.map((chat, index) => (
            <button
              key={chat.id}
              className={`chat-item ${selectedChat === index ? "active" : ""}`}
              onClick={() => setSelectedChat(index)}
            >
              <div className="chat-item-header">
                <div className="chat-address">{chat.address}</div>
                {chat.unread > 0 && <div className="chat-badge">{chat.unread}</div>}
              </div>
              <div className="chat-preview">{chat.lastMessage}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="chat-main">
        {currentChat ? (
          <>
            <div className="chat-header">
              <h2 className="chat-title">{currentChat.address}</h2>
            </div>

            <div className="messages-container">
              {currentChat.messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender === "0xYou...1234" ? "sent" : "received"}`}>
                  <div className="message-sender">{msg.sender}</div>
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>

            <form className="message-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="message-input"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button type="submit" className="message-send-btn">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="chat-empty">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}
