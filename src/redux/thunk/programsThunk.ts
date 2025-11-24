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

export interface AcademicYear {
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
  academic_years?: AcademicYear[];
  academicYears?: AcademicYear[];
}

export interface ProgramsFiltersData {
  programTypes: ProgramType[];
  universities: University[];
  levels: Level[];
  academicYears: AcademicYear[];
}

export const fetchProgramsData = createAsyncThunk(
  "programs/fetchProgramsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ProgramsFiltersApiResponse>(
        "/filters"
      );

      if (response.data?.success) {
        // Be permissive: API may return fields at top-level or under `data`,
        // and may use snake_case or camelCase keys.
        const payload = response.data as unknown as Record<string, unknown>;
        const nested = (payload['data'] as Record<string, unknown> | undefined) ?? {};

        const programTypes: ProgramType[] =
          (payload['program_types'] as ProgramType[] | undefined) ||
          (payload['programTypes'] as ProgramType[] | undefined) ||
          (nested['program_types'] as ProgramType[] | undefined) ||
          (nested['programTypes'] as ProgramType[] | undefined) || [];

        const universities: University[] =
          (payload['universities'] as University[] | undefined) ||
          (nested['universities'] as University[] | undefined) || [];

        const levels: Level[] =
          (payload['levels'] as Level[] | undefined) ||
          (nested['levels'] as Level[] | undefined) || [];

        let academicYears: AcademicYear[] =
          (payload['academic_years'] as AcademicYear[] | undefined) ||
          (payload['academicYears'] as AcademicYear[] | undefined) ||
          (nested['academic_years'] as AcademicYear[] | undefined) ||
          (nested['academicYears'] as AcademicYear[] | undefined) || [];

        // If academicYears are empty, try the /programs endpoint (some APIs return them there)
        if (!Array.isArray(academicYears) || academicYears.length === 0) {
          try {
            const resp2 = await api.get<Record<string, unknown>>("/programs");
            const p2 = resp2.data as unknown as Record<string, unknown>;
            const nested2 = (p2['data'] as Record<string, unknown> | undefined) ?? {};
            const altAcademicYears =
              (p2['academicYears'] as AcademicYear[] | undefined) ||
              (p2['academic_years'] as AcademicYear[] | undefined) ||
              (nested2['academicYears'] as AcademicYear[] | undefined) ||
              (nested2['academic_years'] as AcademicYear[] | undefined) || [];

            if (Array.isArray(altAcademicYears) && altAcademicYears.length > 0) {
              academicYears = altAcademicYears;
            }
          } catch {
            // ignore errors from fallback fetch
          }
        }

        if (
          Array.isArray(programTypes) &&
          Array.isArray(universities) &&
          Array.isArray(levels) &&
          Array.isArray(academicYears)
        ) {
          return {
            programTypes,
            universities,
            levels,
            academicYears,
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

