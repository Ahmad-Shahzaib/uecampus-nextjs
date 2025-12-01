import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";
import axios from "axios";

const apis = getAxiosInstance();

// Fetch prioritized course IDs from server endpoint `/get/courses`.
// Some deployments host this route at the app root ("/get/courses") rather
// than under the API proxy ("/api/get/courses"). Try the configured
// axios instance first, then fall back to a direct request to
// `${window.location.origin}/get/courses` so the request is made from
// the browser origin and appears in the Network tab.
export const fetchCourseOrder = createAsyncThunk(
  "courseOrder/fetch",
  async (_: void, { rejectWithValue }) => {
    try {
      // Primary attempt using configured instance
      const resp = await apis.get("/get/courses");
      const payload = resp?.data ?? {};
        const ids = Array.isArray(payload?.data) ? (payload.data as Array<string | number>) : [];
      return ids.map((id) => String(id));
    } catch (firstError: unknown) {
      // Try a direct browser-origin request as a fallback (only on client)
      try {
        if (typeof window !== "undefined") {
          const url = `${window.location.origin}/get/courses`;
          const resp2 = await axios.get(url, { timeout: 10000 });
          const payload2 = resp2?.data ?? {};
            const ids2 = Array.isArray(payload2?.data) ? (payload2.data as Array<string | number>) : [];
          return ids2.map((id) => String(id));
        }
      } catch (secondError: unknown) {
        const err = (secondError as any) || (firstError as any);
        const message = err?.response?.data?.message || "Failed to fetch course order";
        return rejectWithValue(message);
      }

      const err = firstError as any;
      const message = err?.response?.data?.message || "Failed to fetch course order";
      return rejectWithValue(message);
    }
  }
);
