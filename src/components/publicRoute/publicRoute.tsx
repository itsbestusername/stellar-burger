import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

interface PublicRouteProps {
  element: React.ReactElement;
  path: string;
}

export const PublicRoute: FC<PublicRouteProps> = ({ element }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const location = useLocation();

  return !isLoggedIn ? (
    element
  ) : (
    <Navigate to='/stellar-burger' state={{ from: location }} replace />
  );
};
