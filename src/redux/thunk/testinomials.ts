import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const testinomialsApi = getAxiosInstance();

export const fetchTestinomialsData = createAsyncThunk(
    "testinomials/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await testinomialsApi.get("/home/affiliation-logos");
            // API shape may be: { success: true, data: [ ... ] }
            const payload = response?.data?.data ?? response?.data ?? [];
            // Normalize to the shape expected by UI: { id, name, src, alt, createdAt, updatedAt }
            const logos = (Array.isArray(payload) ? payload : []).map((item: unknown) => {
                const it = item as Record<string, unknown>;
                return {
                    id: String((it.id ?? it._id ?? "") as string),
                    name: (it.name as string) ?? `Partner ${String((it.id ?? it._id ?? "") as string)}`,
                    src: (it.image_path as string) ?? (it.image as string) ?? "",
                    alt: (it.name as string) ?? `Partner ${String((it.id ?? it._id ?? "") as string)}`,
                    createdAt: (it.created_at as string) ?? (it.createdAt as string) ?? null,
                    updatedAt: (it.updated_at as string) ?? (it.updatedAt as string) ?? null,
                };
            });

            return logos;
        } catch {
            // If we want to extract a server message we can, but keep a safe default here
            return rejectWithValue("Failed to fetch testimonials");
        }
    }
);
