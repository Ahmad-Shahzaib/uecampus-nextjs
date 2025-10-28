"use client"
import { Card } from "@/components/ui/card"

interface HeroCardProps {
  title: string
  description: string
  className?: string
}

export function HeroCard({ title, description, className = "" }: HeroCardProps) {
  return (
    <Card
      className={`relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 border-0 p-8 md:p-12 text-white shadow-2xl rounded-3xl ${className}`}
    >
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">{title}</h1>
        <p className="text-base md:text-lg leading-relaxed text-purple-100 max-w-2xl text-pretty">{description}</p>
      </div>
    </Card>
  )
}
