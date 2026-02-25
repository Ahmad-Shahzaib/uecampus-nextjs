import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCourseOrder } from "@/redux/thunk/courseOrder";


// Define the course type based on the new API response
export interface Course {
  id: number;
  name: string;
  slug: string;
  program_id: string;
  program_type_name: string;
  credits?: string | null;
  cat_id: string;
  status: string;
  content: string;
  small_description: string;
  meta_tags?: string | null;
  meta_description?: string | null;
  page?: string | null;
  image_path?: string | null;
  video?: string | null;
  created_at?: string;
  updated_at?: string;
  payment?: any;
  full_payment?: any;
  course_structures?: any[];
}

interface CourseOrderState {
  isLoading: boolean;
  error: string | null;
  data: Course[];
}

const initialState: CourseOrderState = {
  isLoading: false,
  error: null,
  data: [],
};

const courseOrderSlice = createSlice({
  name: "courseOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseOrder.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCourseOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch course order";
      });
  },
});

export default courseOrderSlice.reducer;
