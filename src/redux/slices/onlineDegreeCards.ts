// src/redux/slices/onlineDegreeCards.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOnlineDegreeCards } from "../thunk/onlineDegreeCards";

interface CardData {
  title: string;
  description: string;
}

interface OnlineDegreeCardsState {
  isLoading: boolean;
  error: string | null;
  data: CardData[] | null; // Change to allow null
}

const initialState: OnlineDegreeCardsState = {
  isLoading: false,
  error: null,
  data: null, // Initially null instead of empty array
};

const onlineDegreeCardsSlice = createSlice({
  name: "onlineDegreeCards",
  initialState,
  reducers: {
    resetOnlineDegreeCardsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnlineDegreeCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOnlineDegreeCards.fulfilled, (state, action: PayloadAction<CardData[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOnlineDegreeCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch online degree cards data";
      });
  },
});

export const { resetOnlineDegreeCardsState } = onlineDegreeCardsSlice.actions;
export default onlineDegreeCardsSlice.reducer;