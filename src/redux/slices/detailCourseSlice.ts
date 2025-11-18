import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDetailCourseData } from "../thunk/detailCourseThunk";

export interface CourseStructure {
  id: number;
  course_id: string;
  title: string;
  description: string;
  content: string;
  url: string | null;
  video_frame: string | null;
  section_3_title_1: string | null;
  section_3_title_1_content: string | null;
  section_3_title_2: string | null;
  section_3_title_2_content: string | null;
  section_3_title_3: string | null;
  section_3_title_3_content: string | null;
  section_3_title_4: string | null;
  section_3_title_4_content: string | null;
  section_3_title_5: string | null;
  section_3_title_5_content: string | null;
  payment_content: string | null;
  created_at: string;
  updated_at: string;
  section5_title?: string | null;
  section5_description?: string | null;
  section6_title?: string | null;
  section6_description?: string | null;
  section5_title_1?: string | null;
  section5_title_1_content?: string | null;
  section5_title_2?: string | null;
  section5_title_2_content?: string | null;
  section5_title_3?: string | null;
  section5_title_3_content?: string | null;
  section5_title_4?: string | null;
  section5_title_4_content?: string | null;
  section5_title_2_alt?: string | null;
  section5_description_2?: string | null;
}

export interface FeeFaq {
  id: number;
  meta_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CourseTable {
  id: number;
  course_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  fee_faqs?: FeeFaq[];
}

export interface CourseData {
  id: number;
  name: string;
  slug: string;
  program_id: string;
  cat_id: string;
  status: string;
  content: string;
  small_description: string;
  credits?: string;
  meta_tags: string | Record<string, unknown> | null;
  meta_description: string | null;
  page: string | number | null;
  image_path: string;
  video: string;
  created_at: string;
  updated_at: string;
  course_structures?: CourseStructure[];
  course_table?: CourseTable[];
}

export interface PaymentData {
  id: number;
  course_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FullPaymentData {
  id: number;
  course_id: string;
  payment_title: string;
  payment_description: string;
  currency: string;
  total_fee: string;
  charge_payment: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface DetailCourseResponse {
  course: CourseData;
  payment: PaymentData;
  full_payment: FullPaymentData;
}

interface DetailCourseState {
  isLoading: boolean;
  error: string | null;
  data: DetailCourseResponse | null;
}

const initialState: DetailCourseState = {
  isLoading: false,
  error: null,
  data: null,
};

const detailCourseSlice = createSlice({
  name: "detailCourse",
  initialState,
  reducers: {
    // Add the missing actions that the thunk is trying to import
    fetchCourseDetailStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCourseDetailSuccess: (state, action: PayloadAction<DetailCourseResponse>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchCourseDetailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetDetailCourseState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailCourseData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchDetailCourseData.fulfilled,
        (state, action: PayloadAction<DetailCourseResponse>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchDetailCourseData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to fetch course data";
      });
  },
});

export const { 
  resetDetailCourseState,
  // Export the new actions
  fetchCourseDetailStart,
  fetchCourseDetailSuccess,
  fetchCourseDetailFailure
} = detailCourseSlice.actions;

export default detailCourseSlice.reducer;