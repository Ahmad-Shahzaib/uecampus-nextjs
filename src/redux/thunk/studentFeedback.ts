// src/redux/thunk/studentFeedback.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const feedbackApi = getAxiosInstance();

export const fetchStudentFeedbackData = createAsyncThunk(
    "studentFeedback/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await feedbackApi.get("/home/students-feedbacks");
            const payload = response?.data?.data ?? response?.data ?? [];
            
            const feedback = (Array.isArray(payload) ? payload : []).map((item: unknown) => {
                const it = item as Record<string, unknown>;
                
                // Extract degree and country from description
                const description = (it.description as string) || "";
                const [degree, country] = description.split(" - ").map(part => part.trim());
                
                // Extract text content from HTML
                const content = (it.content as string) || "";
                const text = content
                    .replace(/<[^>]*>/g, "") // Remove HTML tags
                    .replace(/&[a-z]+;/g, " ") // Replace HTML entities
                    .replace(/\s+/g, " ") // Normalize whitespace
                    .trim();
                
                return {
                    id: String((it.id ?? it._id ?? "") as string),
                    name: (it.name as string) ?? "Anonymous Student",
                    image: (it.image as string) ?? "",
                    degree: degree || "",
                    country: country || "",
                    text: text || "",
                    createdAt: (it.created_at as string) ?? (it.createdAt as string) ?? null,
                    updatedAt: (it.updated_at as string) ?? (it.updatedAt as string) ?? null,
                };
            });

            return feedback;
        } catch (error) {
            return rejectWithValue("Failed to fetch student feedback");
        }
    }
);