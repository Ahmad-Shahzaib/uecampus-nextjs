// src/redux/thunk/detailCourseThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosInstance } from "@/lib/axios";

const api = getAxiosInstance();

export const fetchDetailCourseData = createAsyncThunk(
  "detailCourse/fetchData",
  async (slug: string, { rejectWithValue }) => {
    try {
      console.log("Fetching detail course data for slug:", slug);
      const response = await api.get(`/course/${slug}`);
      console.log("API Response:", response.data);

      const apiData = response.data.data;

      // Transform the response to match our interface
      const transformedData = {
        course: {
          id: apiData.course.id,
          name: apiData.course.name,
          slug: apiData.course.slug,
          program_id: apiData.course.program_id,
          cat_id: apiData.course.cat_id,
          status: apiData.course.status,
          content: apiData.course.content,
          small_description: apiData.course.small_description,
          meta_tags: apiData.course.meta_tags,
          meta_description: apiData.course.meta_description,
          page: apiData.course.page,
          image_path: apiData.course.image_path,
          video: apiData.course.video,
          created_at: apiData.course.created_at,
          updated_at: apiData.course.updated_at,
        },
        payment: {
          id: apiData.payment.id,
          course_id: apiData.payment.course_id,
          title: apiData.payment.title,
          description: apiData.payment.description,
          created_at: apiData.payment.created_at,
          updated_at: apiData.payment.updated_at,
        },
        full_payment: {
          id: apiData.full_payment.id,
          course_id: apiData.full_payment.course_id,
          payment_title: apiData.full_payment.payment_title,
          payment_description: apiData.full_payment.payment_description,
          currency: apiData.full_payment.currency,
          total_fee: apiData.full_payment.total_fee,
          charge_payment: apiData.full_payment.charge_payment,
          content: apiData.full_payment.content,
          created_at: apiData.full_payment.created_at,
          updated_at: apiData.full_payment.updated_at,
        },
      };

      console.log("Transformed Course Data:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Error fetching course data:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch course data";
      return rejectWithValue(errorMessage);
    }
  }
);