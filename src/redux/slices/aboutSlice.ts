// src/redux/slices/about.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAboutData } from "../thunk/about";

interface AboutData {
  pageTitle: string;
  section2Image: string;
  section2ImageUrl: string;
  section2Title: string;
  section2Title1: string;
  section2Description1: string;
  section2Title2: string;
  section2Description2: string;
  section2Title3: string;
  section2Description3: string;
}

interface AboutState {
  isLoading: boolean;
  error: string | null;
  data: AboutData | null;
}

const initialState: AboutState = {
  isLoading: false,
  error: null,
  data: null,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    resetAboutState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAboutData.fulfilled, (state, action: PayloadAction<AboutData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch about data";
      });
  },
});

export const { resetAboutState } = aboutSlice.actions;
export default aboutSlice.reducer;