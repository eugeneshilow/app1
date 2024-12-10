"use client"

import MessageInput from "./message-input"
import MessageItem from "./message-item"

export default function ChatMessages() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-6 overflow-auto p-8">
        <MessageItem
          role="assistant"
          content="Hello! How can I help you today?"
        />
        <MessageItem
          role="user"
          content="Hi! I have a question."
        />
      </div>

      <MessageInput />
    </div>
  )
} 