// Course types for the Courses component
export interface Course {
  _id: string;
  name: string;
  title: string;
  detail: string;
  image_path: string;
  link: string;
  createdAt: string;
  updatedAt: string;
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