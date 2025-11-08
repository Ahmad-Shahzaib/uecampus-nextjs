import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.uecampus.com' // Replace with your actual API base URL
});

import { 
  fetchCourseDetailStart, 
  fetchCourseDetailSuccess, 
  fetchCourseDetailFailure 
} from '../slices/detailCourseSlice';

export const fetchCourseDetail = createAsyncThunk(
  'courseDetail/fetchCourseDetail',
  async (slug: string, { dispatch }) => {
    try {
      dispatch(fetchCourseDetailStart());
      
      // Use the slug parameter in the API call
      const response = await api.get(`/course/${slug}`);
      
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
    }
  }
);