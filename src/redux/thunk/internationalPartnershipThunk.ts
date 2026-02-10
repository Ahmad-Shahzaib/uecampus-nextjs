// src/redux/thunk/internationalPartnershipThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export const fetchInternationalPartnershipData = createAsyncThunk(
  "internationalPartnership/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("Fetching international partnership data...");
      const response = await api.get("/home/international-partnership");
      // console.log("API Response:", response.data);

      const apiData = response.data.data;

      const transformedData = {
        id: apiData.id,
        title: apiData.title,
        description: apiData.description,
        hero_image: apiData.hero_image,
        feature1_title: apiData.feature1_title,
        feature1_description: apiData.feature1_description,
        feature2_title: apiData.feature2_title,
        feature2_description: apiData.feature2_description,
        feature3_title: apiData.feature3_title,
        feature3_description: apiData.feature3_description,
      };

      // console.log("Transformed Data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Error fetching partnership data:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch international partnership data";
      return rejectWithValue(errorMessage);
    }
  }
);