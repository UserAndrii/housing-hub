import { toast } from 'react-toastify';
import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit';

import { IAd, IResponse } from '../types';
import { advertApi } from '../api/advertApi';

export const getAdvert = createAsyncThunk<
  IResponse,
  void,
  { rejectValue: SerializedError }
>('ad/getAdvert', async (_, { rejectWithValue }) => {
  try {
    const { data } = await advertApi.getAdvert();
    return { data };
  } catch (error) {
    return rejectWithValue(error as SerializedError);
  }
});

export const createNewAd = createAsyncThunk<{ data: IAd }, FormData>(
  'ad/createNewAd',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await advertApi.postAd(formData);

      toast.success('Нове оголошення успішно додано!');

      return data;
    } catch (error) {
      toast.success(`Упс, щось пішло не так :( ${error}`);
      return rejectWithValue(error as SerializedError);
    }
  }
);
