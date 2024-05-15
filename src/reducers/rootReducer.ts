import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { authReducer } from '../slices/authSlice';
import { userReducer } from '../slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  user: userReducer
});
