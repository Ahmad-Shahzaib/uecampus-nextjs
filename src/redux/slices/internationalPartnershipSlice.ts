// src/redux/slices/internationalPartnershipSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInternationalPartnershipData } from "../thunk/internationalPartnershipThunk";

export interface InternationalPartnershipData {
  id: number;
  title: string;
  description: string;
  hero_image: string;
  feature1_title: string;
  feature1_description: string;
  feature2_title: string;
  feature2_description: string;
  feature3_title: string;
  feature3_description: string;
}

interface InternationalPartnershipState {
  isLoading: boolean;
  error: string | null;
  data: InternationalPartnershipData | null;
}

const initialState: InternationalPartnershipState = {
  isLoading: false,
  error: null,
  data: null,
};

const internationalPartnershipSlice = createSlice({
  name: "internationalPartnership",
  initialState,
  reducers: {
    resetInternationalPartnershipState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInternationalPartnershipData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInternationalPartnershipData.fulfilled, (state, action: PayloadAction<InternationalPartnershipData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchInternationalPartnershipData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch partnership data";
      });
  },
});

export const { resetInternationalPartnershipState } = internationalPartnershipSlice.actions;
export default internationalPartnershipSlice.reducer;