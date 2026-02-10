import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export interface BlogItem {
  id: number;
  name: string;
  slug: string;
  small_description?: string;
  content?: string;
  image?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
  category?: { id: number; title: string } | null;
}

export interface BlogsResponse {
  data: BlogItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (
    params: { page?: number; per_page?: number } = { page: 1, per_page: 12 },
    { rejectWithValue }
  ) => {
    try {
      const qp = `?per_page=${params.per_page ?? 12}&page=${params.page ?? 1}`;
      const resp = await api.get(`/blogs${qp}`);
      const payload = resp?.data?.data ?? resp?.data ?? null;
      if (!payload) return rejectWithValue("Empty response from blogs API");

      // Attempt to extract pagination shape used by API
      const data = (payload.data as BlogItem[]) || (payload as BlogItem[]);
      const current_page = payload.current_page ?? payload.currentPage ?? 1;
      const last_page = payload.last_page ?? payload.lastPage ?? 1;
      const per_page = payload.per_page ?? payload.perPage ?? params.per_page ?? 12;
      const total = payload.total ?? 0;

      return {
        data: Array.isArray(data) ? data : [],
        current_page: Number(current_page),
        last_page: Number(last_page),
        per_page: Number(per_page),
        total: Number(total),
      } as BlogsResponse;
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch blogs");
    }
  }
);

export const fetchSearchBlogs = createAsyncThunk(
  "blogs/searchBlogs",
  async (
    params: { q: string; page?: number; per_page?: number },
    { rejectWithValue }
  ) => {
    try {
      const q = params.q ?? "";
      const qp = `?q=${encodeURIComponent(q)}&per_page=${params.per_page ?? 12}&page=${params.page ?? 1}`;
      const resp = await api.get(`/blogs/search${qp}`);
      const payload = resp?.data?.data ?? resp?.data ?? null;
      if (!payload) return rejectWithValue("Empty response from blogs search API");

      const data = (payload.data as BlogItem[]) || (payload as BlogItem[]);
      const current_page = payload.current_page ?? payload.currentPage ?? 1;
      const last_page = payload.last_page ?? payload.lastPage ?? 1;
      const per_page = payload.per_page ?? payload.perPage ?? params.per_page ?? 12;
      const total = payload.total ?? 0;

      return {
        q,
        data: Array.isArray(data) ? data : [],
        current_page: Number(current_page),
        last_page: Number(last_page),
        per_page: Number(per_page),
        total: Number(total),
      } as BlogsResponse & { q: string };
    } catch (err: unknown) {
      return rejectWithValue("Failed to search blogs");
    }
  }
);

export const fetchLatestBlogs = createAsyncThunk(
  "blogs/fetchLatest",
  async (
    params: { limit?: number } = { limit: 5 },
    { rejectWithValue }
  ) => {
    try {
      const qp = `?limit=${params.limit ?? 5}`;
      const resp = await api.get(`/blogs/latest${qp}`);
      // API returns { success: true, data: [ ... ] }
      const payload = resp?.data?.data ?? resp?.data ?? null;
      if (!payload) return rejectWithValue("Empty response from latest blogs API");

      const data = Array.isArray(payload) ? (payload as BlogItem[]) : (payload.data as BlogItem[]) || [];
      return Array.isArray(data) ? data : [];
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch latest blogs");
    }
  }
);
