import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogBySlug } from "@/redux/thunk/blogDetailThunk";

interface BlogDetailState {
  isLoading: boolean;
  error: string | null;
  item: any | null;
}

const initialState: BlogDetailState = {
  isLoading: false,
  error: null,
  item: null,
};

const blogDetailSlice = createSlice({
  name: "blogDetail",
  initialState,
  reducers: {
    resetBlogDetail: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch blog";
      });
  },
});

export const { resetBlogDetail } = blogDetailSlice.actions;
export default blogDetailSlice.reducer;
