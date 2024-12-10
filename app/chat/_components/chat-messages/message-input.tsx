"use client"

import { Send } from "lucide-react"

export default function MessageInput() {
  return (
    <div className="border-t border-zinc-200 p-4">
      <div className="mx-auto max-w-3xl">
        <form className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm focus:border-zinc-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 p-2 text-white transition-colors hover:bg-zinc-800"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
} 