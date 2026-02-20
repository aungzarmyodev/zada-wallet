import { createSlice } from '@reduxjs/toolkit';
import { ResourceObj } from './ServieAndResourceModels';
import { fetchResources } from './Thunk';

type ResourceState = {
  resources: ResourceObj[];
  loading: boolean;
  error: string | null;
};

const initialState: ResourceState = {
  resources: [],
  loading: false,
  error: null,
};

const ServiceAndResourcesSlice = createSlice({
  name: 'serviceandresources',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchResources.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export { ServiceAndResourcesSlice };
