// Course type used by cards; supports both legacy and new shapes
export interface Course {
  // Legacy fields
  id?: string | number;
  _id?: string;
  slug?: string;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  level?: string;
  program_type_name?: string; // ✅ make it optional

}
// Featured course from constants

export interface FeaturedCourse {
  name: string;
  title: string;
  detail: string;
  image: string;
}

// Props interfaces
export interface ProgramCardProps {
  course: Course;
}

export interface CourseSectionProps {
  initialShowAll?: boolean;
  maxFeaturedCourses?: number;
}