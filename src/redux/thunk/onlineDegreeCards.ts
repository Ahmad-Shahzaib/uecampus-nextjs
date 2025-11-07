// src/redux/thunk/onlineDegreeCards.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = getAxiosInstance();

export const fetchOnlineDegreeCards = createAsyncThunk(
  "onlineDegreeCards/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching online degree cards data...");
      const response = await api.get("/home/online-degree-cards");
      console.log("API Response:", response.data);
      
      const apiData = response.data.data;
      
      // Transform the API data to match our interface
      const transformedData = [
        {
          title: apiData.card_1_title,
          description: apiData.card_1_description,
        },
        {
          title: apiData.card_2_title,
          description: apiData.card_2_description,
        },
        {
          title: apiData.card_3_title,
          description: apiData.card_3_description,
        },
        {
          title: apiData.card_4_title,
          description: apiData.card_4_description,
        },
        {
          title: apiData.card_5_title,
          description: apiData.card_5_description,
        },
        {
          title: apiData.card_6_title,
          description: apiData.card_6_description,
        },
        {
          title: apiData.card_7_title,
          description: apiData.card_7_description,
        },
        {
          title: apiData.card_8_title,
          description: apiData.card_8_description,
        },
      ];
      
      console.log("Transformed data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Error fetching online degree cards data:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch online degree cards data";
      return rejectWithValue(errorMessage);
    }
  }
);