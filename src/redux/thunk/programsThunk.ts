import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export interface ProgramCategory {
  id: number;
  program_id: string;
  name: string;
}

export interface Program {
  id: number;
  name: string;
  slug: string;
  categories: ProgramCategory[];
}

interface ProgramsApiResponse {
  success: boolean;
  programs: Program[];
}

export const fetchProgramsData = createAsyncThunk(
  "programs/fetchProgramsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ProgramsApiResponse>("/courses/programs");

      if (response.data?.success && Array.isArray(response.data.programs)) {
        return response.data.programs;
      }

      return rejectWithValue("Invalid programs response from server");
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch programs data";

      return rejectWithValue(errorMessage);
    }
  }
);

