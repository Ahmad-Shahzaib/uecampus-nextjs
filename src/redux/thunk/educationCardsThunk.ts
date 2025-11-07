// src/redux/thunk/educationCardsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export const fetchEducationCardsData = createAsyncThunk(
  "educationCards/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching education cards (partners) data...");
      const response = await api.get("/home/partners"); // Change endpoint if needed
      console.log("API Response:", response.data);

      const apiData = response.data.data as any[];

      const transformedData: any[] = apiData.map((item) => ({
        id: item.id,
        logo: item.logo,
        title: item.title,
        content: item.content,
        button_name: item.button_name,
        link: item.link,
      }));

      console.log("Transformed Data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Error fetching partners data:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch partners data";
      return rejectWithValue(errorMessage);
    }
  }
);