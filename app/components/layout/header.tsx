"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold">
            Logo
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-sm hover:underline">
              Features
            </Link>
            <Link href="#pricing" className="text-sm hover:underline">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm hover:underline">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  )
} 