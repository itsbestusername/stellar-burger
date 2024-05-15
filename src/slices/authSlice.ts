import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!getCookie('accessToken') // Проверяем наличие токена при инициализации
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
