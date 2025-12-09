import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSeoData, SeoEntry } from "@/redux/thunk/seoThunk";

interface SeoState {
  isLoading: boolean;
  error: string | null;
  data: Record<string, SeoEntry> | null;
}

const initialState: SeoState = {
  isLoading: false,
  error: null,
  data: null,
};

const seoSlice = createSlice({
  name: "seo",
  initialState,
  reducers: {
    resetSeoState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeoData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSeoData.fulfilled, (state, action: PayloadAction<Record<string, SeoEntry>>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSeoData.rejected, (state, action) => {
        state.isLoading = false;
        const payload = (action as unknown as { payload?: unknown }).payload;
        state.error = (typeof payload === "string" ? payload : undefined) || action.error?.message || "Failed to fetch seo";
      });
  },
});

export const { resetSeoState } = seoSlice.actions;
export default seoSlice.reducer;
export const actions = seoSlice.actions;
export { actions as seoActions };
