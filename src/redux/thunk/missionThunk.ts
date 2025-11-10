// src/redux/thunk/missionThunk.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = getAxiosInstance();

export const fetchMissionData = createAsyncThunk(
  "mission/fetchMissionData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching mission data...");
      const response = await api.get("/home/mission");
      console.log("Mission API Response:", response.data);

      if (response.data.status && response.data.data) {
        const apiData = response.data.data;
        
        // Transform the API data to match our interface
        const transformedData = {
          id: apiData.id,
          section_1_title: apiData.section_1_title,
          section_1_subtitle: apiData.section_1_subtitle,
          section_1_description: apiData.section_1_description,
          mission_title: apiData.mission_title,
          mission_description: apiData.mission_description,
          vision_title: apiData.vision_title,
          vision_description: apiData.vision_description,
          created_at: apiData.created_at,
          updated_at: apiData.updated_at,
        };
        
        console.log("Transformed mission data:", transformedData);
        return transformedData;
      } else {
        return rejectWithValue("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Error fetching mission data:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch mission data";
      return rejectWithValue(errorMessage);
    }
  }
);

