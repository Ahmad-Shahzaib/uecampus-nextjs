// src/redux/thunk/featureCards.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const featureCardsApi = getAxiosInstance();

export const fetchFeatureCardsData = createAsyncThunk(
    "featureCards/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            // console.log("Fetching feature cards data...");
            const response = await featureCardsApi.get("/home/cards");
            // console.log("Feature Cards API Response:", response.data);
            
            const apiData = response.data.data;
            
            // Transform the API data to an array of cards
            const cards = [
                {
                    id: 1,
                    title: apiData.card_1_title,
                    description: apiData.card_1_description,
                    variant: "primary" as const,
                },
                {
                    id: 2,
                    title: apiData.card_2_title,
                    description: apiData.card_2_description,
                    variant: "secondary" as const,
                },
                {
                    id: 3,
                    title: apiData.card_3_title,
                    description: apiData.card_3_description,
                    variant: "tertiary" as const,
                },
            ];
            
            // console.log("Transformed feature cards:", cards);
            return cards;
        } catch (error: any) {
            console.error("Error fetching feature cards:", error);
            const errorMessage =
                error?.response?.data?.message || "Failed to fetch feature cards";
            return rejectWithValue(errorMessage);
        }
    }
);