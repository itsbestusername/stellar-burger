import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../services/store';

export const fetchOrders = createAsyncThunk('feed/fetchOrders', async () => {
  const response = await getFeedsApi();
  return response.orders;
});

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle',
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const selectOrders = (state: RootState): TOrder[] => state.feed.orders;
export const selectFeedInfo = (state: RootState) => state.feed;
