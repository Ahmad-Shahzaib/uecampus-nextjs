import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const fetchBlogBySlug = createAsyncThunk(
  "blogDetail/fetchBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const axios = getAxiosInstance();
      const res = await axios.get<ApiResponse<any>>(`/blogs/${slug}`);
      return res.data.data;
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? "Failed to fetch blog";
      return rejectWithValue(message);
    }
  }
);

export default fetchBlogBySlug;
