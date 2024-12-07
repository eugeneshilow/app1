import Description from "@/components/landing/description"
import FAQ from "@/components/landing/faq"
import Hero from "@/components/landing/hero"
import Pricing from "@/components/landing/pricing"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Hero />
      <Description />
      <Pricing />
      <FAQ />
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </main>
  )
}
