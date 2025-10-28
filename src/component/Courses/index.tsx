"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "./CourseCard";
import { CoursesSection_ue } from "@/constants";

const CourseSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 px-6 sm:px-10 lg:px-20"
      style={{
        backgroundImage:
          "url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-box-line-background.png')",
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16">
        <h2 className="text-5xl sm:text-6xl font-semibold text-purple-700 leading-tight max-w-3xl">
          Want to know more <br /> about our courses?
        </h2>

        <Button className="mt-6 lg:mt-0 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2">
          View All Courses
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {CoursesSection_ue.map((item: any, index: number) => (
          <ProgramCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CourseSection;
