import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { SelectOption } from '../../components/Select/Select';
import type { RootState } from '../store';

export interface LocaleOptionsState {
  value: Array<SelectOption<string>>;
}

const initialState: LocaleOptionsState = {
  value: [
    {
      label: 'English',
      value: 'en',
    },
  ],
};

export const localeOptionsSlice = createSlice({
  name: 'localeOptions',
  initialState,
  reducers: {
    update: (
      state,
      { payload }: PayloadAction<Array<SelectOption<string>>>
    ) => {
      state.value = payload;
    },
  },
});

export const { update } = localeOptionsSlice.actions;

export const selectLocaleOptions = (state: RootState) =>
  state.localeOptions.value;

export default localeOptionsSlice.reducer;
