// src/redux/slices/randomCoursesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRandomCourses } from "../thunk/randomCoursesThunk";

export interface RandomCoursePayment {
  id: number;
  course_id: string;
  title?: string;
  payment_title?: string;
  payment_description?: string;
  description?: string | null;
  currency?: string;
  total_fee?: string;
  charge_payment?: string;
  content?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface RandomCourseStructure {
  id: number;
  course_id: string;
  title?: string;
  description?: string | null;
  content?: string | null;
  url?: string | null;
  video_frame?: string | null;
  payment_content?: string | null;
  [key: string]: unknown;
}

export interface RandomCourse {
  id: number;
  name: string;
  slug: string;
  program_id: string;
  program_type_name: string;
  credits: string | null;
  cat_id: string | null;
  status: string | null;
  content: string;
  small_description: string;
  meta_tags: string | Record<string, unknown> | null;
  meta_description: string | null;
  page: string | number | null;
  image_path: string;
  video: string | null;
  created_at: string;
  updated_at: string;
  payment: RandomCoursePayment | null;
  full_payment: RandomCoursePayment | null;
  course_structures: RandomCourseStructure[];
}

interface RandomCoursesState {
  isLoading: boolean;
  error: string | null;
  data: RandomCourse[];
}

const initialState: RandomCoursesState = {
  isLoading: false,
  error: null,
  data: [],
};

const randomCoursesSlice = createSlice({
  name: "randomCourses",
  initialState,
  reducers: {
    resetRandomCoursesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchRandomCourses.fulfilled,
        (state, action: PayloadAction<RandomCourse[]>) => {
          state.isLoading = false;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(fetchRandomCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch random courses";
      });
  },
});

export const { resetRandomCoursesState } = randomCoursesSlice.actions;
export default randomCoursesSlice.reducer;

