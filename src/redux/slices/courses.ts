// src/redux/slices/courses.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCoursesData } from "../thunk/courses";

// This Course type reflects the transformed shape returned by fetchCoursesData
interface Course {
    id: number;
    name: string;
    slug: string;
    small_description: string | undefined;
    image_path: string;
    created_at: string;
    updated_at: string;
}

interface CoursesState {
    isLoading: boolean;
    error: string | null;
    data: Course[];
}

const defaultState: CoursesState = {
    isLoading: false,
    error: null,
    data: [],
};

const coursesSlice = createSlice({
    name: "courses",
    initialState: defaultState,
    reducers: {
        resetCoursesState: () => defaultState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoursesData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCoursesData.fulfilled, (state, action: PayloadAction<Course[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCoursesData.rejected, (state, action) => {
                state.isLoading = false;
                // Prefer payload from rejectWithValue; fallback to generic error.message
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    "Failed to fetch courses";
            });
    },
});

export const { resetCoursesState } = coursesSlice.actions;

export default coursesSlice.reducer;
export const actions = coursesSlice.actions;
export { actions as coursesActions };