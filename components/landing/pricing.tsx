"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { Check } from "lucide-react"
import { useState } from "react"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals to get started",
    features: [
      "Talk to Claude on the web, iOS, and Android",
      "Ask about images and docs",
      "Access to one of our latest models",
      "Basic file uploads",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$12",
    yearlyPrice: "$120",
    period: "per month",
    yearlyPeriod: "per year",
    description: "For power users",
    features: [
      "Everything in Free, plus:",
      "More usage than Free",
      "Access to Projects to organize documents and chats",
      "Ability to use more models, like Claude 3.5 Sonnet and Claude 3 Opus",
      "Early access to new features",
      "Priority support",
    ],
    cta: "Upgrade now",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations that need more",
    features: [
      "Everything in Pro, plus:",
      "Custom usage limits",
      "Advanced security features",
      "SSO and domain capture",
      "Dedicated account manager",
      "Custom contracts and SLAs",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

// Add type safety for env variables
const STRIPE_LINKS = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY,
  yearly: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY
} as const

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true)
  const { user } = useUser()

  const handlePurchase = (tier: string) => {
    if (tier !== "Pro") return

    const link = isAnnual ? STRIPE_LINKS.yearly : STRIPE_LINKS.monthly
    
    if (!link) {
      console.error("Stripe payment link not configured")
      return
    }

    if (!user) {
      window.location.href = "/sign-up"
    } else {
      const paymentUrl = new URL(link);
      paymentUrl.searchParams.set('client_reference_id', user.id);
      window.location.href = paymentUrl.toString();
    }
  }

  return (
    <div className="bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-lg text-lg text-zinc-500">
            Choose the plan that's right for you
          </p>

          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="rounded-full bg-zinc-100/80 p-1 backdrop-blur">
              <div className="flex items-center gap-6 px-4 py-2">
                <span 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    !isAnnual ? "text-zinc-900" : "text-zinc-500"
                  )}
                >
                  Monthly
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-black data-[state=unchecked]:bg-zinc-200"
                />
                <div className="flex flex-col items-start">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isAnnual ? "text-zinc-900" : "text-zinc-500"
                    )}
                  >
                    Annually
                  </span>
                  <span className="text-xs text-green-600">Save 17%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "relative flex flex-col overflow-hidden border-zinc-200 bg-white transition-all hover:shadow-lg",
                tier.highlighted && "border-2 border-black shadow-lg"
              )}
            >
              {tier.highlighted && (
                <div className="absolute -right-20 top-8 rotate-45 bg-black px-24 py-1.5 text-sm text-white">
                  Popular
                </div>
              )}
              <CardContent className="flex flex-1 flex-col p-6">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {tier.name}
                  </h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-zinc-900">
                      {tier.monthlyPrice
                        ? isAnnual
                          ? tier.yearlyPrice
                          : tier.monthlyPrice
                        : tier.price}
                    </span>
                    {(tier.period || tier.yearlyPeriod) && (
                      <span className="text-sm text-zinc-500">
                        {" "}
                        {isAnnual ? tier.yearlyPeriod : tier.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-zinc-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button
                    onClick={() => handlePurchase(tier.name)}
                    className={cn(
                      "w-full",
                      tier.highlighted 
                        ? "bg-black text-white hover:bg-zinc-800"
                        : "bg-white text-black hover:bg-zinc-50"
                    )}
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-zinc-500">
          All plans include automatic updates and community support. For enterprise
          needs, please contact our sales team.
        </div>
      </div>
    </div>
  )
} 