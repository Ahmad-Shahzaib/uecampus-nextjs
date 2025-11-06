// src/redux/thunk/howToApply.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = getAxiosInstance();

export const fetchHowToApplyData = createAsyncThunk(
  "howToApply/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching how to apply data...");
      const response = await api.get("/home/how-to-apply");
      console.log("How To Apply API Response:", response.data);
      
      const apiData = response.data.data;
      
      // Transform the API data to match our interface
      const transformedData = {
        id: apiData.id,
        sectionTitle: apiData.section_title,
        sectionTitle2: apiData.section_title2,
        sectionDescription2: apiData.section_description2,
        description: apiData.description,
        buttonName: apiData.button_name,
        buttonLink: apiData.button_link,
        buttonName2: apiData.button_name2,
        buttonLink2: apiData.button_link2,
        video: apiData.video,
        createdAt: apiData.created_at,
        updatedAt: apiData.updated_at,
      };
      
      console.log("Transformed how to apply data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Error fetching how to apply data:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch how to apply data";
      return rejectWithValue(errorMessage);
    }
  }
);