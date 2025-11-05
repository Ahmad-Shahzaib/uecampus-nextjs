// src/component/Faqs.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchFaqsData } from "@/redux/thunk/faqs";

export default function Faqs() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const { faqContent, data: faqs, isLoading, error } = useSelector((state) => state.faqs);

  useEffect(() => {
    dispatch(fetchFaqsData());
  }, [dispatch]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-hidden text-white font-sans flex items-center justify-center"
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
        <div className="text-xl">Loading FAQs...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen overflow-hidden text-white font-sans flex items-center justify-center"
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
        <div className="text-xl text-red-400">Error loading FAQs: {error}</div>
      </section>
    );
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT – Headline */}
          <div className="flex flex-col justify-center text-center lg:text-left lg:items-start min-h-[500px] lg:min-h-screen">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.6] font-medium">
              {faqContent?.title || "Everything you need to know about UeCampus"}
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-lg">
              {faqContent?.description || "Frequently Asked Questions"}
            </p>
          </div>

          {/* RIGHT – FAQ Accordion */}
          <div className="w-full space-y-4">
            {faqs.map((item, idx) => {
              const isOpen = expandedId === item._id;
              return (
                <div
                  key={item._id}
                  className="border-b border-slate-700/60 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleExpand(item._id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors rounded-xl px-2 sm:px-4 hover:bg-slate-800/40"
                  >
                    <div className="flex flex-1 items-center gap-4">
                      {/* NUMBER */}
                      <span
                        className="text-4xl accordion-number text-right font-extrabold text-[#999]"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* QUESTION */}
                      <h3 className="text-base sm:text-lg font-medium leading-snug text-white">
                        {item.question}
                      </h3>
                    </div>

                    {/* ICON */}
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <Minus className="h-6 w-6 text-purple-400 transition-transform duration-300" />
                      ) : (
                        <Plus className="h-6 w-6 text-slate-400 transition-transform duration-300" />
                      )}
                    </div>
                  </button>

                  {/* ANSWER */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-96 opacity-100 py-3 pl-16 pr-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}