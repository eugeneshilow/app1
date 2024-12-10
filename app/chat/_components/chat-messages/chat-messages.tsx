"use client"

import { generateOpenAIResponseAction } from "@/actions/openai-actions"
import { readStreamableValue } from "ai/rsc"
import { useState } from "react"
import MessageInput from "./message-input"
import MessageItem from "./message-item"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
}

export default function ChatMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! How can I help you today?"
    }
  ])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content
    }
    
    setMessages(prev => [...prev, userMessage])

    // Add placeholder for assistant message
    const assistantMessageId = (Date.now() + 1).toString()
    setMessages(prev => [
      ...prev,
      {
        id: assistantMessageId,
        role: "assistant",
        content: ""
      }
    ])

    setIsGenerating(true)

    const result = await generateOpenAIResponseAction(content)
    
    if (!result.isSuccess || !result.data) {
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
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-6 overflow-auto p-8">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>

      <MessageInput onSend={handleSendMessage} disabled={isGenerating} />
    </div>
  )
} 