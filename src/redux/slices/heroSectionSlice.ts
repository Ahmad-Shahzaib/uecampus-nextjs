// src/redux/slices/heroSectionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHeroSectionData } from "../thunk/heroSectionThunk";

export interface HeroSectionData {
  section_title: string;
  section_description: string;
}

interface HeroSectionState {
  isLoading: boolean;
  error: string | null;
  data: HeroSectionData | null;
}

const initialState: HeroSectionState = {
  isLoading: false,
  error: null,
  data: null,
};

const heroSectionSlice = createSlice({
  name: "heroSection",
  initialState,
  reducers: {
    resetHeroSectionState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroSectionData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchHeroSectionData.fulfilled,
        (state, action: PayloadAction<HeroSectionData>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchHeroSectionData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to fetch hero section data";
      });
  },
});

export const { resetHeroSectionState } = heroSectionSlice.actions;
export default heroSectionSlice.reducer;