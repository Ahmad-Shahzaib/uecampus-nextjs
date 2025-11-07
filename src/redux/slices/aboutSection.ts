// src/redux/slices/aboutSection.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAboutSectionData } from "../thunk/aboutSection";

interface AboutSectionData {
    id: number;
    title: string;
    title2: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
    secondCardTitle: string;
    secondCardDescription: string;
    youtubeVideo: string;
    sliderDescription: string;
    createdAt: string | null;
    updatedAt: string;
}

interface AboutSectionState {
    isLoading: boolean;
    error: string | null;
    data: AboutSectionData | null;
}

const initialState: AboutSectionState = {
    isLoading: false,
    error: null,
    data: null,
};

const aboutSectionSlice = createSlice({
    name: "aboutSection",
    initialState,
    reducers: {
        resetAboutSectionState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutSectionData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAboutSectionData.fulfilled, (state, action: PayloadAction<AboutSectionData>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAboutSectionData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Failed to fetch about section data";
            });
    },
});

export const { resetAboutSectionState } = aboutSectionSlice.actions;
export default aboutSectionSlice.reducer;
export const actions = aboutSectionSlice.actions;
export { actions as aboutSectionActions };