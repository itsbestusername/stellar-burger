import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { orderBurgerApi } from '@api';
import { RootState, useSelector, useDispatch } from '../../services/store';
import {
  setOrderRequest,
  setOrderModalData,
  clearConstructor
} from '../../slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor.constructorItems
  );
  const orderRequest = useSelector(
    (state: RootState) => state.burgerConstructor.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstructor.orderModalData
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    dispatch(setOrderRequest(true));

    orderBurgerApi([
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ])
      .then((orderData) => {
        dispatch(setOrderRequest(false));
        dispatch(setOrderModalData(orderData.order));
        dispatch(clearConstructor());
      })
      .catch(() => {
        dispatch(setOrderRequest(false));
      });
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
