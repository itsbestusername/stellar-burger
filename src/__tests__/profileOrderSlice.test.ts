import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { profileOrdersReducer, fetchProfileOrders, initialState } from '../slices/profileOrderSlice';

// Заготовка моковых данных
const mockOrders= [
  {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Order 2',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 2,
    ingredients: ['ingredient3', 'ingredient4']
  }
];

describe('profileOrders slice reducers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('должен установить статус "loading" при fetchProfileOrders.pending', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);

    expect(state.status).toBe('loading');
  });

  test('должен установить данные при fetchProfileOrders.fulfilled', () => {
    const action = { type: fetchProfileOrders.fulfilled.type, payload: mockOrders };
    const state = profileOrdersReducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.orders).toEqual(mockOrders);
  });

  test('должен установить ошибку при fetchProfileOrders.rejected', () => {
    const error = 'Error fetching profile orders';
    const action = { type: fetchProfileOrders.rejected.type, error: { message: error } };
    const state = profileOrdersReducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe(error);
  });
});