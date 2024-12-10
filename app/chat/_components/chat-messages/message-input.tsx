"use client"

import { Send } from "lucide-react"
import { KeyboardEvent, useState } from "react"

interface MessageInputProps {
  onSend: (content: string) => void
  disabled?: boolean
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [content, setContent] = useState("")

  const handleSend = () => {
    if (content.trim() && !disabled) {
      onSend(content)
      setContent("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-zinc-200 p-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm focus:border-zinc-400 focus:outline-none"
            disabled={disabled}
          />
          <button
            onClick={handleSend}
            disabled={!content.trim() || disabled}
            className="rounded-lg bg-zinc-900 p-2 text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 