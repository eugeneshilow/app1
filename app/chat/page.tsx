"use server"

import ChatMain from './_components/chat-main'
import ChatSidebar from './_components/chat-sidebar'

export default async function ChatsPage() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <ChatSidebar />
      <ChatMain />
    </div>
  )
}
