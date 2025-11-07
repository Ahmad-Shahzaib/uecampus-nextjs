"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchContactUsData } from "@/redux/thunk/contactUsThunk";

export default function ContactPage() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.contactUs
  );

  // Fetch once on mount
  useEffect(() => {
    if (!data) {
      dispatch(fetchContactUsData());
    }
  }, [dispatch, data]);

  // ---------- LOADING ----------
  if (isLoading) {
    return (
      <main className=" flex items-center justify-center">
        <div className="text-xl">Loading contact information...</div>
      </main>
    );
  }

  // ---------- ERROR ----------
  if (error) {
    return (
      <main className=" flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </main>
    );
  }

  // ---------- NO DATA ----------
  if (!data) {
    return (
      <main className=" flex items-center justify-center">
        <div className="text-xl">No contact data available.</div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center p-4">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl gap-6">
          {/* Left Column - Image (from API) */}
          <div className="w-full lg:w-1/2 h-auto">
            <img
              src={data.contact_image}
              alt="Contact us"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Right Column - Contact Information (HTML from API) */}
          <div className="w-full h-auto lg:w-1/2 bg-[#6A1B9A] p-6 lg:p-8 rounded-2xl text-white">
            {/* Header (kept static – you can also make it dynamic if needed) */}
            <h1 className="text-3xl lg:text-4xl font-medium mb-6 text-white">
              Contact Us
            </h1>

            {/* Dynamic HTML description */}
            <div
              className="prose prose-invert max-w-none text-base lg:text-lg"  
              dangerouslySetInnerHTML={{ __html: data.contact_description }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}