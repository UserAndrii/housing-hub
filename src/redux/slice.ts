import { createSlice } from '@reduxjs/toolkit';

import { IAd } from '../types';
import { createNewAd, getAdvert } from './operations';

export interface IAdState {
  count: number;
  ad: IAd[];
  isLoading: boolean;
  error: unknown | null;
}

const initialState: IAdState = {
  count: 0,
  ad: [],
  isLoading: false,
  error: null,
};

const adSlice = createSlice({
  name: 'ad',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getAdvert.pending, handlePending)
      .addCase(getAdvert.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.ad = action.payload.advertisement;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAdvert.rejected, handleRejected)

      .addCase(createNewAd.pending, handlePending)
      .addCase(createNewAd.fulfilled, (state, action) => {
        state.ad.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createNewAd.rejected, handleRejected);
  },
});

function handlePending(state: { isLoading: boolean }) {
  state.isLoading = true;
}

function handleRejected(
  state: { isLoading: boolean; error: unknown },
  action: { payload: unknown }
) {
  state.isLoading = false;
  state.error = action.payload;
}

export const adReducer = adSlice.reducer;
