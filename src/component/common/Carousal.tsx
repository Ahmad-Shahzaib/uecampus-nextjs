// src/component/TestimonialCarousel.tsx
"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchStudentFeedbackData } from "@/redux/thunk/studentFeedback";

interface Testimonial {
  id: string;
  name: string;
  degree: string;
  country: string;
  image: string;
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

// Memoized Image Component with lazy loading
const LazyImage = memo(({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

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
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

const TestimonialCarousel = memo(({ 
  autoPlay = false, 
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true
}: TestimonialCarouselProps = {}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const dispatch = useDispatch();
  const { data: testimonials, isLoading, error } = useSelector((state) => state.studentFeedback);

  // Memoize testimonials to prevent unnecessary re-renders
  const memoizedTestimonials = useMemo(() => testimonials || [], [testimonials]);

  useEffect(() => {
    if (memoizedTestimonials.length === 0) {
      dispatch(fetchStudentFeedbackData());
    }
  }, [dispatch, memoizedTestimonials.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || memoizedTestimonials.length <= 1 || isTransitioning) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % memoizedTestimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, memoizedTestimonials.length, isTransitioning]);

  // Debounced navigation functions
  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (isTransitioning || memoizedTestimonials.length === 0) return;
    
    setIsTransitioning(true);
    
    if (direction === 'prev') {
      setCurrentIndex(prev => prev === 0 ? memoizedTestimonials.length - 1 : prev - 1);
    } else {
      setCurrentIndex(prev => (prev + 1) % memoizedTestimonials.length);
    }
    
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      setTimeout(() => setIsTransitioning(false), 300);
    });
  }, [isTransitioning, memoizedTestimonials.length]);

  const handlePrevious = useCallback(() => navigate('prev'), [navigate]);
  const handleNext = useCallback(() => navigate('next'), [navigate]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex || memoizedTestimonials.length === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    requestAnimationFrame(() => {
      setTimeout(() => setIsTransitioning(false), 300);
    });
  }, [isTransitioning, currentIndex, memoizedTestimonials.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  }, [touchStart, touchEnd, handleNext, handlePrevious]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        handlePrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        handleNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(memoizedTestimonials.length - 1);
        break;
    }
  }, [handlePrevious, handleNext, goToSlide, memoizedTestimonials.length]);

  // Loading state component
  const LoadingComponent = useMemo(() => (
    <section className="relative w-full bg-white py-6 overflow-hidden">
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6A1B9A]"></div>
          <span className="text-lg text-gray-600">Loading testimonials...</span>
        </div>
      </div>
    </section>
  ), []);

  // Error state component
  const ErrorComponent = useMemo(() => (
    <section className="relative w-full bg-white py-6 overflow-hidden">
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-2">Error loading testimonials</div>
          {error && <div className="text-sm text-gray-500">{error}</div>}
          <button 
            onClick={() => dispatch(fetchStudentFeedbackData())}
            className="mt-4 px-4 py-2 bg-[#6A1B9A] text-white rounded-lg hover:bg-[#5A1A8A] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </section>
  ), [error, dispatch]);

  // Empty state component
  const EmptyComponent = useMemo(() => (
    <section className="relative w-full bg-white py-6 overflow-hidden">
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">No testimonials available</div>
      </div>
    </section>
  ), []);

  // Early returns for different states
  if (isLoading) return LoadingComponent;
  if (error) return ErrorComponent;
  if (memoizedTestimonials.length === 0) return EmptyComponent;

  return (
    <section 
      className="relative w-full bg-white py-6 overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Student testimonials carousel"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
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
            <div 
              className="overflow-hidden rounded-2xl bg-white shadow-lg"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={`flex transition-transform duration-300 ease-out ${isTransitioning ? 'pointer-events-none' : ''}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                role="listbox"
                aria-label="Student testimonials"
              >
                {memoizedTestimonials.map((testimonial: Testimonial, index: number) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-3 sm:px-6 py-6 sm:py-8"
                    role="option"
                    aria-selected={index === currentIndex}
                    aria-label={`Testimonial ${index + 1} of ${memoizedTestimonials.length}`}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                      {/* Image */}
                      <div className="relative h-56 w-44 sm:h-64 sm:w-52 md:h-72 md:w-60 lg:h-80 lg:w-64 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                        <LazyImage
                          src={testimonial.image}
                          alt={`${testimonial.name} - Student from ${testimonial.country}`}
                          className="h-full w-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Text */}
                      <div className="text-center md:text-left flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          {testimonial.name}
                          {testimonial.degree && ` - ${testimonial.degree}`}
                          {testimonial.country && ` - ${testimonial.country}`}
                        </h3>
                        <blockquote className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                          "{testimonial.text}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {showArrows && memoizedTestimonials.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A] focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  aria-label="Previous testimonial"
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A] focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  aria-label="Next testimonial"
                  type="button"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </>
            )}
          </div>

          {/* Pagination Dots */}
          {showDots && memoizedTestimonials.length > 1 && (
            <div className="mt-5 sm:mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {memoizedTestimonials.map((testimonial: Testimonial, index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A] focus:ring-opacity-50 disabled:cursor-not-allowed ${
                    index === currentIndex 
                      ? "bg-[#6A1B9A] scale-110" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                  type="button"
                />  
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

TestimonialCarousel.displayName = 'TestimonialCarousel';

export default TestimonialCarousel;