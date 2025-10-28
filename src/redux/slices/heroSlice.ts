import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHeroData } from "../thunk/hero";

interface Hero {
    _id: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
    createdAt: string;
    updatedAt: string;
}

interface HeroState {
    isLoading: boolean;
    error: string | null;
    data: Hero | null;
}

const initialState: HeroState = {
    isLoading: false,
    error: null,
    data: null,
};

const heroSlice = createSlice({
    name: "hero",
    initialState,
    reducers: {
        resetHeroState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHeroData.fulfilled, (state, action: PayloadAction<Hero>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchHeroData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch hero data";
            });
    },
});

export const { resetHeroState } = heroSlice.actions;
export default heroSlice.reducer;
export const actions = heroSlice.actions;
export { actions as heroActions };
