import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export const fetchSettingsData = createAsyncThunk(
    "settings/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/settings");
            const payload = response?.data?.data ?? response?.data ?? null;
            if (!payload) return rejectWithValue("No settings returned");
            // Ensure known keys exist and are strings
            const settings = {
                id: String(payload.id ?? ""),
                logo: (payload.logo as string) ?? "",
                email: (payload.email as string) ?? "",
                phone_number: (payload.phone_number as string) ?? "",
                description: (payload.description as string) ?? "",
                address: (payload.address as string) ?? "",
                youtube_link: (payload.youtube_link as string) ?? "",
                linkedin_link: (payload.linkedin_link as string) ?? "",
                tiktok_link: (payload.tiktok_link as string) ?? "",
                twitter_link: (payload.twitter_link as string) ?? "",
                instagram_link: (payload.instagram_link as string) ?? "",
                facebook_link: (payload.facebook_link as string) ?? "",
            };
            return settings;
        } catch (err) {
            return rejectWithValue("Failed to fetch settings");
        }
    }
);
