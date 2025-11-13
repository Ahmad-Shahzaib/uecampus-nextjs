"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function AboutSection({ about, isLoading, error }: any) {
  if (isLoading) {
    return (
      <section className="relative rounded-2xl p-4 lg:p-8 flex flex-col justify-between min-h-[500px] lg:min-h-[600px] overflow-hidden bg-gray-800">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-32 bg-gray-700 rounded"></div>
          <div className="h-12 w-3/4 bg-gray-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
          </div>
          <div className="h-10 w-32 bg-gray-700 rounded"></div>
        </div>
      </section>
    );
  }

  const {
    title = "",
    title2 = "",
    description = "",
    buttonText = "Learn more",
    buttonLink = "#",
    backgroundImage,
  } = about ?? {};

  const gradient = "linear-gradient(#6A1B9A)";

  const buttonStyles =
    "border-white rounded-md text-white hover:bg-white/10 bg-transparent transition-all duration-200";

  return (
    <section
      className="relative rounded-2xl px-4 py-12 sm:p-8 lg:p-8 flex flex-col justify-between min-h-[500px] lg:min-h-[600px] overflow-hidden"
      style={{
        background: backgroundImage
          ? `url('${backgroundImage}'), ${gradient}`
          : gradient,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Grid Line Overlay (opacity 0.15) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          zIndex: 1,
        }}
      />

      {/* Optional: Background Image Layer (behind gradient) */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            zIndex: 0,
          }}
        />
      )}

      {/* Content (on top) */}
      <div className="relative z-10 space-y-6">
        {/* Label */}
        <div className="inline-block">
          <span className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-semibold leading-tight tracking-tight text-white">
            {title}
          </span>
        </div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white"
        >
          {title2}
        </motion.h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg lg:text-lg text-white/90 leading-relaxed max-w-lg">
          {description}
        </p>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 mt-8">
        <Link href={buttonLink ?? "#"}>
          <Button className={buttonStyles}>{buttonText}</Button>
        </Link>
      </div>
    </section>
  );
}