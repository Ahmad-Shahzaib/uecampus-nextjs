"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "./CourseCard";
import { CoursesSection_ue } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchCourseOrder } from "@/redux/thunk/courseOrder";
import { AppDispatch } from "@/redux/store";
import { Course, FeaturedCourse } from "./types";

const CourseSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: courses, isLoading, error } = useSelector((state: RootState) => state.courses);
  const courseOrder = useSelector((state: RootState) => state.courseOrder?.data ?? []);

  const [showAll, setShowAll] = useState(false);

  

  // Fetch prioritized order (ids) from server once on mount
  useEffect(() => {
    dispatch(fetchCourseOrder());
  }, [dispatch]);

  // Get featured course names from constants (filtering out undefined entries)
  const featuredCourseNames = useMemo(() =>
    CoursesSection_ue
      .filter((course): course is FeaturedCourse => course != null)
      .map(course => course.name),
    []
  );

  // Dynamic prioritized course IDs - using includes method to fetch records
  const prioritizedCourseIds = useMemo(() => {
    // If we have courses, prefer server-provided order (but only IDs present
    // in the fetched `courses`). If none of the server IDs match, fall back
    // to featured-course names. If no courses exist yet, use server order.
    if (courses && courses.length > 0) {
      if (courseOrder && courseOrder.length > 0) {
        const presentServerIds = courseOrder.filter((id) =>
          courses.some((c) => String(c.id) === String(id))
        );
        if (presentServerIds.length > 0) return presentServerIds;
      }

      // Fallback to featured names when server order doesn't match any fetched course
      const fromFeatured = courses
        .filter((course) => featuredCourseNames.includes(course.name))
        .map((course) => String(course.id));
      if (fromFeatured.length > 0) return fromFeatured;

      return [];
    }

    // If no courses yet, but server provided an order, use it so the client
    // can attempt to prioritize when courses arrive later.
    if (courseOrder && courseOrder.length > 0) {
      return courseOrder;
    }

    return [];
  }, [courses, featuredCourseNames, courseOrder]);

  // Ordered prioritized courses (keeps the order defined in prioritizedCourseIds)
  const prioritizedCourses = useMemo(() => {
    return prioritizedCourseIds
      .map((id) => courses.find((c) => String(c.id) === String(id)))
      .filter(Boolean) as Course[];
  }, [courses, prioritizedCourseIds]);

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
      // When showing all, put prioritized courses first, then the rest
      return [
        ...prioritizedCourses,
        ...courses.filter((c) => !prioritizedCourses.some((p) => p.id === c.id)),
      ];
    }

    // Not showing all: prefer featured courses if available, otherwise all courses
    const source = featuredCourses.length > 0 ? featuredCourses : courses;

    // Bring prioritized courses (that exist in the source) to the front, then fill
    const prioritizedInSource = prioritizedCourses.filter((p) =>
      source.some((s) => s.id === p.id)
    );
    const others = source.filter(
      (s) => !prioritizedInSource.some((p) => p.id === s.id)
    );

    return [...prioritizedInSource, ...others].slice(0, 4);
  }, [showAll, courses, featuredCourses, prioritizedCourses]);

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
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[85px] font-semibold text-[#6A1B9A] leading-tight">
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