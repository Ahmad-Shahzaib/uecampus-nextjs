// src/redux/thunk/courses.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Course } from "@/redux/slices/courses";

const coursesApis = getAxiosInstance();

export interface FetchCourseParams {
  // the API accepts multiple ids for each filter; we allow either a comma-separated string or array
  program_type_ids?: string | string[];
  university_ids?: string | string[];
  level_ids?: string | string[];
  academic_year_ids?: string | string[];
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
      ) as Record<string, unknown>;
      const hasFilters = Object.keys(filterParams).length > 0;

      // ensure arrays are serialized with bracket notation (param[]=value)
      const axiosConfig: Record<string, unknown> | undefined = hasFilters
        ? {
            params: filterParams,
            paramsSerializer: (p: Record<string, any>) => {
              const parts: string[] = [];
              Object.entries(p).forEach(([key, value]) => {
                if (value === undefined || value === null) {
                  return;
                }
                if (Array.isArray(value)) {
                  value.forEach((v) => {
                    parts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(
                      String(v),
                    )}`);
                  });
                } else {
                  parts.push(
                    `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
                  );
                }
              });
              return parts.join("&");
            },
          }
        : undefined;

      const response = await coursesApis.get(
        hasFilters ? "/courses/filter" : "/courses",
        axiosConfig as any
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

