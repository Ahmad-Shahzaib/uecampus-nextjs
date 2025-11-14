// src/component/Faqs.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchFaqsData } from "@/redux/thunk/faqs";
import { FaqItem, FaqContent } from "./types";
import FaqItemComponent from "./FaqItem";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorState from "./ErrorState";

export default function Faqs() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const { faqContent, data: faqs, isLoading, error } = useSelector((state) => state.faqs);

  useEffect(() => {
    if (faqs.length === 0 && !isLoading && !error) {
      dispatch(fetchFaqsData());
    }
  }, [dispatch, faqs.length, isLoading, error]);

  // Memoized toggle function for better performance
  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  // Retry function for error state
  const handleRetry = useCallback(() => {
    dispatch(fetchFaqsData());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden text-white font-sans"
      style={{
        backgroundImage: `
          url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
          linear-gradient(to bottom, rgb(27 35 42), rgb(27 35 42))
        `,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT – Headline */}
          <div className="flex flex-col justify-center text-center lg:text-left lg:items-start  lg:min-h-screen">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.6] font-normal">
              {faqContent?.title || ""}
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-lg">
              {faqContent?.description || "Frequently Asked Questions"}
            </p>
          </div>

          {/* RIGHT – FAQ Accordion */}
          <div className="w-full space-y-4">
            {faqs.map((item: FaqItem, idx: number) => {
              const isOpen = expandedId === item._id;
              return (
                <FaqItemComponent
                  key={item._id}
                  item={item}
                  index={idx}
                  isOpen={isOpen}
                  onToggle={toggleExpand}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}