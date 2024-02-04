import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './homeSlice';
import detailsSlice from './detailsSlice';

export const store = configureStore({
  reducer: {
    home: homeSlice,
    details: detailsSlice,
  },
});