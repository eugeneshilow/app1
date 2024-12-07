"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { BookOpen, FileText, Users } from "lucide-react"
import { useState } from "react"

const features = [
  {
    id: "create",
    title: "Create with Claude",
    description: "Draft and iterate on websites, graphics, documents, and code alongside your chat with Artifacts.",
    icon: FileText,
    image: "/screenshots/create.png"
  },
  {
    id: "knowledge",
    title: "Bring your knowledge",
    description: "Upload documents and data to give Claude the context it needs to help you work better.",
    icon: BookOpen,
    image: "/screenshots/knowledge.png"
  },
  {
    id: "collaborate",
    title: "Share and collaborate",
    description: "Work together with your team in real-time and share resources seamlessly.",
    icon: Users,
    image: "/screenshots/collaborate.png"
  }
]

export default function Description() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  return (
    <div id="description" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left side - Screenshot */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {features.map((feature) => 
                feature.id === activeFeature && (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full"
                  >
                    <div className="overflow-hidden rounded-2xl bg-zinc-50 shadow-xl">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full"
                      />
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>

          {/* Right side - Features */}
          <div className="flex flex-col justify-center space-y-8">
            <h2 className="text-3xl font-semibold text-zinc-900">
              Meet Claude
            </h2>
            <p className="text-lg text-zinc-500">
              A next generation AI assistant built to help you do your best work.
            </p>
            
            <div className="space-y-4">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={cn(
                    "group relative w-full rounded-xl border border-transparent p-4 text-left transition-all hover:bg-zinc-50 hover:shadow-md",
                    activeFeature === feature.id && "bg-zinc-50 shadow-md"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "rounded-lg p-2",
                      activeFeature === feature.id ? "bg-black text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-black group-hover:text-white"
                    )}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 