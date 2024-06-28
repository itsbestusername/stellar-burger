import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutApi } from '@api';
import { useDispatch } from '../../services/store';
import { logout } from '../../slices/authSlice';
import { clearUser } from '../../slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
