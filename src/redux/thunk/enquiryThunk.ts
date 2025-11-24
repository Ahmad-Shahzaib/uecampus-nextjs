import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export interface EnquiryPayload {
    full_name: string;
    last_name: string;
    email: string;
    number: string;
    dob: string;
    program_id: number | null;
    program_type_id: number | null;
    university_id: number | null;
    joining_academic_year: string;
    Info?: string;
}

export interface EnquiryResponse {
    message: string;
    data: Record<string, unknown>;
}

export const sendEnquiry = createAsyncThunk(
    "enquiry/sendEnquiry",
    async (payload: EnquiryPayload, { rejectWithValue }) => {
        try {
            const response = await api.post<EnquiryResponse>("/enquire", payload);
            if (response.data) return response.data;
            return rejectWithValue("Empty response from enquiry API");
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } }; message?: string };
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to send enquiry";
            return rejectWithValue(errorMessage);
        }
    }
);

export default sendEnquiry;
