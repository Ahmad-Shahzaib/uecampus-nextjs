"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "./CourseCard";
import { CoursesSection_ue } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { AppDispatch } from "@/redux/store";

interface Course {
  id: number;
  name: string;
  slug: string;
  small_description: string;
  image_path: string;
}

const CourseSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: courses, isLoading, error } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchCoursesData({}));
  }, [dispatch]);

  // Debug: Log the courses data
  useEffect(() => {
    console.log("Courses from API:", courses);
    console.log("Featured course IDs:", CoursesSection_ue.map(c => c.id));
  }, [courses]);

  // Get the IDs of courses we want to feature
  const featuredCourseIds = CoursesSection_ue.map(course => course.id);
  
  // Filter courses to only show featured ones
  const featuredCourses = courses.filter(course => 
    featuredCourseIds.includes(course.id)
  );

  // Fallback: If no featured courses, show all courses
  const coursesToShow = featuredCourses.length > 0 ? featuredCourses : courses;

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 sm:py-20 px-4 sm:px-4 lg:px-10"
      style={{
        backgroundImage:
          "url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-box-line-background.png')",
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#6A1B9A] leading-tight">
          Want to know more <br className="hidden sm:block" /> about our courses?
        </h2>

        <Button
          className="inline-block h-[40px] px-5 bg-[#6A1B9A] text-white rounded-md no-underline transition-colors duration-200 hover:bg-[#4a148c]"
        >
          View All Courses
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(275px,1fr))]">
        {isLoading ? (
          // Loading state
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="w-full h-80 bg-gray-800 rounded-3xl"></div>
            </div>
          ))
        ) : error ? (
          // Error state
          <div className="col-span-full text-center text-red-500 py-8">
            {error}
          </div>
        ) : coursesToShow.length > 0 ? (
          // Display courses (featured or all as fallback)
          coursesToShow.map((course) => (
            <ProgramCard key={course.id} course={course} />
          ))
        ) : (
          // No courses available
          <div className="col-span-full text-center text-gray-500 py-8">
            No courses available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSection;