import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { SelectOptionArray } from '../../components/Select/Select';

export interface TaxonomyVersionOptionsState {
  value: SelectOptionArray<string>;
}

const initialState: TaxonomyVersionOptionsState = {
  value: [{ label: 'Latest', value: '' }],
};

export const taxonomyVersionOptionsSlice = createSlice({
  name: 'taxonomyVersionOptions',
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<SelectOptionArray<string>>) => {
      state.value = payload;
    },
  },
});

export const { update: updateTaxonomyVersionOptions } =
  taxonomyVersionOptionsSlice.actions;

export const selectTaxonomyVersionOptions = (state: RootState) =>
  state.taxonomyVersionOptions.value;

export default taxonomyVersionOptionsSlice.reducer;
