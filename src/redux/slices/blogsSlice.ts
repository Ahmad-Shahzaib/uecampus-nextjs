import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBlogs, fetchSearchBlogs, BlogItem } from "@/redux/thunk/blogsThunk";

interface BlogsState {
  isLoading: boolean;
  error: string | null;
  items: BlogItem[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null;
  // last search query used (empty/null means no active search)
  lastQuery?: string | null;
}

const initialState: BlogsState = {
  isLoading: false,
  error: null,
  items: [],
  pagination: null,
  lastQuery: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    resetBlogsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // clear lastQuery when fetching base list
        state.lastQuery = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data || [];
        state.pagination = {
          current_page: action.payload.current_page ?? 1,
          last_page: action.payload.last_page ?? 1,
          per_page: action.payload.per_page ?? 12,
          total: action.payload.total ?? 0,
        };
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch blogs";
      })
      .addCase(fetchSearchBlogs.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.lastQuery = action.meta.arg.q ?? null;
      })
      .addCase(fetchSearchBlogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        // payload includes q
        state.lastQuery = action.payload?.q ?? state.lastQuery ?? null;
        state.items = action.payload.data || [];
        state.pagination = {
          current_page: action.payload.current_page ?? 1,
          last_page: action.payload.last_page ?? 1,
          per_page: action.payload.per_page ?? 12,
          total: action.payload.total ?? 0,
        };
      })
      .addCase(fetchSearchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to search blogs";
      });
  },
});

export const { resetBlogsState } = blogsSlice.actions;
export default blogsSlice.reducer;
