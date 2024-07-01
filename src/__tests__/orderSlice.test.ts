import { expect, test, describe, jest } from '@jest/globals';
import { OrderState, orderReducer, initialState, fetchOrderById, setOrderData, clearSelectedOrder } from '../slices/orderSlice';

// Заготовка моковых данных
const mockOrder = {
  _id: '1',
  status: 'done',
  name: 'Order 1',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 1,
  ingredients: ['ingredient1', 'ingredient2']
};

describe('order slice reducers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('должен установить статус "loading" при fetchOrderById.pending', () => {
    const action = { type: fetchOrderById.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.status).toBe('loading');
  });

  test('должен установить данные при fetchOrderById.fulfilled', () => {
    const action = { type: fetchOrderById.fulfilled.type, payload: mockOrder };
    const state = orderReducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.selectedOrder).toEqual(mockOrder);
  });

  test('должен установить ошибку при fetchOrderById.rejected', () => {
    const error = 'Error fetching order';
    const action = { type: fetchOrderById.rejected.type, error: { message: error } };
    const state = orderReducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe(error);
  });

  test('должен устанавливать выбранный заказ при setOrderData', () => {
    const action = { type: setOrderData.type, payload: mockOrder };
    const state = orderReducer(initialState, action);

    expect(state.selectedOrder).toEqual(mockOrder);
  });

  test('должен очищать выбранный заказ при clearSelectedOrder', () => {
    const preloadedState: OrderState = {
      selectedOrder: mockOrder,
      status: 'succeeded',
      error: null
    };
    const action = { type: clearSelectedOrder.type };
    const state = orderReducer(preloadedState, action);

    expect(state.selectedOrder).toBeNull();
    expect(state.status).toBe('idle');
  });
});
