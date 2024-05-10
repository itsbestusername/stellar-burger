import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

// Создание асинхронной Thunk-функции для запроса ингредиентов с сервера
const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    try {
      const response = await getIngredientsApi(); // Вызываем метод API для получения ингредиентов
      return response; // Возвращаем данные об ингредиентах
    } catch (error) {
      throw Error('Failed to fetch ingredients data');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка начала запроса
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Сброс ошибки при начале загрузки
      })
      // Обработка успешного получения данных
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload; // Сохраняем полученные данные об ингредиентах
        state.error = null; // Сброс ошибки при успешной загрузке
      })
      // Обработка ошибки при получении данных
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error'; // Сохраняем сообщение об ошибке
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

// Экспорт асинхронной Thunk-функции для использования в компонентах
export { fetchIngredients };

// Селектор для получения состояния загрузки ингредиентов
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;
