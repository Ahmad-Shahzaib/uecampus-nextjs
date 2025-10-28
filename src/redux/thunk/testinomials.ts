import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const testinomialsApi = getAxiosInstance();

export const fetchTestinomialsData = createAsyncThunk(
    "testinomials/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await testinomialsApi.get("/api/testinomials");
            return response.data; // API returns an array
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Failed to fetch testimonials";
            return rejectWithValue(message);
        }
    }
);
