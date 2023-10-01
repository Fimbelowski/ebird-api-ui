import { configureStore } from '@reduxjs/toolkit';

import apiKeyReducer from './slices/apiKeySlice';
import loadingReducer from './slices/loadingSlice';
import localeOptionsReducer from './slices/localeOptionsSlice';
import taxonomyVersionOptionsReducer from './slices/taxonomyVersionOptionsSlice';

export const store = configureStore({
  reducer: {
    apiKey: apiKeyReducer,
    loading: loadingReducer,
    localeOptions: localeOptionsReducer,
    taxonomyVersionOptions: taxonomyVersionOptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
