import { expect, test, describe, jest } from '@jest/globals';
import { userReducer, setUser, clearUser, initialState } from '../slices/userSlice';

// Заготовка моковых данных
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};

describe('user slice reducers', () => {
  test('должен устанавливать пользователя при setUser', () => {
    const action = { type: setUser.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.name).toBe(mockUser.name);
    expect(state.email).toBe(mockUser.email);
  });

  test('должен очищать пользователя при clearUser', () => {
    const preloadedState = {
      name: mockUser.name,
      email: mockUser.email
    };
    const action = { type: clearUser.type };
    const state = userReducer(preloadedState, action);

    expect(state.name).toBe('');
    expect(state.email).toBe('');
  });
});
