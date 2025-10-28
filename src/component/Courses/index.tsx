"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "./CourseCard";
import { CoursesSection_ue } from "@/constants";

const CourseSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 sm:py-20 px-4 sm:px-8 lg:px-20"
      style={{
        backgroundImage:
          "url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-box-line-background.png')",
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-700 leading-tight max-w-3xl">
          Want to know more <br className="hidden sm:block" /> about our courses?
        </h2>

        <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3 text-base sm:text-lg font-medium">
          View All Courses
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CoursesSection_ue.map((item: any, index: number) => (
          <ProgramCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CourseSection;
