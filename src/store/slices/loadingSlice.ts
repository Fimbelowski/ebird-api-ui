import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface LoadingState {
  isLoadingPosition: boolean;
  isLoadingRequest: boolean;
}

const initialState: LoadingState = {
  isLoadingPosition: false,
  isLoadingRequest: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    updateIsLoadingPosition: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingPosition = payload;
    },
    updateIsLoadingReqeust: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingRequest = payload;
    },
  },
});

export const { updateIsLoadingPosition, updateIsLoadingReqeust } =
  loadingSlice.actions;

export const selectIsLoadingPosition = (state: RootState) =>
  state.loading.isLoadingPosition;

export const selectIsLoadingRequest = (state: RootState) =>
  state.loading.isLoadingRequest;

export default loadingSlice.reducer;
