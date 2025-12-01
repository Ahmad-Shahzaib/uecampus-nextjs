import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCourseOrder } from "@/redux/thunk/courseOrder";

interface CourseOrderState {
  isLoading: boolean;
  error: string | null;
  data: string[];
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
      .addCase(fetchCourseOrder.fulfilled, (state, action: PayloadAction<string[]>) => {
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
