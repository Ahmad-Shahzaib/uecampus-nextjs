import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLatestBlogs, BlogItem } from "@/redux/thunk/blogsThunk";

interface LatestBlogsState {
  isLoading: boolean;
  error: string | null;
  items: BlogItem[];
}

const initialState: LatestBlogsState = {
  isLoading: false,
  error: null,
  items: [],
};

const latestBlogsSlice = createSlice({
  name: "latestBlogs",
  initialState,
  reducers: {
    resetLatestBlogsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLatestBlogs.fulfilled, (state, action: PayloadAction<BlogItem[]>) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload || [];
      })
      .addCase(fetchLatestBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch latest blogs";
      });
  },
});

export const { resetLatestBlogsState } = latestBlogsSlice.actions;
export default latestBlogsSlice.reducer;
