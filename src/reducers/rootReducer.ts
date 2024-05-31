import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { authReducer } from '../slices/authSlice';
import { userReducer } from '../slices/userSlice';
import { feedReducer } from '../slices/feedSlice';
import { orderReducer } from '../slices/orderSlice';
import { profileOrdersReducer } from '../slices/profileOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer
});
