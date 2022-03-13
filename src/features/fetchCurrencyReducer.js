/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchCurrencies from '../repositories/currency-repository';

const initialState = {
  currencies: [],
};

export const fetchCurenciesThunk = createAsyncThunk(
  'currency/fetchCurrency',
  async (offset) => {
    const response = await fetchCurrencies(offset);
    return response;
  },
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurenciesThunk.fulfilled, (state, action) => {
        state.currencies = action.payload;
      });
  },
});

export const selectCurrencies = (state) => state.currency.currencies;

export default currencySlice.reducer;
