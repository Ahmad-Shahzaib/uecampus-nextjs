// Course type used by cards; supports both legacy and new shapes
export interface Course {
  // Legacy fields
  _id?: string;
  title?: string;
  detail?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;

  // New API fields
  id?: number;
  slug?: string;
  small_description?: string;
  created_at?: string;
  updated_at?: string;

  // Shared
  name: string;
  image_path: string;
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