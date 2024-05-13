import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface TBurgerConstructor {
  bun: {
    price: number;
  };
  ingredients: TConstructorIngredient[];
}

interface burgerConstructorState {
  constructorItems: TBurgerConstructor|null;
  orderRequest: boolean;
  orderModalData: null;
}

const initialState: burgerConstructorState = {
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: [] // Пустой массив начальных ингредиентов
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
    }
  }
});

export const { setConstructorItems, setOrderRequest, setOrderModalData } =
  burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
