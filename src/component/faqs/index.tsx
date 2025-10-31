"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function Faqs() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "What is UeCampus?",
      answer:
        "UeCampus is an online learning platform offering a variety of courses and degrees.",
    },
    {
      id: 2,
      question: "How do I enroll in a course?",
      answer:
        "You can enroll by visiting the UeCampus website and following the registration process.",
    },
    {
      id: 3,
      question: "Are the degrees recognized globally?",
      answer:
        "Yes, UeCampus degrees are recognized globally by accredited institutions.",
    },
    {
      id: 4,
      question: "Can I study part-time?",
      answer:
        "Yes, part-time study options are available to suit your schedule.",
    },
    {
      id: 5,
      question: "What support is available for students?",
      answer:
        "Students receive 24/7 support, including academic advising and technical assistance.",
    },
    {
      id: 6,
      question: "How much does it cost?",
      answer:
        "Costs vary by course; please check the UeCampus website for detailed pricing.",
    },
    {
      id: 7,
      question: "Is there a mobile app for studying?",
      answer:
        "Yes, UeCampus offers a mobile app for convenient learning on the go.",
    },
  ];

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.6] font-medium ">
              Everything you
              <br />
              need to know about
              <br />
              <span className="text-white">UeCampus</span>
            </h1>
          </div>

          {/* RIGHT – FAQ Accordion */}
          <div className="w-full space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-slate-700/60 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors rounded-xl px-2 sm:px-4 hover:bg-slate-800/40"
                  >
                    <div className="flex flex-1 items-center gap-4">
                      {/* NUMBER – EXACTLY LIKE IN IMAGE */}
                      <span
                        className="text-4xl accordion-number text-right    font-extrabold text-[#999]"
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
                        ? "max-h-96 opacity-100 py-3 pl-16 pr-4" // pl-16 aligns with w-12 + gap
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