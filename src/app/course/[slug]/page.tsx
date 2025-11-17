// src/app/course/[slug]/page.tsx
"use client";

import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "@/redux/store";
import { useParams } from "next/navigation";
import { RootState } from "@/redux/rootReducer";
import { fetchDetailCourseData } from "@/redux/thunk/detailCourseThunk";
import { resetDetailCourseState } from "@/redux/slices/detailCourseSlice";

import ContactUsSection from '@/component/contact-us/contact/ContactUsSection';
import CoursesFeaturesCards from '@/component/Courses/slug/courseFeatures';
import ProgramPage from '@/component/Courses/slug/courses-programs';
import CourseDetailHeader from '@/component/Courses/slug/header';
import JoinUs from '@/component/joinus';

const DetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const previousSlugRef = useRef<string | null>(null);
  
  const slug = params?.slug as string;
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.detailCourse
  );

  // Fetch course data by slug and reset stale state when slug changes
  useEffect(() => {
    if (!slug) return;

    if (previousSlugRef.current !== slug) {
      dispatch(resetDetailCourseState());
      previousSlugRef.current = slug;
    }

    dispatch(fetchDetailCourseData(slug));
  }, [dispatch, slug]);

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

  const hasDataForSlug = data?.course?.slug === slug;

  // ---------- NO DATA OR STALE DATA ----------
  if (!data || !hasDataForSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">
          {isLoading ? "Loading course details..." : "Course not found."}
        </div>
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