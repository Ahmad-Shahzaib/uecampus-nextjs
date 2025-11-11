"use client"

import React from "react"

interface FrequentlyAskedQuestionHeaderProps {
    title: string
    description: string[]
}

const FrequentlyAskedQuestionHeader: React.FC<FrequentlyAskedQuestionHeaderProps> = ({
    title,
    description,
}) => {
    return (
        <section className="px-4 md:px-5 lg:px-10 py-8 bg-white">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#6a1b9a] mb-2">
                {title}
            </h2>

            <div className="space-y-6 text-gray-800 leading-relaxed w-full">
                {description.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </section>
    )
}

export default FrequentlyAskedQuestionHeader
