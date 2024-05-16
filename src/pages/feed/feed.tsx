import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { fetchOrders } from '../../slices/feedSlice';

export const Feed: FC = () => {
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

  const handleGetFeeds = () => {
    dispatch(fetchOrders());
  };

  if (status === 'loading' || status === 'idle') {
    return <Preloader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
