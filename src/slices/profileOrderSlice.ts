import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../services/store';

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

interface ProfileOrdersState {
  orders: TOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const initialState: ProfileOrdersState = {
  orders: [],
  status: 'idle',
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
export const profileOrders = (state: RootState): TOrder[] =>
  state.profileOrders.orders;
export const profileOrdersStatus = (state: RootState) =>
  state.profileOrders.status;
export const profileOrdersError = (state: RootState) =>
  state.profileOrders.error;
