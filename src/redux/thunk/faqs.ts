import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const faqsApi = getAxiosInstance();

export const fetchFaqsData = createAsyncThunk(
    "faqs/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await faqsApi.get("/api/faqs");
            return response.data; // ✅ API returns an array of FAQs
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Failed to fetch FAQs";
            return rejectWithValue(message);
        }
    }
);
