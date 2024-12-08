import FAQ from "./sections/faq"
import Features from "./sections/features"
import Hero from "./sections/hero"
import Pricing from "./sections/pricing"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
    </>
  )
}