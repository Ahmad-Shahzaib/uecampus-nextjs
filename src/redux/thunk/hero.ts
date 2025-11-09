// src/redux/thunk/hero.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const heroApi = getAxiosInstance();

export const fetchHeroData = createAsyncThunk(
  "hero/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await heroApi.get("/home/hero");
      // API: { success: true, data: { ...hero object... } }
      return response.data.data; // <-- return the inner `data`
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch hero data";
      return rejectWithValue(message);
    }
  }
);