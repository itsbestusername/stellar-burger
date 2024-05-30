import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { TIngredient, TOrder } from '@utils-types';

import { v4 as uuidv4 } from 'uuid';

interface TBurgerConstructor {
  bun: TIngredient;
  ingredients: TConstructorIngredient[];
}

interface burgerConstructorState {
  constructorItems: TBurgerConstructor;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: burgerConstructorState = {
  constructorItems: {
    bun: {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setConstructorItems(state, action) {
      state.constructorItems = action.payload;
    },
    setOrderRequest(state, action) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action) {
      state.orderModalData = action.payload;
    },
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare(ingredient) {
        // Проверяем, является ли ингредиент булкой
        if (ingredient.type === 'bun') {
          return {
            payload: null // Возвращаем null, если это булка, чтобы не добавлять ее
          };
        } else {
          return {
            payload: {
              ...ingredient,
              id: uuidv4() // Генерация уникального id
            }
          };
        }
      }
    },
    setBun(state, action) {
      // Устанавливаем булку
      state.constructorItems.bun = action.payload;
    },
    clearConstructor(state) {
      state.constructorItems = {
        bun: {
          _id: '',
          name: '',
          type: '',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        ingredients: []
      };
    },
    moveIngredientUp(state, action) {
      const index = action.payload;
      if (index > 0) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown(state, action) {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] = temp;
      }
    },
    removeIngredient(state, action) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    }
  }
});

export const {
  setConstructorItems,
  setOrderRequest,
  setOrderModalData,
  addIngredient,
  setBun,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient
} = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
