import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../utils/cookie';

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
      setCookie('accessToken', '', { expires: -1 });
      localStorage.removeItem('refreshToken');
    }
  }
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
