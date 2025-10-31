"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface AboutSectionProps {
  label?: string;
  title?: string;
  highlight?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  gradient?: string;
  textColor?: string;
  highlightColor?: string;
  buttonStyles?:string
}

export function AboutSection({
  label = "About Us",
  title = "Why Study at",
  highlight = "UeCampus?",
  description = `Step into the future of learning with UeCampus — where global opportunities meet true flexibility. We break down the barriers of traditional education by delivering world-class, accredited degrees online at a fraction of the usual cost. Study at your own pace, from anywhere in the world, while gaining knowledge, skills, and confidence that empower you to thrive.`,
  buttonText = "Read More",
  buttonLink = "#",
  backgroundImage = "https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png",
  gradient = "linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #7B1FA2 100%)",
  textColor = "text-white",
  highlightColor = "text-purple-300",
  buttonStyles="border-white text-white hover:bg-white/10 hover:text-white bg-transparent transition-all duration-200"
}: AboutSectionProps) {
  return (
    <section
      className="relative rounded-2xl p-4 lg:p-8 flex flex-col justify-between min-h-[500px] lg:min-h-[600px] overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}'), ${gradient}`,
        backgroundSize: "cover, auto",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundBlendMode: "overlay, normal",
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 space-y-6">
        {/* Label */}
        <div className="inline-block">
          <span
            className={`text-4xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight ${textColor}`}
          >
            {label}
          </span>
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className={`text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight ${textColor}`}
        >
          {title.split(" ").map((word, index) => (
            <span key={index} className="inline-block mr-2">
              {word}
            </span>
          ))}
          <span className={`inline-block ${highlightColor}`}>{highlight}</span>
        </motion.h2>

        {/* Description */}
        <p
          className={`text-base lg:text-lg ${textColor}/90 leading-relaxed max-w-lg`}
        >
          {description}
        </p>
      </div>

      {/* Read More Button */}
      {buttonText && (
        <div className="relative z-10 pt-4">
          <Link href={buttonLink}>
            <Button
              variant="outline"
              className={`${buttonStyles}`}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
