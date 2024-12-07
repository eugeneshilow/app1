"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
]

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const isHomePage = pathname === "/"
  
  // Don't show header on auth pages
  if (pathname.startsWith("/sign")) return null

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isHomePage 
          ? isScrolled
            ? "border-b border-zinc-200 bg-white/80 backdrop-blur-md"
            : "bg-transparent"
          : "border-b border-zinc-200 bg-white/80 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link 
            href="/" 
            className={`-m-1.5 p-1.5 text-lg font-semibold ${
              isHomePage && !isScrolled ? "text-white" : "text-zinc-900"
            }`}
          >
            Claude
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isHomePage && !isScrolled
                  ? "text-white/90 hover:text-white"
                  : "text-zinc-900 hover:text-zinc-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right section */}
        <div className="flex flex-1 justify-end">
          {(!isHomePage || isScrolled) && (
            <Link
              href="/sign-up"
              className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
} 