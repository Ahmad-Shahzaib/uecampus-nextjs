// src/redux/thunk/aboutSection.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const aboutApi = getAxiosInstance();

export const fetchAboutSectionData = createAsyncThunk(
    "aboutSection/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Fetching about section data...");
            const response = await aboutApi.get("/home/section-2");
            console.log("About Section API Response:", response.data);
            
            const apiData = response.data.data;
            
            // Transform the API data to match our interface
            const transformedData = {
                id: apiData.id,
                title: apiData.title,
                title2: apiData.title2,
                description: apiData.description,
                buttonText: apiData.button_name,
                buttonLink: apiData.button_link,
                backgroundImage: `https://uecampus.com/images/${apiData.image}`, // Construct the full image URL
                secondCardTitle: apiData.second_card_title,
                secondCardDescription: apiData.second_card_description,
                youtubeVideo: apiData.youtube_video,
                sliderDescription: apiData.slider_description,
                createdAt: apiData.created_at,
                updatedAt: apiData.updated_at,
                section_2_long_description_1: apiData.section_2_long_description_1 || "",
            };
            
            console.log("Transformed about section data:", transformedData);
            return transformedData;
        } catch (error: any) {
            console.error("Error fetching about section data:", error);
            const errorMessage =
                error?.response?.data?.message || "Failed to fetch about section data";
            return rejectWithValue(errorMessage);
        }
    }
);