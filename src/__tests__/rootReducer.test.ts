import { rootReducer } from '../reducers/rootReducer';
import { initialState as ingredientsInitialState } from '../slices/ingredientsSlice';
import { initialState as burgerConstructorInitialState } from '../slices/burgerConstructorSlice';
import { initialState as authInitialState } from '../slices/authSlice';
import { initialState as userInitialState } from '../slices/userSlice';
import { initialState as feedInitialState } from '../slices/feedSlice';
import { initialState as orderInitialState } from '../slices/orderSlice';
import { initialState as profileOrdersInitialState } from '../slices/profileOrderSlice';

describe('rootReducer', () => {
    it('should return the initial state when state is undefined and action is unknown', () => {
      const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  
      expect(state.ingredients).toEqual(ingredientsInitialState);
      expect(state.burgerConstructor).toEqual(burgerConstructorInitialState);
      expect(state.auth).toEqual(authInitialState);
      expect(state.user).toEqual(userInitialState);
      expect(state.feed).toEqual(feedInitialState);
      expect(state.order).toEqual(orderInitialState);
      expect(state.profileOrders).toEqual(profileOrdersInitialState);
    });
  });
