"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "./CourseCard";
import { CoursesSection_ue } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchCoursesData } from "@/redux/thunk/courses";
import { AppDispatch } from "@/redux/store";
import { Course, FeaturedCourse } from "./types";

const CourseSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: courses, isLoading, error } = useSelector((state: RootState) => state.courses);
  
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Avoid refetch when data already cached via redux-persist
    if (!courses || courses.length === 0) {
      dispatch(fetchCoursesData({}));
    }
  }, [dispatch, courses]);

  // Get featured course names from constants (filtering out undefined entries)
  const featuredCourseNames = useMemo(() => 
    CoursesSection_ue
      .filter((course): course is FeaturedCourse => course != null)
      .map(course => course.name),
    []
  );
  
  // Filter featured courses by matching names
  const featuredCourses = useMemo(() => 
    courses.filter((course) => 
      featuredCourseNames.includes(course.name)
    ),
    [courses, featuredCourseNames]
  );

  // Decide which courses to display
  const coursesToShow = useMemo(() => {
    if (showAll) {
      return courses;
    }
    return featuredCourses.length > 0 
      ? featuredCourses.slice(0, 4) 
      : courses.slice(0, 4);
  }, [showAll, courses, featuredCourses]);

  const hasMore = useMemo(() => {
    if (showAll) return false;
    return featuredCourses.length > 3 || courses.length > 3;
  }, [showAll, featuredCourses.length, courses.length]);

  const handleShowAll = useCallback(() => setShowAll(true), []);
  const handleShowLess = useCallback(() => setShowAll(false), []);

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
              onClick={handleShowAll}
              className="h-[40px] px-5 bg-[#6A1B9A] text-white rounded-md transition-colors duration-200 hover:bg-[#4a148c]"
            >
              View All Courses
            </Button>
          )}
          {showAll && (
            <Button
              onClick={handleShowLess}
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
          // Loading skeletons with better accessibility
          Array.from({ length: 3 }, (_, i) => (
            <div 
              key={`skeleton-${i}`} 
              className="animate-pulse"
              role="status"
              aria-label="Loading course"
            >
              <div className="w-full h-80 bg-gray-300 dark:bg-gray-700 rounded-3xl"></div>
            </div>
          ))
        ) : error ? (
          <div 
            className="col-span-full text-center text-red-500 py-8"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        ) : coursesToShow.length > 0 ? (
          coursesToShow.map((course: Course, index) => (
            <ProgramCard
              key={
                course.id ??
                course._id ??
                course.slug ??
                `${course.program_type_name ?? "course"}-${index}`
              }
              course={course}
            />
          ))
        ) : (
          <div 
            className="col-span-full text-center text-gray-500 py-8"
            role="status"
            aria-live="polite"
          >
            No courses available at the moment.
          </div>
        )}
      </div>

      {/* Course count display */}
      {showAll && courses.length > 0 && (
        <p className="text-center mt-8 text-gray-600" role="status">
          Showing all {courses.length} course{courses.length !== 1 ? 's' : ''}
        </p>
      )}
    </section>
  );
};

export default React.memo(CourseSection);