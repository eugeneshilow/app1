"use client"

import ReactMarkdown, { Components } from "react-markdown"
import { Prism } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownProps {
  content: string
}

export function Markdown({ content }: MarkdownProps) {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "")
      const isInline = !match
      return !isInline ? (
        <Prism
          {...props}
          style={vscDarkPlus as any}
          language={match![1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </Prism>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>
} 