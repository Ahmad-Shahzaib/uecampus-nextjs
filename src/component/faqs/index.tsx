"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { faqItems } from "@/constants"

export default function Faqs() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: `
          url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9))
        `,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay */}
      <div className="absolute pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Section */}
          <div className="flex flex-col justify-center text-center lg:text-left space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Everything you need to know about{" "}
              <span className="text-purple-400">UeCampus</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
              Find quick answers to our most frequently asked questions about admissions, courses, and the student experience.
            </p>
          </div>

          {/* Right Section - FAQ Accordion */}
          <div className="w-full space-y-1">
            {faqItems.map((item, index) => {
              const isExpanded = expandedId === item.id
              return (
                <div
                  key={item.id}
                  className="border-b border-slate-700/60 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left transition-colors rounded-xl px-2 sm:px-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-[#999] font-semibold text-lg w-10 text-right">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium leading-snug text-white">
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <Minus className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                      ) : (
                        <Plus className="w-6 h-6 text-slate-400 transition-transform duration-300" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? "max-h-96 opacity-100 py-3 pl-14 pr-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
