import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDetailCourseData } from "../thunk/detailCourseThunk";

export interface CourseData {
  id: number;
  name: string;
  slug: string;
  program_id: string;
  cat_id: string;
  status: string;
  content: string;
  small_description: string;
  meta_tags: any;
  meta_description: any;
  page: any;
  image_path: string;
  video: string;
  created_at: string;
  updated_at: string;
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