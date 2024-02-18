import { IAd } from '../types';

export const selectIsLoading = (state: { ad: { isLoading: boolean } }) =>
  state.ad.isLoading;

export const selectIsError = (state: { ad: { error: unknown | null } }) =>
  state.ad.error;

export const selectAd = (state: { ad: { ad: IAd[] } }) => state.ad.ad;
