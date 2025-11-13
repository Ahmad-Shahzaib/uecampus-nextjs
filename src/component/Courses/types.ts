// Course type used by cards; supports both legacy and new shapes
export interface Course {
  id: number | string;
  _id?: number | string;
  title?: string;
  name?: string;
  slug: string;
  program_type_name?: string;
  detail?: string;
  small_description?: string;
  image_path: string;
  // ... other properties
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