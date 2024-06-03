import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getUserApi } from '@api';
import { getCookie } from '../../utils/cookie';
import {
  setSelectedIngredient,
  fetchIngredients
} from '../../slices/ingredientsSlice';
import { setUser } from '../../slices/userSlice';
import { clearSelectedOrder } from '../../slices/orderSlice';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { PublicRoute } from '../publicRoute/publicRoute';

import { AppHeader } from '@components';
import { ConstructorPage } from '../../pages/constructor-page';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { NotFound404 } from '../../pages/not-fount-404';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredients());

    const fetchUser = async () => {
      const token = getCookie('accessToken');
      if (token) {
        try {
          const response = await getUserApi();
          if (response.success) {
            dispatch(setUser(response.user));
          }
        } catch (error) {
          console.error('Ошибка загрузки данных пользователя:', error);
        }
      }
    };

    fetchUser();
  }, [dispatch]);

  const selectedIngredient = useSelector(
    (state) => state.ingredients.selectedIngredient
  );

  const selectedOrder = useSelector((state) => state.order.selectedOrder);

  const handleModalClose = () => {
    if (selectedIngredient) {
      dispatch(setSelectedIngredient(null));
    }

    if (selectedOrder) {
      dispatch(clearSelectedOrder());
    }

    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/stellar-burger' element={<ConstructorPage />} />
        <Route path='/stellar-burger/feed' element={<Feed />} />
        <Route
          path='/stellar-burger/login'
          element={
            <PublicRoute path='/stellar-burger/login' element={<Login />} />
          }
        />
        <Route
          path='/stellar-burger/register'
          element={
            <PublicRoute
              path='/stellar-burger/register'
              element={<Register />}
            />
          }
        />
        <Route
          path='/stellar-burger/forgot-password'
          element={
            <PublicRoute
              path='/stellar-burger/forgot-password'
              element={<ForgotPassword />}
            />
          }
        />
        <Route
          path='/stellar-burger/reset-password'
          element={
            <PublicRoute
              path='/stellar-burger/reset-password'
              element={<ResetPassword />}
            />
          }
        />
        <Route
          path='/stellar-burger/profile'
          element={
            <ProtectedRoute
              path='/stellar-burger/profile'
              element={<Profile />}
            />
          }
        />
        <Route
          path='/stellar-burger/profile/orders'
          element={<ProfileOrders />}
        />
        <Route
          path='/stellar-burger/feed/:number'
          element={
            <Modal title='Order Info' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/stellar-burger/ingredients/:id'
          element={
            <Modal title='Ingredients Details' onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/stellar-burger/profile/orders/:number'
          element={
            <ProtectedRoute
              path='/stellar-burger/profile/orders/:number'
              element={
                <Modal title='Order Info' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
