import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";
import { Partner } from "../slices/educationCardsSlice";

const api = getAxiosInstance();

interface ApiResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    logo: string;
    title: string;
    content: string;
    button_name: string;
    link: string;
  }>;
}

export const fetchEducationCardsData = createAsyncThunk<
  Partner[],
  void,
  { rejectValue: string }
>(
  "educationCards/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("🚀 Fetching education cards (partners) data from /home/partners...");
      
      const response = await api.get<ApiResponse>("/home/partners");
      
      console.log("✅ API Response received:", {
        status: response.status,
        dataLength: response.data?.data?.length,
        fullResponse: response.data
      });

      // Ensure we have valid data
      if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
        console.error("❌ Invalid response structure:", response.data);
        return rejectWithValue("Invalid response structure from API");
      }

      const apiData = response.data.data;
      // console.log(`📊 Processing ${apiData.length} partner records...`);

      // Transform data - keeping it simple and direct
      const transformedData: Partner[] = apiData.map((item, index) => {
        console.log(`   Partner ${index + 1}:`, item.title);
        return {
          id: item.id,
          logo: item.logo,
          title: item.title,
          content: item.content,
          button_name: item.button_name,
          link: item.link,
        };
      });

      console.log(`✅ Successfully transformed ${transformedData.length} partners:`, 
        transformedData.map(p => ({ id: p.id, title: p.title }))
      );

      return transformedData;
    } catch (error: any) {
      console.error("❌ Error fetching partners data:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status
      });
      
      const errorMessage =
        error?.response?.data?.message || 
        error?.message || 
        "Failed to fetch partners data";
      
      return rejectWithValue(errorMessage);
    }
  }
);