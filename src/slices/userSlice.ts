import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';

interface UserState {
  name: string;
  email: string;
}

export const initialState: UserState = {
  name: '',
  email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
