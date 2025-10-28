"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function ProgramCard() {
    return (
        <article className="w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
            {/* Card Container */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                {/* Badge */}
                <div className="mb-6 flex justify-start">
                    <Badge
                        variant="secondary"
                        className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-purple-600 hover:bg-white"
                    >
                        Marketing
                    </Badge>
                </div>

                {/* Heading */}
                <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
                    Bachelor of Marketing – PPA Business School
                </h1>

                {/* Description */}
                <p className="mb-8 text-base sm:text-lg text-slate-200 leading-relaxed text-pretty">
                    Designed to launch your career into the fast-paced marketing industry, this program equips you with
                    cutting-edge knowledge and practical skills.
                </p>

                {/* Image Container */}
                <div className="relative w-full overflow-hidden rounded-2xl aspect-video sm:aspect-auto sm:h-64 lg:h-72">
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3KCUeAXehjWFJLqEBvikG7IzMf48xj.png"
                        alt="Marketing students collaborating on a project with design materials and charts on the table"
                        fill
                        className="object-cover"
                    />
                </div>

            </div>
        </article>
    )
}
