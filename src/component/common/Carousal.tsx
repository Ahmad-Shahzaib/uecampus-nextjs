// src/component/TestimonialCarousel.tsx
"use client";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchStudentFeedbackData } from "@/redux/thunk/studentFeedback";

interface Testimonial {
  id: string;
  name: string;
  image: string;
  description: string;
  text: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

interface TestimonialCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const LazyImage = memo(
  ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className: string;
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    return (
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}
        {hasError ? (
          <div className="bg-gray-200 rounded-xl flex items-center justify-center h-full w-full">
            <div className="text-gray-400 text-sm">Image not available</div>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={className}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            loading="lazy"
          />
        )}
      </div>
    );
  }
);
LazyImage.displayName = "LazyImage";

const TestimonialCarousel = memo(
  ({
    autoPlay = false,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = true,
  }: TestimonialCarouselProps = {}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const dispatch = useDispatch();
    const {
      data: testimonials,
      isLoading,
      error,
    } = useSelector((state) => state.studentFeedback);

    const memoizedTestimonials = useMemo(
      () => testimonials || [],
      [testimonials]
    );

    useEffect(() => {
      if (memoizedTestimonials.length === 0) {
        dispatch(fetchStudentFeedbackData());
      }
    }, [dispatch, memoizedTestimonials.length]);

    useEffect(() => {
      if (!autoPlay || memoizedTestimonials.length <= 1 || isTransitioning)
        return;
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % memoizedTestimonials.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }, [
      autoPlay,
      autoPlayInterval,
      memoizedTestimonials.length,
      isTransitioning,
    ]);

    const navigate = useCallback(
      (direction: "prev" | "next") => {
        if (isTransitioning || memoizedTestimonials.length === 0) return;
        setIsTransitioning(true);
        if (direction === "prev") {
          setCurrentIndex((prev) =>
            prev === 0 ? memoizedTestimonials.length - 1 : prev - 1
          );
        } else {
          setCurrentIndex((prev) => (prev + 1) % memoizedTestimonials.length);
        }
        requestAnimationFrame(() =>
          setTimeout(() => setIsTransitioning(false), 300)
        );
      },
      [isTransitioning, memoizedTestimonials.length]
    );

    const handlePrevious = useCallback(() => navigate("prev"), [navigate]);
    const handleNext = useCallback(() => navigate("next"), [navigate]);

    if (isLoading)
      return (
        <section className="flex justify-center items-center h-64 bg-white">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6A1B9A]" />
        </section>
      );

    if (error)
      return (
        <section className="flex justify-center items-center h-64 bg-white text-red-600">
          Error loading testimonials
        </section>
      );

    if (memoizedTestimonials.length === 0)
      return (
        <section className="flex justify-center items-center h-64 bg-white text-gray-600">
          No testimonials available
        </section>
      );

    return (
      <section className="relative w-full min-h-screen bg-white py-10 sm:py-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
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

        {/* ✅ Responsive layout fixed here */}
        <div
          className="relative z-10 mx-auto sm:px-6 flex flex-col md:flex-col lg:flex-row 
lg:items-center lg:justify-between gap-8 lg:gap-12 min-h-[90vh]"
        >
          {/* Left Side: Title */}
          <div className="w-full lg:w-[45%] text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl xl:text-[100px]  text-[#6A1B9A] ">
              What Our <br className="hidden sm:block" /> Students Say
            </h2>
            <p className="mt-4 sm:mt-6 text-gray-700 text-sm sm:text-base md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Hear directly from our students about their experiences, growth,
              and achievements at our university. Their stories reflect the
              quality of education and support we provide.
            </p>
          </div>

          {/* Right Side: Carousel */}
          <div className="w-full lg:w-[55%] flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl md:max-w-3xl">
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl py-12">
                <div
                  className={`flex transition-transform duration-500 ease-in-out ${
                    isTransitioning ? "pointer-events-none" : ""
                  }`}
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {memoizedTestimonials.map(
                    (testimonial: Testimonial, index: number) => (
                      <div
                        key={testimonial.id}
                        className="w-full flex-shrink-0 p-6 sm:p-8"
                      >
                        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-8">
                          <div className="relative h-56 w-44 sm:h-64 sm:w-52 md:h-56 md:w-60 lg:h-72 lg:w-56 flex-shrink-0">
                            <LazyImage
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="h-full w-full object-cover rounded-xl shadow-md"
                            />
                          </div>
                          <div className="text-center md:text-left flex-1">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                              {testimonial.name} {testimonial.description}
                            </h3>
                            <p className="mt-3 text-gray-600 text-sm sm:text-sm italic leading-relaxed">
                              {testimonial.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Arrows */}
              {showArrows && memoizedTestimonials.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    disabled={isTransitioning}
                    className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition-all disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isTransitioning}
                    className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 transition-all disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}

              {/* Dots */}
              {showDots && memoizedTestimonials.length > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  {memoizedTestimonials.map((_: Testimonial, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-[#6A1B9A] scale-110"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
TestimonialCarousel.displayName = "TestimonialCarousel";

export default TestimonialCarousel;
