import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

interface ProtectedRouteProps {
  element: React.ReactElement;
  path: string;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    element
  ) : (
    <Navigate to='/stellar-burger/login' state={{ from: location }} replace />
  );
};
