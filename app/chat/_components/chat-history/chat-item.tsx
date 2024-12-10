"use client"

import { MessageSquare } from "lucide-react"

interface ChatItemProps {
  title: string
  active: boolean
  onClick: () => void
}

export default function ChatItem({ title, active, onClick }: ChatItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-zinc-100 text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-100/50 hover:text-zinc-900"
      }`}
    >
      <MessageSquare className="h-4 w-4" />
      <span className="truncate">{title}</span>
    </button>
  )
} 