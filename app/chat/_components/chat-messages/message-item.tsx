"use client"

import { Bot, User } from "lucide-react"

interface MessageItemProps {
  role: "assistant" | "user"
  content: string
}

export default function MessageItem({ role, content }: MessageItemProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100">
        {role === "assistant" ? (
          <Bot className="h-5 w-5 text-zinc-600" />
        ) : (
          <User className="h-5 w-5 text-zinc-600" />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm text-zinc-600">{content}</p>
      </div>
    </div>
  )
} 