
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = getAxiosInstance();

export const fetchHeroSectionData = createAsyncThunk(
  "heroSection/fetchHeroSectionData",
  async (_, { rejectWithValue }) => {
    try {
  
      const response = await api.get("/home/section-3");
      console.log("Hero Section API Response:", response.data);

      if (response.data.success && response.data.data) {
        const apiData = response.data.data;
        
      
        const transformedData = {
          section_title: apiData.section_title,
          section_description: apiData.section_description,
        };
        
        
        return transformedData;
      } else {
        return rejectWithValue("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Error fetching hero section data:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch hero section data";
      return rejectWithValue(errorMessage);
    }
  }
);
