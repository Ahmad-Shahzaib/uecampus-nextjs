// src/redux/slices/contactUsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchContactUsData } from "../thunk/contactUsThunk";

export interface ContactUsData {
  contact_image: string;
  contact_description: string;
}

interface ContactUsState {
  isLoading: boolean;
  error: string | null;
  data: ContactUsData | null;
}

const initialState: ContactUsState = {
  isLoading: false,
  error: null,
  data: null,
};

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {
    resetContactUsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactUsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactUsData.fulfilled, (state, action: PayloadAction<ContactUsData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchContactUsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to fetch contact data";
      });
  },
});

export const { resetContactUsState } = contactUsSlice.actions;
export default contactUsSlice.reducer;