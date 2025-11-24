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
  if (logos.length === 0) return null

  const isScrollable = logos.length > 4

  return (
    <section className="w-full py-12 hidden lg:block bg-gray-900">
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Scroll Container */}
        <div className={`overflow-x-auto ${isScrollable ? 'scrollbar-custom' : ''}`}>
          <div
            className={`
              flex items-center
              ${isScrollable
                ? 'justify-start min-w-max gap-12 lg:gap-16 xl:gap-20'
                : 'justify-center gap-10 md:gap-14 lg:gap-20'
              }
            `}
          >
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex-shrink-0 flex items-center justify-center w-48 h-32 md:w-56 md:h-36 lg:w-64 lg:h-40 transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-full h-28 md:h-32 lg:h-36">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    fill
                    className="object-contain drop-shadow-md"
                    sizes="(max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar - Sirf tab dikhe jab scroll ho */}
      {isScrollable && (
        <style jsx>{`
          .scrollbar-custom::-webkit-scrollbar {
            height: 8px;
          }
          .scrollbar-custom::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: rgba(100, 116, 139, 0.5);
            border-radius: 4px;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb:hover {
            background: rgba(100, 116, 139, 0.8);
          }
        `}</style>
      )}
    </section>
  )
}