import { FC } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

interface ProtectedRouteProps {
  element: React.ReactElement;
  path: string;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element,
  ...rest
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to='/login' replace />
  );
};
