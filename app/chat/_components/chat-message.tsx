"use client"

import { Markdown } from "@/components/ui/markdown"
import { SelectMessage } from "@/db/schema"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: SelectMessage
  className?: string
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg p-4",
        isUser
          ? "bg-secondary/50 text-foreground"
          : "bg-muted/50 text-foreground"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        )}
      >
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>

      <div className="flex-1 text-sm leading-relaxed">
        <Markdown content={message.content} />
      </div>
    </div>
  )
}
