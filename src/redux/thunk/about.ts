import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const aboutApi = getAxiosInstance();

export const fetchAboutData = createAsyncThunk(
    "about/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await aboutApi.get("/api/about");
            const data = response.data;
            return data;
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Failed to fetch about data";
            return rejectWithValue(message);
        }
    }
);
