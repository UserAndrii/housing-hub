import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IAd } from '../types';
import { createNewAd, getAdvert } from './operations';

export interface IAdState {
  ad: IAd[];
  isLoading: boolean;
  error: unknown | null;
}

const initialState: IAdState = {
  ad: [],
  isLoading: false,
  error: null,
};

const adSlice = createSlice({
  name: 'ad',
  initialState,

  reducers: {
    addAdvert: (state, action: PayloadAction<IAd>) => {
      state.ad.push(action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getAdvert.pending, handlePending)
      .addCase(getAdvert.fulfilled, (state, action) => {
        state.ad = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAdvert.rejected, handleRejected)

      .addCase(createNewAd.pending, handlePending)
      .addCase(createNewAd.fulfilled, (state, action) => {
        adSlice.caseReducers.addAdvert(state, action);
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
