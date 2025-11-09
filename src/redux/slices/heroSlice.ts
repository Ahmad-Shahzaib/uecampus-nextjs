// src/redux/slices/heroSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHeroData } from "../thunk/hero";

export interface Hero {
  id: number;
  title: string;
  description: string;
  video: string;
  button_name: string;
  button_link: string;
  created_at: string;
  updated_at: string;
}

interface HeroState {
  isLoading: boolean;
  error: string | null;
  data: Hero | null;
}

const initialState: HeroState = {
  isLoading: false,
  error: null,
  data: null,
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    resetHeroState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHeroData.fulfilled, (state, action: PayloadAction<Hero>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeroData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch hero data";
      });
  },
});

export const { resetHeroState } = heroSlice.actions;
export default heroSlice.reducer;