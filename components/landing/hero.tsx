"use client"

import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SignUp, useUser } from "@clerk/nextjs"
import { ChevronDown } from "lucide-react"

const carouselItems = [
  {
    title: "Customer Insights Report",
    image: "/placeholder-1.jpg",
  },
  {
    title: "Data Analysis",
    image: "/placeholder-2.jpg",
  },
  {
    title: "Project Management",
    image: "/placeholder-3.jpg",
  },
  {
    title: "Team Collaboration",
    image: "/placeholder-4.jpg",
  },
]

export default function Hero() {
  const { user } = useUser()
  
  const scrollToDescription = () => {
    document.getElementById('description')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  if (!user) {
    return (
      <div className="grid min-h-screen grid-cols-2">
        {/* Left Column - Sign Up */}
        <div className="relative flex flex-col items-center justify-center bg-white px-12">
          <div className="mb-8 text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900">
              Your ideas,{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                amplified
              </span>
            </h1>
            
            <p className="text-xl text-zinc-500">
              Privacy-first AI that helps you create in confidence.
            </p>
          </div>

          <div className="w-full max-w-md">
            <SignUp 
              afterSignUpUrl="/" 
              routing="hash"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-none",
                  formButtonPrimary: "bg-black hover:bg-zinc-800",
                  formFieldInput: "rounded-xl border-zinc-200",
                  formFieldLabel: "text-zinc-500",
                  headerTitle: "text-zinc-900",
                  headerSubtitle: "text-zinc-500",
                  socialButtonsBlockButton: "border-zinc-200 hover:bg-zinc-50",
                  socialButtonsBlockButtonText: "text-zinc-900",
                  dividerLine: "bg-zinc-200",
                  dividerText: "text-zinc-400",
                  footer: "text-zinc-400",
                  footerActionLink: "text-zinc-900 hover:text-zinc-800",
                }
              }}
            />
          </div>

          <button
            onClick={scrollToDescription}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-600"
          >
            Learn more
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>

        {/* Right Column - Carousel */}
        <div className="flex items-center justify-center bg-zinc-50 px-12">
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 bg-transparent p-1 shadow-none">
                    <div className="flex aspect-square items-center justify-center p-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-medium text-zinc-900">{item.title}</h3>
                        <div className="h-64 rounded-2xl bg-white/50 shadow-[0_0_1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.05)]"></div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-zinc-200 bg-white/80 hover:bg-white" />
            <CarouselNext className="border-zinc-200 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Welcome, {user.firstName || 'User'}!</h1>
    </div>
  )
} 