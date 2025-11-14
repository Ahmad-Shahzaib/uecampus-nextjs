"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutData } from "@/redux/thunk/about";
import { RootState } from "@/redux/rootReducer";
import StatsCards from "@/component/common/StatsCards";
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
  const dispatch = useDispatch<any>();
  const { data: aboutData, isLoading, error } = useSelector(
    (state: RootState) => state.about ?? ({ data: null, isLoading: false, error: null } as any)
  );

  useEffect(() => {
    if (!aboutData && !isLoading) dispatch(fetchAboutData());
  }, [dispatch, aboutData, isLoading]);

  const statsData = useMemo(() => {
    if (!aboutData) return [];
    return [
      {
        stat: aboutData.section2Title1,
        title: aboutData.section2Description1,
        description: "Explore a wide range of flexible, career-focused programs.",
        variant: "dark",
      },
      {
        stat: aboutData.section2Title2,
        title: aboutData.section2Description2,
        description: "Trusted and highly rated by our students worldwide.",
        variant: "light",
      },
      {
        stat: aboutData.section2Title3,
        title: aboutData.section2Description3,
        description: "A growing global community of engaged learners.",
        variant: "light",
      },
    ];
  }, [aboutData]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading about data...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );

  if (!aboutData) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-white">
        <div className="m-5 rounded-2xl pt-3">
          <Aboutbanner imageUrl={aboutData.section2ImageUrl} title={aboutData.pageTitle} />
        </div>
        <section className="px-6 py-12">
          <div className="w-full mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[70px] leading-[1.4] font-semibold text-[#6A1B9A] mb-12 text-balance">
              Your Online Learning
              <br />
              Platform, For the
              <br />
              Community, For You.
            </h1>
            <StatsCards data={statsData} />
          </div>
        </section>
      </main>
    </>
  );
}