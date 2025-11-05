// src/component/education/sections/about/index.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAboutSectionData } from "@/redux/thunk/aboutSection";
import { AppDispatch } from "@/redux/store";

export function AboutSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: about, isLoading, error } = useSelector(
    (state: RootState) => state.aboutSection
  );

  useEffect(() => {
    // fetch every time the component mounts
    dispatch(fetchAboutSectionData());
  }, [dispatch]);

  /* ------------------------------------------------------------------ */
  /*  LOADING                                                       */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  ERROR                                                          */
  /* ------------------------------------------------------------------ */
  if (error || !about) {
    return (
      <section className="relative rounded-2xl p-4 lg:p-8 flex flex-col justify-center items-center min-h-[500px] bg-red-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Error Loading Section</h2>
        <p className="mb-4">{error ?? "No data available"}</p>
        <button
          onClick={() => dispatch(fetchAboutSectionData())}
          className="px-6 py-2 bg-white text-red-900 rounded hover:bg-gray-200 transition"
        >
          Retry
        </button>
      </section>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  SUCCESS – render only API data                                 */
  /* ------------------------------------------------------------------ */
  const {
    title,
    title2,
    description,
    buttonText,
    buttonLink,
    backgroundImage,
  } = about;

  const gradient = "linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #7B1FA2 100%)";
  const buttonStyles =
    "border-white text-white hover:bg-white/10 bg-transparent transition-all duration-200";

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
      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Label */}
        <div className="inline-block">
          <span className="text-4xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white">
            {title}
          </span>
        </div>

        {/* Main title */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white"
        >
          {title2}
        </motion.h2>

        {/* Description */}
        <p className="text-base lg:text-lg text-white/90 leading-relaxed max-w-lg">
          {description}
        </p>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-8">
        <Link href={buttonLink ?? "#"}>
          <Button className={buttonStyles}>{buttonText}</Button>
        </Link>
      </div>
    </section>
  );
}