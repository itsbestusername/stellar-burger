import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { feedReducer, fetchOrders, initialState } from '../slices/feedSlice';

// Заготовка моковых данных
const mockOrders = [
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

const expectedResult = {
  success: true,
  orders: mockOrders,
  total: 100,
  totalToday: 10,
};

describe('feed slice reducers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // test('должен корректно выполнять fetchOrders', async () => {
  //   const fetchMock = jest.fn(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve(expectedResult),
  //     } as Response)
  //   );

  //   global.fetch = fetchMock;

  //   const store = configureStore({
  //     reducer: { feed: feedReducer },
  //   });

  //   await store.dispatch(fetchOrders());

  //   const state = store.getState().feed;
  //   console.log('Orders from state:', state.orders); // отладочный вывод
  //   console.log('Expected orders:', expectedResult.orders); // отладочный вывод

  //   expect(state.orders).toEqual(mockOrders);
  //   expect(state.status).toBe('succeeded');
  //   expect(state.error).toBeNull();
  // });

  test('должен установить статус "loading" при fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.status).toBe('loading');
  });

  test('должен установить данные при fetchOrders.fulfilled', () => {
    const action = { type: fetchOrders.fulfilled.type, payload: expectedResult.orders };
    const state = feedReducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.orders).toEqual(mockOrders);
  });

  test('должен установить ошибку при fetchOrders.rejected', () => {
    const error = 'Error fetching orders';
    const action = { type: fetchOrders.rejected.type, error: { message: error } };
    const state = feedReducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe(error);
  });
});