"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CourseCardProps {
  course: {
    id: number;
    name: string;
    slug: string;
    program_id: string;
    cat_id: string;
    status: string;
    content: string;
    small_description: string;
    meta_tags: string;
    meta_description: string;
    page: string;
    image_path: string;
    video: string;
    created_at: string;
    updated_at: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();

  const navigateToCourseDetail = () => {
    router.push(`/course/${course.slug}`);
  };

  return (
    <Card className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 cursor-pointer"
              onClick={navigateToCourseDetail} // Attach the handler here
      
      >
        {/* Image Section */}
        <div className="shrink-0 w-full md:w-1/3 h-52 md:h-64">
          <Image
            src={course.image_path || "/placeholder.svg"}
            alt={course.name}
            width={400}
            height={300}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#3E3E63] mb-3">
              {course.name}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-[#F0F8FF] rounded text-gray-700 px-3 py-1">
              Accessibility
              </span>
              <span className="text-xs bg-[#F0F8FF] rounded text-gray-700 px-3 py-1">
                Program {course.program_id}
              </span>
             
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {course.small_description}
            </p>
          </div>

          {/* Footer */}
          <hr className="my-2 border-gray-200" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center  gap-2 sm:gap-4 float-end justify-end">
            {/* <div className="text-xs text-muted-foreground">
              <p>Created: {new Date(course.created_at).toLocaleDateString()}</p>
              <p className="text-gray-600 font-medium">Updated: {new Date(course.updated_at).toLocaleDateString()}</p>
            </div> */}
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-purple-700 cursor-pointer gap-1 p-0 float-end justify-end left"
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