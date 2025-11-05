// src/redux/thunk/faqs.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const faqsApi = getAxiosInstance();

export const fetchFaqsData = createAsyncThunk(
    "faqs/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await faqsApi.get("/home/faqs");
            const responseData = response.data;
            
            // Extract FAQ content and FAQs from the response
            const faqContent = responseData?.data?.faq_content;
            const faqsArray = responseData?.data?.faqs || [];
            
            // Transform the FAQs to match our interface
            const transformedFaqs = faqsArray.map((item: any) => ({
                _id: String(item.id),
                question: item.title,
                answer: item.description,
                createdAt: item.created_at,
                updatedAt: item.updated_at,
            }));
            
            return {
                faqContent,
                faqs: transformedFaqs,
            };
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Failed to fetch FAQs";
            return rejectWithValue(message);
        }
    }
);