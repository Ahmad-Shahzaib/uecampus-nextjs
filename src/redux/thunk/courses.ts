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
        response?.data?.courses ?? response?.data?.data ?? []; // Extract the courses array for either endpoint

      // Transform the API data to match our interface
      const transformedCourses = (coursesArray as unknown[]).map((course) => {
        const c = course as {
          id: number;
          name: string;
          slug: string;
          small_description?: string;
          charge_payment?: string;
          full_payment?: {
            charge_payment?: string;
          };
          course_structures?: Array<{
            section_3_title_4?: string;
            section_3_title_5_content?: string;
          }>;
          image_path: string;
          created_at: string;
          updated_at: string;
        };
        
        // Extract section_3 fields from course_structures (first structure if available)
        const courseStructure = c.course_structures && c.course_structures.length > 0 
          ? c.course_structures[0] 
          : null;
        
        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          small_description: c.small_description,
          charge_payment: c.full_payment?.charge_payment || c.charge_payment || "",
          section_3_title_4: courseStructure?.section_3_title_4 || "",
          section_3_title_5_content: courseStructure?.section_3_title_5_content || "",
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
