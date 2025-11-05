// src/redux/slices/featureCards.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFeatureCardsData } from "../thunk/featureCards";

export interface FeatureCard {
    id: number;
    title: string;
    description: string;
    variant: "primary" | "secondary" | "tertiary";
}

interface FeatureCardsState {
    isLoading: boolean;
    error: string | null;
    data: FeatureCard[];
}

const initialState: FeatureCardsState = {
    isLoading: false,
    error: null,
    data: [],
};

const featureCardsSlice = createSlice({
    name: "featureCards",
    initialState,
    reducers: {
        resetFeatureCardsState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeatureCardsData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFeatureCardsData.fulfilled, (state, action: PayloadAction<FeatureCard[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchFeatureCardsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Failed to fetch feature cards";
            });
    },
});

export const { resetFeatureCardsState } = featureCardsSlice.actions;
export default featureCardsSlice.reducer;
export const actions = featureCardsSlice.actions;
export { actions as featureCardsActions };