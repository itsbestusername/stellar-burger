import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { orderBurgerApi } from '@api';
import { getCookie } from '../../utils/cookie';
import { useSelector, useDispatch } from '../../services/store';
import {
  setOrderRequest,
  setOrderModalData,
  clearConstructor
} from '../../slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state) => state.burgerConstructor.constructorItems
  );

  const orderRequest = useSelector(
    (state) => state.burgerConstructor.orderRequest
  );

  const orderModalData = useSelector(
    (state) => state.burgerConstructor.orderModalData
  );

  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isUserLoggedIn) {
      navigate('/login');
      return;
    }

    dispatch(setOrderRequest(true));

    orderBurgerApi([
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ])
      .then((orderData) => {
        dispatch(setOrderRequest(false));
        dispatch(setOrderModalData(orderData.order));
        dispatch(clearConstructor());

        console.log(orderData.order); //del
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
