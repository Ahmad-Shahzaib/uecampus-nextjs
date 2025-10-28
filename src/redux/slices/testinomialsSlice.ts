import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTestinomialsData } from "../thunk/testinomials";

interface Testinomial {
    _id: string;
    name: string;
    program: string;
    feedback: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface TestinomialsState {
    isLoading: boolean;
    error: string | null;
    data: Testinomial[];
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
            .addCase(fetchTestinomialsData.fulfilled, (state, action: PayloadAction<Testinomial[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchTestinomialsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch testimonials";
            });
    },
});

export const { resetTestinomialsState } = testinomialsSlice.actions;

export default testinomialsSlice.reducer;
export const actions = testinomialsSlice.actions;
export { actions as testinomialsActions };
