"use client"

import { Check } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRef } from "react"

const tiers = [
  {
    name: "Free",
    description: "Perfect for getting started with API testing",
    price: "0",
    features: [
      "5 API endpoints testing",
      "5 reports",
      "Basic monitoring",
      "Results overview",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "Ideal for growing teams and businesses",
    price: "4.99",
    features: [
      "50 API endpoints testing",
      "Unlimited reports",
      "Advanced monitoring",
      "Priority email support",
      "Team collaboration",
      "Custom schedules",
      "API documentation",
      "Performance metrics",
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    features: [
      "Unlimited API endpoints",
      "Unlimited reports",
      "Advanced monitoring",
      "24/7 dedicated support",
      "Team collaboration",
      "Custom schedules",
      "Performance metrics",
      "Custom integrations",
      "Dedicated account manager",
      "Custom features",
    ],
    buttonText: "Contact Us",
    buttonVariant: "outline" as const,
  },
];

export default function PricingPage() {
const ref = useRef(null)
const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Simple, transparent pricing</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your API testing needs. All plans include our core features.
        </p>
      </div>
      <div ref={ref} className="max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {inView &&
            tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <Card className={`flex flex-col h-full ${tier.popular ? "border-primary" : ""}`}>
                  {tier.popular && (
                    <div className="px-3 py-1 text-sm text-center text-primary-foreground bg-primary rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        {tier.price === "Custom" ? "Custom" : `$${tier.price}`}
                      </span>
                      {tier.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant={tier.buttonVariant} className="w-full">
                      {tier.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

