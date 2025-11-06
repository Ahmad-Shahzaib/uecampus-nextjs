// src/component/about-us/AboutUsStats.tsx
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutData } from "@/redux/thunk/about";
import { RootState } from "@/redux/rootReducer";
import StatsCards from "@/component/common/StatsCards";
import BannerImage from "../Banner";
import { StatCard } from "./card";
import Aboutbanner from "../Banner/Aboutbanner";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Online Learning Platform",
  description: "Your Online Learning Platform, For the Community, For You.",
  url: "https://yourplatform.com",
  logo: "https://yourplatform.com/logo.png",
  sameAs: [
    "https://www.facebook.com/yourplatform",
    "https://www.twitter.com/yourplatform",
    "https://www.linkedin.com/company/yourplatform",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "100",
  },
};

export default function AboutUsStats() {
  const dispatch = useDispatch();
  
  // Get about data from Redux store
  const aboutData = useSelector((state: RootState) => state.about?.data);
  const isLoading = useSelector((state: RootState) => state.about?.isLoading);
  const error = useSelector((state: RootState) => state.about?.error);

  // Fetch data on component mount if not already loaded
  useEffect(() => {
    if (!aboutData && !isLoading) {
      dispatch(fetchAboutData());
    }
  }, [dispatch, aboutData, isLoading]);

  // Create stats data from API
  // Create stats data from API
const statsData = aboutData ? [
  {
    stat: aboutData.section2Title1,        // Maps to "36+"
    title: aboutData.section2Description1,  // Maps to "Total Programs"
    description: "Explore a wide range of flexible, career-focused programs.",
    variant: "dark",
  },
  {
    stat: aboutData.section2Title2,        // Maps to "4.9/5"
    title: aboutData.section2Description2,  // Maps to "Average course rating"
    description: "Trusted and highly rated by our students worldwide.",
    variant: "light",
  },
  {
    stat: aboutData.section2Title3,        // Maps to "90+"
    title: aboutData.section2Description3,  // Maps to "Active Students"
    description: "A growing global community of engaged learners.",
    variant: "light",
  },
] : [];

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading about data...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  // If no data yet, return null
  if (!aboutData) {
    return null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-white">
        <div className="m-5 rounded-2xl">
          <Aboutbanner
            imageUrl={aboutData.section2ImageUrl}
            title={aboutData.pageTitle}
          />
        </div>
        {/* Hero Section */}
        <section className="px-6 py-12">
          <div className="w-full mx-auto">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.4] font-semibold text-[#6A1B9A] mb-12 text-balance">
              Your Online Learning
              <br />
              Platform, For the
              <br />
              Community, For You.
            </h1>

            {/* Stats Cards Grid */}
            <StatsCards data={statsData} />
          </div>
        </section>
      </main>
    </>
  );
}