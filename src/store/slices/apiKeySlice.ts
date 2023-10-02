import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface ApiKeyState {
  value: string;
}

const initialState: ApiKeyState = {
  value: '',
};

export const apiKeySlice = createSlice({
  name: 'apiKey',
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<string>) => {
      state.value = payload;
    },
  },
});

export const { update: updateApiKey } = apiKeySlice.actions;

export const selectApiKey = (state: RootState) => state.apiKey.value;

export default apiKeySlice.reducer;
