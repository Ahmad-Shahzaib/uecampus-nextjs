import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = getAxiosInstance();

export const fetchAccreditationData = createAsyncThunk(
  "accreditation/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching accreditation data...");
      const response = await api.get("/home/accreditation"); // Adjust endpoint as needed
      console.log("Accreditation API Response:", response.data);
      
      // The API response structure is: { status: boolean, message: string, data: {...} }
      const apiData = response.data.data;
      
      // Transform the API data to match our interface
      const transformedData = {
        id: apiData.id,
        title: apiData.title,
        hero_image: apiData.hero_image,
      };
      
      console.log("Transformed accreditation data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Error fetching accreditation data:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch accreditation data";
      return rejectWithValue(errorMessage);
    }
  }
);