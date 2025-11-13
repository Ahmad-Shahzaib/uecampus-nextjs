// src/redux/slices/studentFeedback.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStudentFeedbackData } from "../thunk/studentFeedback";

interface FeedbackItem {
  id: string;
  name: string;
  image: string;
  description: string;
  text: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

interface StudentFeedbackState {
  isLoading: boolean;
  error: string | null;
  data: FeedbackItem[];
}

const initialState: StudentFeedbackState = {
  isLoading: false,
  error: null,
  data: [],
};

const studentFeedbackSlice = createSlice({
  name: "studentFeedback",
  initialState,
  reducers: {
    resetStudentFeedbackState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentFeedbackData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentFeedbackData.fulfilled, (state, action: PayloadAction<FeedbackItem[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudentFeedbackData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (typeof action.payload === "string" ? action.payload : undefined) ||
          action.error?.message ||
          "Failed to fetch student feedback";
      });
  },
});

export const { resetStudentFeedbackState } = studentFeedbackSlice.actions;
export default studentFeedbackSlice.reducer;
export const actions = studentFeedbackSlice.actions;
export { actions as studentFeedbackActions };