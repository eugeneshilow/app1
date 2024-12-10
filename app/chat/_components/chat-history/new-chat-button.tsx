"use client"

import { Plus } from "lucide-react"

export default function NewChatButton() {
  return (
    <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white transition-colors hover:bg-zinc-800">
      <Plus className="h-4 w-4" />
      <span>New Chat</span>
    </button>
  )
} 