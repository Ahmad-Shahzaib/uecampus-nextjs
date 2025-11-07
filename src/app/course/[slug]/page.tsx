// src/app/course/[slug]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/redux/rootReducer";
import { fetchDetailCourseData } from "@/redux/thunk/detailCourseThunk";

import ContactUsSection from '@/component/contact-us/contact/ContactUsSection';
import CoursesFeaturesCards from '@/component/Courses/slug/courseFeatures';
import ProgramPage from '@/component/Courses/slug/courses-programs';
import CourseDetailHeader from '@/component/Courses/slug/header';
import JoinUs from '@/component/joinus';

const DetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  
  const slug = params?.slug as string;
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.detailCourse
  );

  // Fetch course data by slug on mount
  useEffect(() => {
    if (slug && !data) {
      console.log("Fetching course data for slug:", slug);
      dispatch(fetchDetailCourseData(slug));
    }
  }, [dispatch, slug, data]);

  // ---------- LOADING ----------
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading course details...</div>
      </div>
    );
  }

  // ---------- ERROR ----------
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  // ---------- NO DATA ----------
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Course not found.</div>
      </div>
    );
  }

  // ---------- SUCCESS ----------
  const { course } = data;

  return (
    <div className="space-y-4">
      {/* Pass ONLY name + image_path to Header */}
      <CourseDetailHeader 
        name={course.name} 
        bgImage={course.image_path}
      />
      
      {/* Other components (no props for now - you can add later) */}
      <CoursesFeaturesCards />
      <ProgramPage />
      <ContactUsSection />
      <JoinUs />
    </div>
  );
};

export default DetailPage;