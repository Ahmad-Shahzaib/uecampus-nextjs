import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export interface SeoEntry {
  page_key: string;
  page_name?: string;
  seo_title?: string;
  seo_h1?: string;
  seo_meta_description?: string;
  seo_keywords?: string | null;
}

export const fetchSeoData = createAsyncThunk(
  "seo/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/settings/seo");
      const payload = response?.data?.data ?? response?.data ?? null;
      if (!payload) return rejectWithValue("No seo returned");

      // Ensure payload is an object mapping page keys to SeoEntry
      return payload as Record<string, SeoEntry>;
    } catch (err) {
      return rejectWithValue("Failed to fetch seo data");
    }
  }
);
