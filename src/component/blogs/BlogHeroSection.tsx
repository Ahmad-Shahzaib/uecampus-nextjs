'use client';

import React, { useState } from 'react';

const BlogHeroSection = () => {
  const [isContactVisible, setIsContactVisible] = useState(true);

  const toggleContact = () => {
    setIsContactVisible(!isContactVisible);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80"
          alt="Library Background"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {/* <span className="text-white">Ebsolute</span>{' '} */}
              <span className="text-white">Blogs</span>
            </h1>
            <p className="text-white text-lg md:text-xl lg:text-2xl font-light">
              Be inspired by the latest trends that shape the world. Be the next one!
            </p>
          </div>
        </div>
      </div>

      {/* Floating Contact Icons - Right Side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        {/* Contact Icons Container */}
        <div
          className={`bg-black rounded-l-full transition-all duration-300 ease-in-out ${
            isContactVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center py-4 px-3 space-y-4">
            {/* Email Icon */}
            <a
              href="mailto:contact@example.com"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 transition-all duration-300 group"
              aria-label="Email"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-black transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>

            {/* Phone Icon */}
            <a
              href="tel:+1234567890"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 transition-all duration-300 group"
              aria-label="Phone"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-black transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>

            {/* WhatsApp Icon */}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 transition-all duration-300 group"
              aria-label="WhatsApp"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-black transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
            </a>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleContact}
          className={`absolute top-1/2 -translate-y-1/2 w-10 h-16 bg-black rounded-l-full flex items-center justify-center transition-all duration-300 hover:bg-gray-900 ${
            isContactVisible ? '-left-10' : 'left-0'
          }`}
          aria-label="Toggle Contact"
        >
          <svg
            className={`w-5 h-5 text-white transition-transform duration-300 ${
              isContactVisible ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default BlogHeroSection;
