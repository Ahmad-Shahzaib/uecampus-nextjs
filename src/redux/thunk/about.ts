// src/redux/thunk/about.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = getAxiosInstance();

export const fetchAboutData = createAsyncThunk(
  "about/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("Fetching about data...");
      const response = await api.get("/home/about-us");
      // console.log("About API Response:", response.data);
      
      const apiData = response.data.data;
      
      // Transform the API data to match our interface
      const transformedData = {
        pageTitle: apiData.page_title,
        section2Image: apiData.section_2_image,
        section2ImageUrl: apiData.section_2_image_url,
        section2Title: apiData.section2_title,
        section2Title1: apiData.section_2_title_1,
        section2Description1: apiData.section_2_description_1,
        section2Title2: apiData.section_2_title_2,
        section2Description2: apiData.section_2_description_2,
        section2Title3: apiData.section_2_title_3,
        section2Description3: apiData.section_2_description_3,
      };
      
      // console.log("Transformed about data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Error fetching about data:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch about data";
      return rejectWithValue(errorMessage);
    }
  }
);