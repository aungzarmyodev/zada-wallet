import { RootState } from '..';

export const selectResourcesState = (s: RootState) => s.resources;

export const selectServiceState = (s: RootState) => s.services;
