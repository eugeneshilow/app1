import Description from "@/components/landing/description"
import FAQ from "@/components/landing/faq"
import Hero from "@/components/landing/hero"
import Pricing from "@/components/landing/pricing"

export default function Home() {
  return (
    <main>
      <Hero />
      <Description />
      <Pricing />
      <FAQ />
    </main>
  )
}
