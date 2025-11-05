// src/components/ProgramCard.tsx
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: number;
  name: string;
  slug: string;
  small_description: string;
  image_path: string;
}

interface ProgramCardProps {
  course: Course;
}

export function ProgramCard({ course }: ProgramCardProps) {
  return (
    <article className="w-full overflow-hidden rounded-3xl bg-[#111827] shadow-xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
      <div className="flex flex-col p-4 sm:p-6 md:p-8">
        <div className="mb-4 sm:mb-5">
          <Badge
            variant="secondary"
            className="rounded-full bg-white px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#6A1B9A] whitespace-normal break-words text-center"
          >
            {course.name}
          </Badge>
        </div>

        <h1 className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-semibold text-white leading-snug line-clamp-2">
          {course.name}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
          {course.small_description}
        </p>
      </div>

      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-2xl">
        <Image
          src={course.image_path}
          alt={course.name}
          fill
          priority
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 
                 (max-width: 1024px) 50vw, 
                 25vw"
        />
      </div>
    </article>
  );
}