// src/redux/slices/scholarship.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchScholarshipData } from "../thunk/scholarship";

interface ScholarshipData {
  id: number;
  pageTitle: string;
  backgroundImage: string;
  onlineCourses: string;
  courseRating: string;
  students: string;
  leftSectionTitle: string;
  leftButtonText: string;
  leftButtonLink: string;
  scholarship1Title: string;
  scholarship1Description: string;
  scholarship1ButtonText: string;
  scholarship1ButtonLink: string;
  scholarship2Title: string;
  scholarship2Description: string;
  scholarship2ButtonText: string;
  scholarship2ButtonLink: string;
  createdAt: string | null;
  updatedAt: string;
}

interface ScholarshipState {
  isLoading: boolean;
  error: string | null;
  data: ScholarshipData | null;
}

const initialState: ScholarshipState = {
  isLoading: false,
  error: null,
  data: null,
};

const scholarshipSlice = createSlice({
  name: "scholarship",
  initialState,
  reducers: {
    resetScholarshipState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScholarshipData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchScholarshipData.fulfilled, (state, action: PayloadAction<ScholarshipData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchScholarshipData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch scholarship data";
      });
  },
});

export const { resetScholarshipState } = scholarshipSlice.actions;
export default scholarshipSlice.reducer;