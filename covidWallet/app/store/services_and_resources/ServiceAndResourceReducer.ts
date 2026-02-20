import { createSlice } from '@reduxjs/toolkit';
import { CategoryObj, ResourceObj, ServiceObj } from './ServieAndResourceModels';
import { fetchResources, fetchServicesAndCategories } from './Thunk';

type ResourceState = {
  resources: ResourceObj[];
  loading: boolean;
  error: string | null;
};

const resourcesInitialState: ResourceState = {
  resources: [],
  loading: false,
  error: null,
};

type ServicesState = {
  categories: CategoryObj[];
  services: ServiceObj[];
  loading: boolean;
  error: string | null;
};

const servicesInitialState: ServicesState = {
  categories: [],
  services: [],
  loading: false,
  error: null,
};

const ResourcesSlice = createSlice({
  name: 'resources',
  initialState: resourcesInitialState,
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
        state.error = action.error as string;
      });
  },
});

const ServicesSlice = createSlice({
  name: 'services',
  initialState: servicesInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchServicesAndCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesAndCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.services = action.payload.services;
      })
      .addCase(fetchServicesAndCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export { ResourcesSlice, ServicesSlice };
