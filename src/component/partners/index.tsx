"use client"

import Image from "next/image"

interface Logo {
    id: string
    name: string
    src: string
    alt: string
}

interface LogoCarouselProps {
    logos: Logo[]
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
    return (
        <section className="w-full bg-slate-800 py-12 md:py-16 lg:py-20">
            <div className=" mx-auto px-4 md:px-8">
                {/* Horizontal Scroll Container */}
                <div
                    className="flex gap-6 md:gap-8 lg:gap-10 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory"
                    style={{
                        scrollBehavior: "smooth",
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(148, 163, 184, 0.4) transparent",
                    }}
                >
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="flex-shrink-0 w-32 md:w-40 lg:w-48 h-20 md:h-24 lg:h-28 flex items-center justify-center  rounded-lg hover:bg-slate-700/60 transition-colors duration-300 snap-center"
                        >
                            <div className="relative w-24 md:w-32 lg:w-40 h-16 md:h-20 lg:h-24">
                                <Image
                                    src={logo.src || "/placeholder.svg"}
                                    alt={logo.alt}
                                    fill
                                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
                                    priority={false}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Scrollbar Styling */}
            <style jsx>{`
        div::-webkit-scrollbar {
          height: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.4);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.6);
        }
      `}</style>
        </section>
    )
}
