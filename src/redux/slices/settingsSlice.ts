import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSettingsData } from "@/redux/thunk/settingsThunk";

interface SettingsData {
    id: string;
    logo?: string;
    email?: string;
    phone_number?: string;
    description?: string;
    address?: string;
    youtube_link?: string;
    linkedin_link?: string;
    tiktok_link?: string;
    twitter_link?: string;
    instagram_link?: string;
    facebook_link?: string;
}

interface SettingsState {
    isLoading: boolean;
    error: string | null;
    data: SettingsData | null;
}

const initialState: SettingsState = {
    isLoading: false,
    error: null,
    data: null,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        resetSettingsState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettingsData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSettingsData.fulfilled, (state, action: PayloadAction<SettingsData>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchSettingsData.rejected, (state, action) => {
                state.isLoading = false;
                const payload = (action as unknown as { payload?: unknown }).payload;
                state.error = (typeof payload === "string" ? payload : undefined) || action.error?.message || "Failed to fetch settings";
            });
    },
});

export const { resetSettingsState } = settingsSlice.actions;

export default settingsSlice.reducer;
export const actions = settingsSlice.actions;
export { actions as settingsActions };
