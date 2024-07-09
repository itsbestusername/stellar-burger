import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer, initialState, login, logout } from '../slices/authSlice';
import { getCookie, setCookie } from '../utils/cookie';

// Заготовка для мокирования cookie
jest.mock('../utils/cookie', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
}));

const mockedGetCookie = getCookie as jest.MockedFunction<typeof getCookie>;

describe('auth slice reducers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('должен установить isLoggedIn в true при login', () => {
    const action = { type: login.type };
    const state = authReducer(initialState, action);

    expect(state.isLoggedIn).toBe(true);
  });

  test('должен установить isLoggedIn в false и удалить токены при logout', () => {
    const action = { type: logout.type };
    const state = authReducer(initialState, action);

    expect(state.isLoggedIn).toBe(false);
  });
});
