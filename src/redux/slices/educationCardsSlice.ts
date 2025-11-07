// src/redux/slices/educationCardsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEducationCardsData } from "../thunk/educationCardsThunk";

export interface Partner {
  id: number;
  logo: string;
  title: string;
  content: string;
  button_name: string;
  link: string;
}

interface EducationCardsState {
  isLoading: boolean;
  error: string | null;
  data: Partner[] | null;
}

const initialState: EducationCardsState = {
  isLoading: false,
  error: null,
  data: null,
};

const educationCardsSlice = createSlice({
  name: "educationCards",
  initialState,
  reducers: {
    resetEducationCardsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationCardsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEducationCardsData.fulfilled, (state, action: PayloadAction<Partner[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchEducationCardsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to fetch partners data";
      });
  },
});

export const { resetEducationCardsState } = educationCardsSlice.actions;
export default educationCardsSlice.reducer;