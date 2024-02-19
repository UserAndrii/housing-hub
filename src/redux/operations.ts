import { toast } from 'react-toastify';
import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit';

import { IAd, IResponse } from '../types';
import { advertApi } from '../api/advertApi';

export const getAdvert = createAsyncThunk<IResponse>(
  'ad/getAdvert',
  async (_, { rejectWithValue }) => {
    try {
      const response = await advertApi.getAdvert();

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const createNewAd = createAsyncThunk<IAd, FormData>(
  'ad/createNewAd',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await advertApi.postAd(formData);
      toast.success('Нове оголошення успішно додано!');

      return data;
    } catch (error) {
      toast.warning(`Упс, щось пішло не так :( ${error}`);
      return rejectWithValue(error as SerializedError);
    }
  }
);
