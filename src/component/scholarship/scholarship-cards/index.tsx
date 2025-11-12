"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/rootReducer";
import { fetchScholarshipData } from "@/redux/thunk/scholarship";

const ScholarshipCards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector((state: RootState) => state.scholarship);

  useEffect(() => {
    // Fetch data if not already loaded
    if (!data) {
      dispatch(fetchScholarshipData());
    }
  }, [dispatch, data]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 py-8 px-4 sm:px-6">
        <div className="animate-pulse bg-gray-800 rounded-2xl h-64"></div>
        <div className="animate-pulse bg-gray-800 rounded-2xl h-64"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8 px-4 sm:px-6">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error loading scholarship data</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6  px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* First Scholarship Card */}
      <div className="relative bg-[#1b232a] text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg w-full">
        {/* Logo at top right */}
       
        
        {/* Content */}
        <div className="pr-16 sm:pr-20 lg:pr-24">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4 sm:mb-6 max-w-[90%]">
            {data.scholarship1Title || "Academic Excellence Scholarship"}
          </h2>
          
          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
            {data.scholarship1Description || "This scholarship is awarded to outstanding students who demonstrate exceptional academic achievement. Whether you're a high-performing high school graduate or a top-ranking university student, UeCampus recognizes your hard work and dedication. Eligible applicants may receive partial or full tuition support based on their academic performance and qualifications."}
          </p>
        </div>
      </div>

      {/* Second Scholarship Card */}
      <div className="relative bg-[#2B303A] text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg w-full">
        {/* Logo at top right */}
        
        
        {/* Content */}
        <div className="pr-16 sm:pr-20 lg:pr-24">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4 sm:mb-6 max-w-[90%]">
            {data.scholarship2Title || "Scholarships for Residents of Developing Countries"}
          </h2>
          
          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
            {data.scholarship2Description || "We are committed to creating global learning opportunities, especially for students from regions with limited access to higher education. This scholarship is specifically designed to support residents of developing countries by offering substantial tuition reductions. It aims to empower talented individuals who are eager to advance their education and make a positive impact in their communities."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipCards;

