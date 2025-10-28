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
        <div
            className="min-h-screen   text-white overflow-hidden relative"
            style={{
                backgroundImage: `
                    url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
                    linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9))
                `,
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Optional: Add a dark scrim for extra contrast */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Section */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
                            Everything you need to know about UeCampus
                        </h1>
                    </div>

                    {/* Right Section - FAQ Accordion */}
                    <div className="space-y-0">
                        {faqItems.map((item, index) => (
                            <div key={item.id} className="border-b border-slate-700">
                                <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="w-full py-6 flex items-start justify-between gap-4 hover:bg-slate-800/30 transition-colors group"
                                >
                                    <div className="flex items-start gap-4 flex-1 text-left">
                                        <span className="text-slate-500 font-light text-lg min-w-fit pt-1">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="text-lg font-medium text-white group-hover:text-slate-100 transition-colors">
                                            {item.question}
                                        </h3>
                                    </div>
                                    <div className="flex-shrink-0 pt-1">
                                        {expandedId === item.id ? (
                                            <Minus className="w-6 h-6 text-slate-400" />
                                        ) : (
                                            <Plus className="w-6 h-6 text-slate-400" />
                                        )}
                                    </div>
                                </button>

                                {expandedId === item.id && (
                                    <div className="pb-6 pl-12 pr-4 animate-in fade-in duration-300">
                                        <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}