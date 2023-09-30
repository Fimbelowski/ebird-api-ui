import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface LocaleOptionsState {
  value: string[];
}

const initialState: LocaleOptionsState = {
  value: [],
};

export const localeOptionsSlice = createSlice({
  name: 'localeOptions',
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<string[]>) => {
      state.value = payload;
    },
  },
});

export const { update } = localeOptionsSlice.actions;

export const selectLocaleOptions = (state: RootState) =>
  state.localeOptions.value;

export default localeOptionsSlice.reducer;
