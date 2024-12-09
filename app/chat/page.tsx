import ChatMain from './_components/chat-main'
import ChatSidebar from './_components/chat-sidebar'

export default function ChatsPage() {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <ChatMain />
    </div>
  )
}
