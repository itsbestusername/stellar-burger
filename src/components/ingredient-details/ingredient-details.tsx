import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from '../../services/store';
import {
  selectIngredients,
  setSelectedIngredient
} from '../../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientData = useSelector(
    (state) => state.ingredients.selectedIngredient
  );

  console.log(ingredientData); //del

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (id && ingredients.length > 0) {
      const selectedIngredient = ingredients.find(
        (ing: TIngredient) => ing._id === id
      );
      if (selectedIngredient) {
        dispatch(setSelectedIngredient(selectedIngredient));
      }
    }
  }, [dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
