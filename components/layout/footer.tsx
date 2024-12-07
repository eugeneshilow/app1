"use client"

import Link from "next/link"

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      { name: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  },
]

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "GitHub", href: "#" },
]

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8">
          {/* Links Grid */}
          <div className="grid w-full grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col items-center">
                <h3 className="text-sm font-medium text-zinc-400">
                  {section.title}
                </h3>
                <ul className="mt-3 flex flex-col items-center space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="flex w-full flex-col items-center gap-4 border-t border-zinc-800 pt-6">
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <p className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()} Claude. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 