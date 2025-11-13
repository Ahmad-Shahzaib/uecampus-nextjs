import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export interface ProgramType {
  id: number;
  name: string;
}

export interface University {
  id: number;
  name: string;
}

export interface Level {
  id: number;
  name: string;
}

interface ProgramsFiltersApiResponse {
  success: boolean;
  program_types?: ProgramType[];
  universities?: University[];
  levels?: Level[];
}

export interface ProgramsFiltersData {
  programTypes: ProgramType[];
  universities: University[];
  levels: Level[];
}

export const fetchProgramsData = createAsyncThunk(
  "programs/fetchProgramsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ProgramsFiltersApiResponse>(
        "/filters"
      );

      if (response.data?.success) {
        const {
          program_types: programTypes = [],
          universities = [],
          levels = [],
        } = response.data;

        if (
          Array.isArray(programTypes) &&
          Array.isArray(universities) &&
          Array.isArray(levels)
        ) {
          return {
            programTypes,
            universities,
            levels,
          } satisfies ProgramsFiltersData;
        }
      }

      return rejectWithValue("Invalid programs filters response from server");
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

