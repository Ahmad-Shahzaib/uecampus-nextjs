// src/redux/thunk/contactUsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export const fetchContactUsData = createAsyncThunk(
  "contactUs/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("Thunk: Fetching contact us data...");
      // console.log("API base URL:", api.defaults.baseURL);
      
      const response = await api.get("/home/contact-us");
      // console.log("API Response status:", response.status);
      // console.log("API Response data:", response.data);

      const apiData = response.data.data;

      const transformedData = {
        contact_image: apiData.contact_image,
        contact_description: apiData.contact_description,
      };

      // console.log("Transformed Data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Thunk: Error fetching contact data:", error);
      console.error("Error response:", error.response);
      
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch contact us data";
      return rejectWithValue(errorMessage);
    }
  }
);