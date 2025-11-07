// src/redux/thunk/scholarship.ts
import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = getAxiosInstance();

export const fetchScholarshipData = createAsyncThunk(
  "scholarship/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching scholarship data...");
      const response = await api.get("/home/scholarship");
      console.log("Scholarship API Response:", response.data);
      
      const apiData = response.data.data;
      
      // Transform the API data to match our interface
      const transformedData = {
        id: apiData.id,
        pageTitle: apiData.page_title,
        backgroundImage: apiData.background_image,
        onlineCourses: apiData.online_courses,
        courseRating: apiData.course_rating,
        students: apiData.students,
        leftSectionTitle: apiData.left_section_title,
        leftButtonText: apiData.left_button_text,
        leftButtonLink: apiData.left_button_link,
        scholarship1Title: apiData.scholarship1_title,
        scholarship1Description: apiData.scholarship1_description,
        scholarship1ButtonText: apiData.scholarship1_button_text,
        scholarship1ButtonLink: apiData.scholarship1_button_link,
        scholarship2Title: apiData.scholarship2_title,
        scholarship2Description: apiData.scholarship2_description,
        scholarship2ButtonText: apiData.scholarship2_button_text,
        scholarship2ButtonLink: apiData.scholarship2_button_link,
        createdAt: apiData.created_at,
        updatedAt: apiData.updated_at,
      };
      
      console.log("Transformed scholarship data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Error fetching scholarship data:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch scholarship data";
      return rejectWithValue(errorMessage);
    }
  }
);