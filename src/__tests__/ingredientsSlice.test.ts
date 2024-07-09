import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer, fetchIngredients, initialState, setSelectedIngredient } from '../slices/ingredientsSlice';

// Заготовка моковых данных
const mockIngredients = [
  {
    _id: '1',
    name: 'Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: 'image1.png',
    image_large: 'image1_large.png',
    image_mobile: 'image1_mobile.png',
  },
  {
    _id: '2',
    name: 'Ingredient 2',
    type: 'main',
    proteins: 15,
    fat: 25,
    carbohydrates: 35,
    calories: 45,
    price: 55,
    image: 'image2.png',
    image_large: 'image2_large.png',
    image_mobile: 'image2_mobile.png',
  },
];

describe('ingredients slice reducers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('должен установить статус "loading" при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  test('должен установить данные при fetchIngredients.fulfilled', () => {
    const action = { type: fetchIngredients.fulfilled.type, payload: mockIngredients };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('должен установить ошибку при fetchIngredients.rejected', () => {
    const error = 'Error fetching ingredients';
    const action = { type: fetchIngredients.rejected.type, error: { message: error } };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('должен устанавливать выбранный ингредиент при setSelectedIngredient', () => {
    const selectedIngredient = mockIngredients[0];
    const action = { type: setSelectedIngredient.type, payload: selectedIngredient };
    const state = ingredientsReducer(initialState, action);

    expect(state.selectedIngredient).toEqual(selectedIngredient);
  });
});
