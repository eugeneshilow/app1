"use client"

import ChatItem from "./chat-item"
import NewChatButton from "./new-chat-button"

export default function ChatHistory() {
  return (
    <div className="h-screen flex flex-col p-4">
      <NewChatButton />
      
      <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
        <ChatItem
          title="Chat 1"
          active={true}
          onClick={() => {}}
        />
        <ChatItem
          title="Chat 2"
          active={false}
          onClick={() => {}}
        />
      </div>
    </div>
  )
} 