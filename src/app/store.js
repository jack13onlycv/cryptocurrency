/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import fetchCurrencyReducer from '../features/fetchCurrencyReducer';
import briefReducer from '../features/briefReducer';
import { localSave } from '../repositories/localStorage';

export const store = configureStore({
  reducer: {
    currency: fetchCurrencyReducer,
    briefState: briefReducer,
  },
});

store.subscribe(() => {
  const data = store.getState();
  if (data.briefState) localSave(store.getState());
});
