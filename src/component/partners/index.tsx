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
    <section className="w-full py-8">
      <div className="">
        <div
          className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(148,163,184,0.4) transparent",
          }}
        >
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex-shrink-0 w-28 sm:w-32 md:w-40 lg:w-48 h-16 sm:h-20 md:h-24 lg:h-28 flex items-center justify-center rounded-xl transition-colors duration-300 snap-center"
            >
              <div className="relative w-20 sm:w-28 md:w-32 lg:w-40 h-18 sm:h-20 md:h-28 lg:h-36">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 128px, 160px"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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
