import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProgramsData, Program } from "../thunk/programsThunk";

interface ProgramsState {
  data: Program[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProgramsState = {
  data: null,
  isLoading: false,
  error: null,
};

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    resetProgramsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProgramsData.fulfilled,
        (state, action: PayloadAction<Program[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProgramsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Failed to fetch programs data";
      });
  },
});

export const { resetProgramsState } = programsSlice.actions;
export default programsSlice.reducer;

