"use client"

import { Card, CardContent } from "@/components/ui/card"

export function EducationCard() {
  return (
    <Card className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-8 lg:p-10">
        {/* Heading */}
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-700 leading-tight mb-6">
          <span className="text-balance">Quality Education That's Affordable — Because Your Future Matters</span>
        </h2>

        {/* Description */}
        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
          At UeCampus, we believe that access to top-tier education should never be limited by cost. That's why we're
          committed to offering internationally accredited degree programmes that don't break the bank — making your
          dream of earning a quality degree achievable and affordable at the comfort of your home.
        </p>
      </CardContent>
    </Card>
  )
}
