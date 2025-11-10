// src/redux/thunk/courses.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const coursesApis = getAxiosInstance();

interface FetchCourseParams {
  cat_ids?: string; // comma-separated ids, e.g. "3,1"
}

export const fetchCoursesData = createAsyncThunk(
  "courses/fetchAll",
  async (params: FetchCourseParams, { rejectWithValue }) => {
    try {
      let response;
      if (params?.cat_ids) {
        response = await coursesApis.get("/courses/programs", {
          params: { cat_ids: params.cat_ids },
        });
      } else {
        response = await coursesApis.get("/courses");
      }

      const coursesArray =
        response?.data?.courses ??
        response?.data?.data ??
        []; // Extract the courses array for either endpoint

      // Transform the API data to match our interface
      const transformedCourses = (coursesArray as unknown[]).map((course) => {
        const c = course as {
          id: number;
          name: string;
          slug: string;
          small_description?: string;
          image_path: string;
          created_at: string;
          updated_at: string;
        };
        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          small_description: c.small_description,
          image_path: c.image_path,
          created_at: c.created_at,
          updated_at: c.updated_at,
        };
      });

      return transformedCourses;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        err?.response?.data?.message || "Failed to fetch course data";
      return rejectWithValue(errorMessage);
    }
  }
);