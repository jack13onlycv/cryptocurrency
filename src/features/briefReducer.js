/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCurrency } from '../repositories/currency-repository';
import { localLoad } from '../repositories/localStorage';

const initialState = localLoad();

export const fetchBriefCurencyThunk = createAsyncThunk(
  'briefState/fetchCurrency',
  async (id) => {
    const response = await fetchCurrency(id);
    return response;
  },
);

export const briefSlice = createSlice({
  name: 'briefState',
  initialState,
  reducers: {
    addId(state, action) {
      const foundId = state.briefs.find((item) => item.id === action.payload.id);
      if (!foundId) {
        state.briefs.push({
          id: action.payload.id,
          name: action.payload.name,
          symbol: action.payload.symbol,
          amount: +action.payload.amount,
          currPrice: +action.payload.currPrice,
        });
      } else {
        foundId.amount += +action.payload.amount;
        foundId.currPrice += +action.payload.currPrice;
        state.counter += 1;
      }
    },
    removeId(state, action) {
      state.briefs = state.briefs.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBriefCurencyThunk.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.supply = action.payload.supply;
      });
  },
});

export const selectBrief = (state) => state.briefState.briefs;
export const selectBriefCounter = (state) => state.briefState.counter;

export const { addId, removeId } = briefSlice.actions;

export default briefSlice.reducer;
