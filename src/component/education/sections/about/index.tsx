"use client"

import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="gradient-pattern rounded-2xl p-8 lg:p-12 flex flex-col justify-between min-h-[500px] lg:min-h-[600px]">
      {/* Content Container */}
      <div className="space-y-6">
        {/* Label */}
        <div className="inline-block">
          <span className="text-sm font-medium text-white/80 tracking-wide">About Us</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
          <span className="text-balance">Why Study at UeCampus?</span>
        </h1>

        {/* Description */}
        <p className="text-base lg:text-lg text-white/90 leading-relaxed max-w-lg">
          Step into the future of learning with UeCampus — where global opportunities meet true flexibility. We break
          down the barriers of traditional education by delivering world-class, accredited degrees online at a fraction
          of the usual cost. Study at your own pace, from anywhere in the world, while gaining knowledge, skills, and
          confidence that empower you to thrive. At UeCampus, you don't just earn a degree – you gain the freedom,
          ambition, and competitive edge to shape the career and life you've always imagined.
        </p>
      </div>

      {/* Read More Button */}
      <div className="pt-4">
        <Button variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white bg-transparent">
          Read More
        </Button>
      </div>
    </section>
  )
}
