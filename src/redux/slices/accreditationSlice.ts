import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAccreditationData } from "../thunk/accreditationThunk";

interface AccreditationData {
  id: number;
  title: string;
  hero_image: string;
}

interface AccreditationState {
  isLoading: boolean;
  error: string | null;
  data: AccreditationData | null;
}

const initialState: AccreditationState = {
  isLoading: false,
  error: null,
  data: null,
};

const accreditationSlice = createSlice({
  name: "accreditation",
  initialState,
  reducers: {
    resetAccreditationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccreditationData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccreditationData.fulfilled, (state, action: PayloadAction<AccreditationData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAccreditationData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch accreditation data";
      });
  },
});

export const { resetAccreditationState } = accreditationSlice.actions;
export default accreditationSlice.reducer;
export const actions = accreditationSlice.actions;
export { actions as accreditationActions };