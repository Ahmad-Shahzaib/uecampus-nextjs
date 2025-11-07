// src/redux/thunk/courses.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const coursesApis = getAxiosInstance();

interface FetchCourseParams {
  // Define any parameters needed for fetching courses
}

export const fetchCoursesData = createAsyncThunk(
  "courses/fetchAll",
  async (params: FetchCourseParams, { rejectWithValue }) => {
    try {
      const response = await coursesApis.get("/courses");
      console.log("API Response:", response.data); // Debug log
      
      const coursesArray = response.data.data || []; // Extract the courses array
      console.log("Courses Array:", coursesArray); // Debug log
      
      // Transform the API data to match our interface
      const transformedCourses = coursesArray.map((course: any) => ({
        id: course.id,
        name: course.name,
        slug: course.slug,
        small_description: course.small_description,
        image_path: course.image_path,
        created_at: course.created_at,
        updated_at: course.updated_at,
      }));
      
      console.log("Transformed Courses:", transformedCourses); // Debug log
      return transformedCourses;
    } catch (error: any) {
      console.error("Error fetching courses:", error); // Debug log
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch course data";
      return rejectWithValue(errorMessage);
    }
  }
);