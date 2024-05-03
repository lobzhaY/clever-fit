import { useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  useGetCurrentUserQuery,
  useGetInviteQuery,
  addMyInvite,
  addUserData,
  history,
} from '../../redux';

import { ROUTE_PATHS } from '../../constants';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { data: currentUserInfo } = useGetCurrentUserQuery();
  const { data: myInvite } = useGetInviteQuery();

  const isAuthRedux = useAppSelector((state) => state.auth.userToken);
  const isAuth = isAuthRedux || localStorage.getItem('token');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');

    if (accessToken) {
      localStorage.setItem('token', accessToken);
      history.push(ROUTE_PATHS.main);
    }
  }, [location.search]);

  useEffect(() => {
    if (myInvite) {
      dispatch(addMyInvite({ myInvite }));
    }
  }, [dispatch, myInvite]);

  useEffect(() => {
    if (currentUserInfo) {
      dispatch(addUserData({ currentUser: currentUserInfo }));
    }
  }, [dispatch, currentUserInfo]);

  return isAuth ? children : <Navigate to={ROUTE_PATHS.routes.auth} replace />;
};
