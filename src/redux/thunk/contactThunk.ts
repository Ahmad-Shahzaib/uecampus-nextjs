import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  country: string;
  message?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
  };
}

export const sendContact = createAsyncThunk(
  "contact/sendContact",
  async (payload: ContactPayload, { rejectWithValue }) => {
    try {
      const response = await api.post<ContactResponse>("/contact", payload);
      if (response.data) return response.data;
      return rejectWithValue("Empty response from contact API");
    } catch (error: any) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to send contact";
      return rejectWithValue(errorMessage);
    }
  }
);

export default sendContact;