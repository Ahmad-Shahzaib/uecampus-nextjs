"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    image: string;
    credits: string;
    duration: string;
    level: string;
    type: string;
    description: string;
    userInfo: string;
    timeInfo: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/3 h-52 md:h-64">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#3E3E63] mb-3">
              {course.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-[#F0F8FF] rounded text-gray-700 px-3 py-1">
                {course.type}
              </span>
              <span className="text-xs bg-[#F0F8FF] rounded text-gray-700 px-3 py-1">
                {course.duration}
              </span>
              <span className="text-xs bg-[#F0F8FF] rounded text-gray-700 px-3 py-1">
                {course.credits}
              </span>
              <span className="text-xs bg-[#F0F8FF] rounded text-gray-700 px-3 py-1">
                {course.level}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Footer */}
          <hr className="my-2 border-gray-200" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <div className="text-xs text-muted-foreground">
              <p>{course.userInfo}</p>
              <p className="text-gray-600 font-medium">{course.timeInfo}</p>
            </div>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-purple-700 cursor-pointer gap-1 p-0"
            >
              Course Details
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
