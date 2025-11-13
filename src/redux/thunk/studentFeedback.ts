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

        const id = String(it.id ?? it._id ?? "");
        const name = (it.name as string) ?? "Anonymous Student";
        const image = (it.image as string) ?? "";
        const description = (it.description as string) ?? "";

        // Extract clean text from HTML content
        const content = (it.content as string) ?? "";
        const text = content
          .replace(/<[^>]*>/g, "") // Remove HTML tags
          .replace(/&[a-z]+;/g, " ") // HTML entities
          .replace(/\s+/g, " ")
          .trim()
          // Fix generic "marketing industry" bug
          .replace(/marketing industry/gi, "their field");

        return {
          id,
          name,
          image,
          description,
          text,
          createdAt: (it.created_at as string) ?? null,
          updatedAt: (it.updated_at as string) ?? null,
        };
      });

      return feedback;
    } catch (error) {
      return rejectWithValue("Failed to fetch student feedback");
    }
  }
);