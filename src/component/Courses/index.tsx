"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "./CourseCard";
import { CoursesSection_ue } from "@/constants";

const CourseSection: React.FC = () => {
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-700 leading-tight">
          Want to know more <br className="hidden sm:block" /> about our courses?
        </h2>

        <Button
          className="inline-block h-[40px] px-5 bg-[#6a1b9a] text-white rounded-md no-underline transition-colors duration-200 hover:bg-[#4a148c]"
        >
          View All Courses
        </Button>

      </div>

      {/* Courses Grid */}
    <div
  className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
>
  {CoursesSection_ue.map((item: any, index: number) => (
    <ProgramCard key={index} item={item} />
  ))}
</div>

    </section>
  );
};

export default CourseSection;
