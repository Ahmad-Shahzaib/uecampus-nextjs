import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const heroApi = getAxiosInstance();

export const fetchHeroData = createAsyncThunk(
    "hero/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await heroApi.get("/api/hero");
            const data = response.data;
            return data
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Failed to fetch hero data";
            return rejectWithValue(message);
        }
    }
);
