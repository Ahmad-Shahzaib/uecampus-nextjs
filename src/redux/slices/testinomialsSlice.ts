import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTestinomialsData } from "../thunk/testinomials";

interface LogoItem {
    id: string;
    name?: string;
    src: string;
    alt?: string;
    createdAt?: string | null;
    updatedAt?: string | null;
}

interface TestinomialsState {
    isLoading: boolean;
    error: string | null;
    data: LogoItem[];
}

const initialState: TestinomialsState = {
    isLoading: false,
    error: null,
    data: [],
};

const testinomialsSlice = createSlice({
    name: "testinomials",
    initialState,
    reducers: {
        resetTestinomialsState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestinomialsData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTestinomialsData.fulfilled, (state, action: PayloadAction<LogoItem[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchTestinomialsData.rejected, (state, action) => {
                state.isLoading = false;
                // Prefer rejectWithValue payload (available at action.payload) if provided
                // but fallback to action.error.message
                // action.payload may be set when rejectWithValue is used in the thunk
                const payload = (action as unknown as { payload?: unknown }).payload;
                state.error = (typeof payload === "string" ? payload : undefined) || action.error?.message || "Failed to fetch testimonials";
            });
    },
});

export const { resetTestinomialsState } = testinomialsSlice.actions;

export default testinomialsSlice.reducer;
export const actions = testinomialsSlice.actions;
export { actions as testinomialsActions };
