// src/redux/thunk/courses.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Course } from "@/redux/slices/courses";

const coursesApis = getAxiosInstance();

export interface FetchCourseParams {
  program_type_ids?: string;
  university_ids?: string;
  level_ids?: string;
  page?: string | number;
  per_page?: string | number;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from?: number | null;
  to?: number | null;
}

export const fetchCoursesData = createAsyncThunk(
  "courses/fetchAll",
  async (params: FetchCourseParams, { rejectWithValue }) => {
    try {
      const filterParams = Object.fromEntries(
        Object.entries(params ?? {}).filter(
          ([, value]) => value !== undefined && value !== ""
        )
      ) as Record<string, string | number>;
      const hasFilters = Object.keys(filterParams).length > 0;

      const response = await coursesApis.get(
        hasFilters ? "/courses/filter" : "/courses",
        hasFilters ? { params: filterParams } : undefined
      );

      const coursesArray =
        response?.data?.courses ?? response?.data?.data ?? response?.data ?? [];

      // Transform the API data to match our interface
      const transformedCourses = (coursesArray as unknown[]).map((course) => {
        const c = course as {
          id: number;
          name: string;
          slug: string;
          program_type_id?: string | number;
          program_type_name?: string;
          university_id?: string | number;
          level_id?: string | number;
          small_description?: string;
          charge_payment?: string;
          full_payment?: {
            payment_description?: string;
            currency?: string;
            charge_payment?: string;
          };
          video?: string;
          course_structures?: Array<{
            section_3_title_4?: string;
            section_3_title_5_content?: string;
          }>;
          image_path: string;
          created_at: string;
          updated_at: string;
        };

        const courseStructure = c.course_structures && c.course_structures.length > 0 ? c.course_structures[0] : null;

        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          program_type_id: c.program_type_id,
          program_type_name: c.program_type_name,
          university_id: c.university_id,
          level_id: c.level_id,
          small_description: c.small_description,
          charge_payment:
            c.full_payment?.payment_description ||
            c.full_payment?.charge_payment ||
            c.charge_payment ||
            "",
          section_3_title_4: courseStructure?.section_3_title_4 || "",
          section_3_title_5_content: courseStructure?.section_3_title_5_content || "",
          image_path: c.image_path,
          created_at: c.created_at,
          updated_at: c.updated_at,
          video: c.video,
          currency: c.full_payment?.currency ?? "",
        } as Course;
      });

      const pagination = response?.data?.pagination ?? null;

      return { courses: transformedCourses, pagination };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err?.response?.data?.message || "Failed to fetch course data";
      return rejectWithValue(errorMessage);
    }
  }
);

