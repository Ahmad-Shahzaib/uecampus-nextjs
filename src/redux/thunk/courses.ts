import { getAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const coursesApis = getAxiosInstance();

interface FetchCourseParams {
  // optional filters or pagination can go here
}

export const fetchCoursesData = createAsyncThunk(
  "courses/fetchAll",
  async (params: FetchCourseParams, { rejectWithValue }) => {
    try {
      const response = await coursesApis.get("/courses");
      return response.data; // returns array of courses
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch course data";
      return rejectWithValue(errorMessage);
    }
  }
);
