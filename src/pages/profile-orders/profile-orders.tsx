import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { fetchOrders } from '../../slices/feedSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Preloader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
