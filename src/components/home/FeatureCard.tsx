import type React from "react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-[#2A303C] rounded-xl p-6 border border-[#3A4253] shadow-lg transition-all duration-300 hover:shadow-[0_4px_14px_0_rgba(59,130,246,0.1)] hover:-translate-y-1">
      <div className="w-12 h-12 rounded-lg bg-[#343B4A] flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
      <p className="text-[#B0B7C3]">{description}</p>
    </div>
  )
}

export default FeatureCard

