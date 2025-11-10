// src/redux/slices/missionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMissionData } from "../thunk/missionThunk";

export interface MissionData {
  id: number;
  section_1_title: string;
  section_1_subtitle: string;
  section_1_description: string;
  mission_title: string;
  mission_description: string;
  vision_title: string;
  vision_description: string;
  created_at: string;
  updated_at: string;
}

interface MissionState {
  isLoading: boolean;
  error: string | null;
  data: MissionData | null;
}

const initialState: MissionState = {
  isLoading: false,
  error: null,
  data: null,
};

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    resetMissionState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissionData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchMissionData.fulfilled,
        (state, action: PayloadAction<MissionData>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchMissionData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to fetch mission data";
      });
  },
});

export const { resetMissionState } = missionSlice.actions;
export default missionSlice.reducer;

