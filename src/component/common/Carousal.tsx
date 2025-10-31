"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  degree: string;
  country: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jacek",
    degree: "Bachelor of Business Administration in Marketing",
    country: "Poland",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    text: "Completing my BBA in Marketing at UeCampus was a game-changer for my career. The comprehensive curriculum and practical training equipped me with the skills and confidence to excel in the marketing industry. UeCampus truly prepares you for success.",
  },
  {
    id: 2,
    name: "Maria",
    degree: "Bachelor of Business Administration in Marketing",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    text: "The education I received at UeCampus transformed my perspective on business. The faculty is incredibly supportive and the curriculum is designed with real-world applications in mind. I feel fully prepared for my career ahead.",
  },
  {
    id: 3,
    name: "Ahmed",
    degree: "Bachelor of Business Administration in Marketing",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    text: "UeCampus provided me with not just theoretical knowledge but practical experience that matters. The networking opportunities and mentorship from industry professionals have been invaluable to my growth.",
  },
  {
    id: 4,
    name: "Sophie",
    degree: "Bachelor of Business Administration in Marketing",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    text: "The quality of education at UeCampus is exceptional. I gained hands-on experience through projects and internships that directly contributed to landing my dream job. Highly recommend this program!",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="relative w-full bg-white py-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="cubes"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 0 L 50 25 L 50 75 L 0 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M 50 25 L 100 0 L 100 50 L 50 75 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M 0 50 L 50 75 L 100 50 L 50 25 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#cubes)" />
        </svg>
      </div>

      {/* Content Section */}
      <div className="relative z-10 mx-auto p-4 flex flex-col lg:flex-row items-center gap-10 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="w-full lg:w-[450px] flex-shrink-0 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#6A1B9A] leading-tight">
            What Our <br className="hidden lg:block" /> Students Say
          </h2>
          <p className="mt-4 sm:mt-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            Hear directly from our students about their experiences, growth, and
            achievements at our university. Their stories reflect the quality of
            education and support we provide.
          </p>
        </div>

        {/* Right Section (Carousel) */}
        <div className="flex-1 relative w-full">
          <div className="relative mx-auto max-w-4xl sm:ml-20 w-full">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="w-full flex-shrink-0 px-3 sm:px-6 py-6 sm:py-8"
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                      {/* ✅ Image size increased here */}
                      <div className="relative h-56 w-44 sm:h-64 sm:w-52 md:h-72 md:w-60 lg:h-80 lg:w-64 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="h-full w-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Text */}
                      <div className="text-center md:text-left flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          {t.name} - {t.degree} - {t.country}
                        </h3>
                        <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                          {t.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-5 sm:mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-colors duration-300 ${
                  i === currentIndex ? "bg-gray-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
