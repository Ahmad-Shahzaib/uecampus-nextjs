"use client"

import { useState } from "react"
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

  const itemsPerPage = 4
  const logoCount = logos.length
  const [start, setStart] = useState(0)
  const showControls = logoCount > 1

  const next = () => setStart((s) => (s + 1) % logoCount)
  const prev = () => setStart((s) => (s - 1 + logoCount) % logoCount)

  const visibleLogos = Array.from({ length: itemsPerPage }).map((_, i) => logos[(start + i) % logoCount])

  return (
    <section className="w-full py-12 hidden lg:block bg-purple-900">
      <div className="max-w-screen-2xl mx-auto px-6 relative">
        <div className="flex items-center justify-center">
          <div className={`w-full`}>
            <div className={`flex items-center ${showControls ? 'justify-start' : 'justify-center '}`}>
              {visibleLogos.map((logo, idx) => (
                <div
                  key={`${logo.id}-${(start + idx) % logoCount}-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-1/4 h-32 md:h-36 lg:h-40 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative w-[80%] h-24 md:h-28 lg:h-32">
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

          {showControls && (
            <>
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={next}
                aria-label="Next"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </>
          )}

        </div>

        {showControls && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: logoCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStart(idx)}
                aria-label={`Go to item ${idx + 1}`}
                className={`h-2 w-2 rounded-full ${idx === start ? 'bg-gray-300' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default LogoCarousel