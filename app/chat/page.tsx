"use client"

import ChatHistory from "./_components/chat-history/chat-history"
import ChatMessages from "./_components/chat-messages/chat-messages"

export default function ChatPage() {
  return (
    <>
      <div className="w-1/5 border-r border-zinc-200">
        <ChatHistory />
      </div>
      <div className="flex-1">
        <ChatMessages />
      </div>
    </>
  )
} 