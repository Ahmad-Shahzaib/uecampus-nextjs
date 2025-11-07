import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.uecampus.com' // Replace with your actual API base URL
});
import { 
  fetchCourseDetailStart, 
  fetchCourseDetailSuccess, 
  fetchCourseDetailFailure 
} from '../slices/courseDetailSlice';

export const fetchCourseDetail = createAsyncThunk(
  'courseDetail/fetchCourseDetail',
  async (slug: string, { dispatch }) => {
    try {
      dispatch(fetchCourseDetailStart());
      
      const response = await api.get(`/course/mba-in-hospitality-tourism-eie-european-business-school`);
      
      if (response.data.success) {
        dispatch(fetchCourseDetailSuccess(response.data.data));
        return response.data.data;
      } else {
        throw new Error('Failed to fetch course details');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch course details';
      dispatch(fetchCourseDetailFailure(message));
      throw error;
      // Remove previous line since we handle error message in the next lines
      throw error;
    }
  }
);