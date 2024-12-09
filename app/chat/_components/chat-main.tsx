"use client"

import { generateOpenAIResponseAction } from "@/actions/openai-actions"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SelectMessage } from "@/db/schema"
import { cn } from "@/lib/utils"
import { readStreamableValue } from "ai/rsc"
import { Loader2, MessageSquare } from "lucide-react"
import { useState } from "react"
import { ChatInput } from "./chat-input"
import { ChatMessage } from "./chat-message"

interface ChatMainProps {
  initialMessages?: SelectMessage[]
  className?: string
}

export default function ChatMain({
  initialMessages = [],
  className
}: ChatMainProps) {
  const [messages, setMessages] = useState<SelectMessage[]>(initialMessages)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSendMessage = async (content: string) => {
    const tempChatId = "temp-id"
    const userMessageId = Date.now().toString()
    const assistantMessageId = `${Date.now() + 1}`

    setMessages(prev => [
      ...prev,
      {
        id: userMessageId,
        role: "user",
        content,
        chatId: tempChatId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: assistantMessageId,
        role: "assistant",
        content: "Generating response...",
        chatId: tempChatId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    setIsGenerating(true)

    const result = await generateOpenAIResponseAction(content)
    if (!result.isSuccess || !result.data) {
      console.error("Failed to generate response:", result.message)
      setIsGenerating(false)
      return
    }

    let fullContent = ""
    try {
      for await (const chunk of readStreamableValue(result.data)) {
        if (chunk) {
          fullContent += chunk
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: fullContent }
                : msg
            )
          )
        }
      }
    } catch (error) {
      console.error("Error streaming response:", error)
    }

    setIsGenerating(false)
  }

  return (
    <div className={cn("flex h-full flex-col flex-1", className)}>
      <Card className="rounded-none border-l border-border flex-1 flex flex-col bg-background">
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 space-y-4 p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-8 w-8" />
                  <p>No messages yet</p>
                </div>
              </div>
            ) : (
              messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            {isGenerating && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AI is typing...</span>
              </div>
            )}
          </ScrollArea>
          <div className="border-t border-border bg-background">
            <ChatInput onSend={handleSendMessage} disabled={isGenerating} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
