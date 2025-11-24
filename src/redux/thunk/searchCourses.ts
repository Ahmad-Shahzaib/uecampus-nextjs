import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export interface CourseSearchItem {
    id: number;
    name: string;
    slug: string;
    small_description?: string;
    image_path?: string;
}

export const fetchSearchResults = createAsyncThunk(
    "search/fetchSearchResults",
    async (keyword: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/courses/search`, { params: { keyword } });

            const results = response?.data?.data ?? [];

            // Normalize to CourseSearchItem[]
            const transformed = (results as any[]).map((r) => ({
                id: r.id,
                name: r.name,
                slug: r.slug,
                small_description: r.small_description,
                image_path: r.image_path,
            })) as CourseSearchItem[];

            return transformed;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } }; message?: string };
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to fetch search results";
            return rejectWithValue(errorMessage);
        }
    }
);

export default fetchSearchResults;
