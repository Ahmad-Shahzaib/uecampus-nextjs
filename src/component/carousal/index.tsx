"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  degree: string
  country: string
  image: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jacek",
    degree: "Bachelor of Business Administration in Marketing",
    country: "Poland",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    text: "Completing my BBA in Marketing at UeCampus was a game-changer for my career. The comprehensive curriculum and practical training equipped me with the skills and confidence to excel in the marketing industry. UeCampus truly prepares you for success.",
  },
  {
    id: 2,
    name: "Maria",
    degree: "Bachelor of Business Administration in Marketing",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    text: "The education I received at UeCampus transformed my perspective on business. The faculty is incredibly supportive and the curriculum is designed with real-world applications in mind. I feel fully prepared for my career ahead.",
  },
  {
    id: 3,
    name: "Ahmed",
    degree: "Bachelor of Business Administration in Marketing",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    text: "UeCampus provided me with not just theoretical knowledge but practical experience that matters. The networking opportunities and mentorship from industry professionals have been invaluable to my growth.",
  },
  {
    id: 4,
    name: "Sophie",
    degree: "Bachelor of Business Administration in Marketing",
    country: "France",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    text: "The quality of education at UeCampus is exceptional. I gained hands-on experience through projects and internships that directly contributed to landing my dream job. Highly recommend this program!",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handlePrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const isBeginning = currentIndex === 0
  const isEnd = currentIndex === testimonials.length - 1

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-20">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="cubes" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 50 25 L 50 75 L 0 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 50 25 L 100 0 L 100 50 L 50 75 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 0 50 L 50 75 L 100 50 L 50 25 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#cubes)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-balance text-4xl font-bold text-purple-600 md:text-5xl lg:text-6xl">
              What Our Students Say
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-700 md:text-lg">
              Hear directly from our students about their experiences, growth, and achievements at our university. Their
              stories reflect the quality of education and support we provide.
            </p>
          </div>

          {/* Right Carousel */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full px-12 md:px-16">
              {/* Carousel Container */}
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <div className="flex flex-col items-center gap-6 pb-4">
                        {/* Student Image */}
                        <div className="relative h-80 w-64 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Testimonial Content */}
                        <div className="flex flex-col gap-3 text-center px-4">
                          <h3 className="text-base font-semibold text-gray-900 md:text-lg">
                            {testimonial.name} - {testimonial.degree} - {testimonial.country}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-600 md:text-base">{testimonial.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevious}
                disabled={isBeginning}
                className="absolute left-0 top-40 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white transition-all hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={handleNext}
                disabled={isEnd}
                className="absolute right-0 top-40 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white transition-all hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-gray-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}