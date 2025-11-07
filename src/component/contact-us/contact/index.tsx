"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchContactUsData } from "@/redux/thunk/contactUsThunk";
import { ContactUsData } from "@/redux/slices/contactUsSlice";
import { useImageLoader } from "@/hooks/useImageLoader";

export default function ContactPage() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.contactUs
  );
  
  // Use the image loader hook
  const {
    isLoading: imageLoading,
    hasError: imageError,
    handleLoad,
    handleError,
  } = useImageLoader(data?.contact_image);

  // Fetch once on mount
  useEffect(() => {
    if (!data) {
      dispatch(fetchContactUsData() as any);
    }
  }, [dispatch, data]);

  // ---------- LOADING ----------
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A1B9A]"></div>
          <div className="text-xl text-gray-600">Loading contact information...</div>
        </div>
      </main>
    );
  }

  // ---------- ERROR ----------
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 mb-2">Failed to load contact information</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={() => dispatch(fetchContactUsData() as any)}
            className="px-4 py-2 bg-[#6A1B9A] text-white rounded-lg hover:bg-[#5A1A7A] transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // ---------- NO DATA ----------
  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <div className="text-xl text-gray-600 mb-4">No contact data available.</div>
          <button
            onClick={() => dispatch(fetchContactUsData() as any)}
            className="px-4 py-2 bg-[#6A1B9A] text-white rounded-lg hover:bg-[#5A1A7A] transition-colors"
          >
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full ">
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">
          {/* Left Column - Dynamic Image */}
          <div className="w-full lg:w-1/2 relative">
            {/* Image Loading State */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6A1B9A]"></div>
              </div>
            )}
            
            {/* Error State - Fallback */}
            {imageError ? (
              <div className="w-full h-64 lg:h-full bg-gradient-to-br from-[#6A1B9A] to-[#8E24AA] flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📧</div>
                  <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                  <p className="text-lg opacity-90">Get in touch with our team</p>
                </div>
              </div>
            ) : (
              /* Actual Image */
              <img
                src={data.contact_image}
                alt="Contact us - Get in touch with our team"
                className={`w-full h-64 lg:h-full object-cover transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
              />
            )}
          </div>

          {/* Right Column - Dynamic Content */}
          <div className="w-full lg:w-1/2 bg-[#6A1B9A] p-6 lg:p-8 text-white flex flex-col justify-center">
            {/* Header */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Contact Us
            </h1>

            {/* Dynamic HTML description with better styling */}
            <div
              className="prose prose-invert prose-lg max-w-none text-base lg:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.contact_description }}
              style={{
                /* Custom styles for better readability */
                lineHeight: "1.6",
              }}
            />

            {/* Optional: Add a call-to-action button */}
            <div className="mt-8">
              <a
                href="#contact-form"
                className="inline-block px-6 py-3 bg-white text-[#6A1B9A] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}