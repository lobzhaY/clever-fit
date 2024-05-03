import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

import { ROUTE_PATHS } from '../../constants';

export const LimitAccessRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthRedux = useAppSelector((state) => state.auth.userToken);
  const isAuth = isAuthRedux || localStorage.getItem('token');

  return !isAuth ? children : <Navigate to={ROUTE_PATHS.main} replace />;
};
