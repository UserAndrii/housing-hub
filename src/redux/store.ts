import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { adReducer } from './slice';

export const store = configureStore({
  reducer: { ad: adReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type IAppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => IAppDispatch = useDispatch;
