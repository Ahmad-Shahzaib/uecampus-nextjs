"use client"

import { Card, CardContent } from "@/components/ui/card"

interface EducationCardProps {
  title: string
  description: string
  backgroundImage?: string
  backgroundClass?:string
}

export function EducationCard({
  title,
  description,
  backgroundImage = "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-3.png",
  backgroundClass
}: EducationCardProps) {
  return (
    <Card className={`border-0 shadow-lg rounded-2xl overflow-hidden ${backgroundClass}`}>
      <CardContent
        className={`lg:px-8 px-4 py-6 lg:py-10 bg-cover bg-center ${backgroundClass}`}
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          
        }}
      >
        {/* Title */}
        <h2 className="text-xl lg:text-2xl font-bold  leading-tight mb-6">
          <span className="text-balance">{title}</span>
        </h2>

        {/* Description */}
        <p className="text-base lg:text-lg  leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
