import { burgerConstructorReducer, addIngredient, removeIngredient, moveIngredientUp, moveIngredientDown } from '../slices/burgerConstructorSlice';
import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

// Mock для uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

const ingredient1: TIngredient = {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image1',
    image_large: 'image_large1',
    image_mobile: 'image_mobile1'
  };
  
  const ingredient2: TIngredient = {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'main',
    proteins: 15,
    fat: 7,
    carbohydrates: 25,
    calories: 120,
    price: 60,
    image: 'image2',
    image_large: 'image_large2',
    image_mobile: 'image_mobile2'
  };
  
  const initialState = {
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
  
  describe('burgerConstructor slice', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should handle adding an ingredient', () => {
      const action = addIngredient(ingredient1);
      const state = burgerConstructorReducer(initialState, action);
  
      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.ingredients[0]).toEqual({
        ...ingredient1,
        id: 'mocked-uuid'
      });
    });
  
    it('should handle removing an ingredient', () => {
      const stateWithIngredient = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [{ ...ingredient1, id: 'mocked-uuid' }]
        }
      };
      const action = removeIngredient(0);
      const state = burgerConstructorReducer(stateWithIngredient, action);
  
      expect(state.constructorItems.ingredients).toHaveLength(0);
    });
  
    it('should handle moving an ingredient up', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [
            { ...ingredient1, id: 'id-1' },
            { ...ingredient2, id: 'id-2' }
          ]
        }
      };
      const action = moveIngredientUp(1);
      const state = burgerConstructorReducer(stateWithIngredients, action);
  
      expect(state.constructorItems.ingredients[0].id).toBe('id-2');
      expect(state.constructorItems.ingredients[1].id).toBe('id-1');
    });
  
    it('should handle moving an ingredient down', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [
            { ...ingredient1, id: 'id-1' },
            { ...ingredient2, id: 'id-2' }
          ]
        }
      };
      const action = moveIngredientDown(0);
      const state = burgerConstructorReducer(stateWithIngredients, action);
  
      expect(state.constructorItems.ingredients[0].id).toBe('id-2');
      expect(state.constructorItems.ingredients[1].id).toBe('id-1');
    });
  });