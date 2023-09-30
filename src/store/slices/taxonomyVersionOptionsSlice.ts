import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface TaxonomyVersionOptionsState {
  value: string[];
}

const initialState: TaxonomyVersionOptionsState = {
  value: [],
};

export const taxonomyVersionOptionsSlice = createSlice({
  name: 'taxonomyVersionOptions',
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<string[]>) => {
      state.value = payload;
    },
  },
});

export const { update } = taxonomyVersionOptionsSlice.actions;

export const selectTaxonomyVersionOptions = (state: RootState) =>
  state.taxonomyVersionOptions.value;

export default taxonomyVersionOptionsSlice.reducer;
