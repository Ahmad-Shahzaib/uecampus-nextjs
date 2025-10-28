import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAboutData } from "../thunk/about";

interface About {
    _id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface AboutState {
    isLoading: boolean;
    error: string | null;
    data: About | null;
}

const initialState: AboutState = {
    isLoading: false,
    error: null,
    data: null,
};

const aboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {
        resetAboutState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAboutData.fulfilled, (state, action: PayloadAction<About>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAboutData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch about data";
            });
    },
});

export const { resetAboutState } = aboutSlice.actions;

export default aboutSlice.reducer;
export const actions = aboutSlice.actions;
export { actions as aboutActions };
