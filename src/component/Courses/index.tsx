"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "./CourseCard";
import { CoursesSection_ue } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchCourseOrder } from "@/redux/thunk/courseOrder";
import { AppDispatch } from "@/redux/store";
import type { Course as UICourse, FeaturedCourse } from "./types";
import type { Course as OrderCourse } from "@/redux/slices/courseOrder";
import Loader from "@/components/common/Loader";

const CourseSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: allCourses, isLoading, error } = useSelector((state: RootState) => state.courses);
  // Cast to UI Course type for compatibility
  const courseOrderCourses = useSelector((state: RootState) => state.courseOrder?.data ?? []) as UICourse[];

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


  // Remove duplicates: filter out allCourses that are present in courseOrderCourses (by id or _id)
  const filteredAllCourses = useMemo(() => {
    if (!Array.isArray(allCourses) || allCourses.length === 0) return [];
    if (!Array.isArray(courseOrderCourses) || courseOrderCourses.length === 0) return allCourses;
    // Build a Set of all ids from courseOrderCourses
    const orderIds = new Set(
      courseOrderCourses.map((c) => String(c.id)).filter(Boolean)
    );
    return allCourses.filter(
      (c) => !orderIds.has(String(c.id))
    );
  }, [allCourses, courseOrderCourses]);

  // Final merged list: courseOrderCourses first, then filteredAllCourses
  const mergedCourses: UICourse[] = useMemo(() => {
    // Defensive: ensure image_path is always a string for UI
    const normalize = (course: UICourse): UICourse => ({
      ...course,
      image_path: course.image_path || "",
    });
    return [
      ...courseOrderCourses.map(normalize),
      ...filteredAllCourses.map(normalize),
    ];
  }, [courseOrderCourses, filteredAllCourses]);


  // Featured courses logic (optional, if you want to keep featured highlight)
  const featuredCourses = useMemo(() =>
    mergedCourses.filter((course) =>
      typeof course.name === "string" && featuredCourseNames.includes(course.name)
    ),
    [mergedCourses, featuredCourseNames]
  );

  // Decide which courses to display
  const coursesToShow = useMemo(() => {
    if (showAll) {
      return mergedCourses;
    }
    // Not showing all: prefer featured courses if available, otherwise mergedCourses
    const source = featuredCourses.length > 0 ? featuredCourses : mergedCourses;
    return source.slice(0, 4);
  }, [showAll, mergedCourses, featuredCourses]);

  const hasMore = useMemo(() => {
    if (showAll) return false;
    return featuredCourses.length > 3 || mergedCourses.length > 3;
  }, [showAll, featuredCourses.length, mergedCourses.length]);

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
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[85px] font-semibold text-[#6A1B9A] leading-tight">
          Want to know more <br className="hidden sm:block" /> about our courses?
        </h1>

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
        {isLoading || mergedCourses == null ? (
          <div className="col-span-full flex items-center justify-center py-8">
            <Loader size={120} text={""} />
          </div>
        ) : error ? (
          <div
            className="col-span-full text-center text-red-500 py-8"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        ) : coursesToShow.length > 0 ? (
          coursesToShow.map((course: UICourse, index) => (
            <ProgramCard
              key={
                course.id ??
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
      {showAll && mergedCourses.length > 0 && (
        <p className="text-center mt-8 text-gray-600" role="status">
          Showing all {mergedCourses.length} course{mergedCourses.length !== 1 ? 's' : ''}
        </p>
      )}
    </section>
  );
};

export default React.memo(CourseSection);