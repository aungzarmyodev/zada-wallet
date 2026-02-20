import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupabaseAPI } from '../supabaseApi';

export const fetchResources = createAsyncThunk(
  'resources/fetchResources',
  async (_, { rejectWithValue }) => {
    try {
      const data = await SupabaseAPI.getResources();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchServicesAndCategories = createAsyncThunk(
  'services/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const result = await SupabaseAPI.getCategoriesAndServices();
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
