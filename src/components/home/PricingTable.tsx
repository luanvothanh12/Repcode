import React from "react"
import { CheckIcon } from "lucide-react"
import Link from "next/link"

const PricingTable = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 3 collections",
        "Up to 10 problems per collection",
        "Full AI functionality",
        "Full spatial repitition functionality",
        "Import all problems from Leetcode",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$5",
      period: "/one time",
      description: "For serious interview preparation",
      features: [
        "Unlimited collections",
        "Unlimited problems",
        "Full AI functionality",
        "Full spatial repitition functionality",
        "Import all problems from Leetcode",
        "Priority support",
        "Special thank-you from me!! :D",
      ],
      cta: "Buy Now",
      popular: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`relative rounded-xl overflow-hidden 
            ${
              plan.popular
                // Keep the border gradient but use the same dark background
                ? "bg-[#343B4A] border-2 border-[#06b6d4] shadow-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.1)]"
                // Otherwise, a dark gray background
                : "bg-[#343B4A] border border-[#3A4253]"
            }`
          }
        >
          {/* "POPULAR" banner */}
          {plan.popular && (
            <div className="absolute top-0 right-0">
              <div className="bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-[#FFFFFF] text-xs font-bold px-3 py-1 transform rotate-0 translate-x-[30%] translate-y-[40%] rotate-45">
                POPULAR
              </div>
            </div>
          )}

          {/* Top section (title, price, CTA) */}
          <div className="p-6 bg-transparent">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold text-[#FFFFFF]">{plan.price}</span>
              {plan.period && <span className="text-[#B0B7C3] ml-1">{plan.period}</span>}
            </div>
            <p className="text-[#B0B7C3] mb-6">{plan.description}</p>

            <Link
              href="/login"
              className={`block w-full py-2 px-4 rounded-lg text-center font-medium transition-all duration-200 
                ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-[#FFFFFF] hover:brightness-110 shadow-lg shadow-[0_4px_14px_0_rgba(59,130,246,0.2)] hover:shadow-[0_4px_14px_0_rgba(59,130,246,0.3)]"
                    : "bg-[#2A303C] text-[#FFFFFF] border border-[#3A4253] hover:bg-[#3A4253]"
                }`
              }
            >
              {plan.cta}
            </Link>
          </div>

          {/* Bottom section (features) */}
          <div className="p-6 bg-transparent border-t border-[#3A4253]">
            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-[#4ade80] mr-2 flex-shrink-0" />
                  <span className="text-[#FFFFFF]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PricingTable
