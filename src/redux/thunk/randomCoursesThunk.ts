// src/redux/thunk/randomCoursesThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";
import type { RandomCourse } from "../slices/randomCoursesSlice";

const api = getAxiosInstance();

type ApiResponse = {
  success?: boolean;
  data?: RandomCourseApiShape[];
  message?: string;
};

type RandomCourseApiShape = {
  id: number;
  name: string;
  slug: string;
  program_id: string;
  program_type_name?: string;
  credits?: string | null;
  cat_id?: string | null;
  status?: string | null;
  content?: string | null;
  small_description?: string | null;
  meta_tags?: string | Record<string, unknown> | null;
  meta_description?: string | null;
  page?: string | number | null;
  image_path?: string | null;
  video?: string | null;
  created_at?: string;
  updated_at?: string;
  payment?: RandomCourse["payment"];
  full_payment?: RandomCourse["full_payment"];
  course_structures?: RandomCourse["course_structures"];
};

export const fetchRandomCourses = createAsyncThunk<
  RandomCourse[],
  void,
  { rejectValue: string }
>("randomCourses/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<ApiResponse>("/courses/random");
    const rawCourses = response.data?.data ?? [];

    const transformed: RandomCourse[] = rawCourses.map((course) => ({
      id: course.id,
      name: course.name,
      slug: course.slug,
      program_id: course.program_id,
      program_type_name: course.program_type_name ?? "Program",
      credits: course.credits ?? null,
      cat_id: course.cat_id ?? null,
      status: course.status ?? null,
      content: course.content ?? "",
      small_description: course.small_description ?? "",
      meta_tags: course.meta_tags ?? null,
      meta_description: course.meta_description ?? null,
      page: course.page ?? null,
      image_path: course.image_path || "/assets/uecampus-logo.png",
      video: course.video ?? null,
      created_at: course.created_at ?? "",
      updated_at: course.updated_at ?? "",
      payment: course.payment ?? null,
      full_payment: course.full_payment ?? null,
      course_structures: course.course_structures ?? [],
    }));

    return transformed;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const message =
      err?.response?.data?.message || "Failed to fetch random courses";
    return rejectWithValue(message);
  }
});

