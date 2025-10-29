"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function AboutSection() {
  return (
    <section
      className="relative rounded-2xl p-8 lg:p-12 flex flex-col justify-between min-h-[500px] lg:min-h-[600px] bg-purple-900/90 overflow-hidden"
      style={{
        backgroundImage: `
          url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
        linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #7B1FA2 100%);

        `,
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundBlendMode: 'overlay, normal',
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 space-y-6">
        {/* Label */}
        <div className="inline-block">
          <span className="text-4xl sm:text-5xl text-white lg:text-6xl font-bold leading-tight tracking-tight">About Us</span>
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
        >
          <span className="text-white inline-block mr-2">Why</span>
          <span className="text-white inline-block mr-2">Study</span>
          <span className="text-white inline-block mr-2">at</span>
          <span className="text-white inline-block text-purple-300">UeCampus?</span>
        </motion.h2>

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
      <div className="relative z-10 pt-4">
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white/10 hover:text-white bg-transparent transition-all duration-200"
        >
          Read More
        </Button>
      </div>
    </section>
  )
}
