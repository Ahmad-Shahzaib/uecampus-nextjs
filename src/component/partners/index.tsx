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
    <section className="w-full py-8 hidden lg:block">
      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
        <div className="flex gap-3 sm:gap-5 md:gap-7 items-center">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex-shrink-0 w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 h-16 sm:h-20 md:h-24 lg:h-32 xl:h-32 flex items-center justify-center rounded-xl transition-all duration-300 snap-center"
            >
              <div className="relative w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-12 sm:h-16 md:h-24 lg:h-28 xl:h-32">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  fill
                  className="object-contain filter hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  sizes="(max-width: 640px) 70px, (max-width: 768px) 85px, (max-width: 1024px) 135px, (max-width: 1280px) 170px"
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
