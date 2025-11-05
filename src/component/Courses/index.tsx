"use client";

import React, { useEffect, useState } from "react";
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
  
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchCoursesData({}));
  }, [dispatch]);

  // Debug
  useEffect(() => {
    console.log("Courses from API:", courses);
    console.log("Featured IDs:", CoursesSection_ue.map(c => c.id));
  }, [courses]);

  // Get featured course IDs from constants
  const featuredCourseIds = CoursesSection_ue.map(course => course.id);
  
  // Filter featured courses
  const featuredCourses = courses.filter(course => 
    featuredCourseIds.includes(course.id)
  );

  // Decide which courses to display
  const coursesToShow = showAll 
    ? courses 
    : featuredCourses.length > 0 
      ? featuredCourses.slice(0, 4) 
      : courses.slice(0, 4);

  const totalFeatured = featuredCourses.length;
  const hasMore = showAll ? false : (featuredCourses.length > 3 || courses.length > 3);

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

        <div className="flex gap-4">
          {!showAll && hasMore && (
            <Button
              onClick={() => setShowAll(true)}
              className="h-[40px] px-5 bg-[#6A1B9A] text-white rounded-md transition-colors duration-200 hover:bg-[#4a148c]"
            >
              View All Courses
            </Button>
          )}
          {showAll && (
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              className="h-[40px] px-5 border-[#6A1B9A] text-[#6A1B9A] rounded-md hover:bg-[#6A1B9A] hover:text-white"
            >
              Show Less
            </Button>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(275px,1fr))]">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="w-full h-80 bg-gray-300 dark:bg-gray-700 rounded-3xl"></div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-full text-center text-red-500 py-8">{error}</div>
        ) : coursesToShow.length > 0 ? (
          coursesToShow.map((course) => (
            <ProgramCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No courses available at the moment.
          </div>
        )}
      </div>

      {/* Optional: Show count */}
      {showAll && (
        <p className="text-center mt-8 text-gray-600">
          Showing all {courses.length} course{courses.length !== 1 ? 's' : ''}
        </p>
      )}
    </section>
  );
};

export default CourseSection;