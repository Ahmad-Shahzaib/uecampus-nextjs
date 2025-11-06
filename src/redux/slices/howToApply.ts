// src/redux/slices/howToApply.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHowToApplyData } from "../thunk/howToApply";

interface HowToApplyData {
  id: number;
  sectionTitle: string;
  sectionTitle2: string;
  sectionDescription2: string;
  description: string;
  buttonName: string;
  buttonLink: string;
  buttonName2: string;
  buttonLink2: string;
  video: string;
  createdAt: string | null;
  updatedAt: string;
}

interface HowToApplyState {
  isLoading: boolean;
  error: string | null;
  data: HowToApplyData | null;
}

const initialState: HowToApplyState = {
  isLoading: false,
  error: null,
  data: null,
};

const howToApplySlice = createSlice({
  name: "howToApply",
  initialState,
  reducers: {
    resetHowToApplyState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHowToApplyData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHowToApplyData.fulfilled, (state, action: PayloadAction<HowToApplyData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchHowToApplyData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch how to apply data";
      });
  },
});

export const { resetHowToApplyState } = howToApplySlice.actions;
export default howToApplySlice.reducer;
export const actions = howToApplySlice.actions;
export { actions as howToApplyActions };