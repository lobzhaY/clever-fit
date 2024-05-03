import { pathPrefixType, routePathsType } from './paths-types';

export const pathPrefix: pathPrefixType = {
  result: '/result',
  auth: '/auth',
};

export const ROUTE_PATHS: routePathsType = {
  main: '/main',
  routes: {
    result: '/result',
    auth: '/auth',
  },
  resultOutlet: {
    errorLogin: `${pathPrefix.result}/error-login`,
    success: `${pathPrefix.result}/success`,
    errorUserExist: `${pathPrefix.result}/error-user-exist`,
    error: `${pathPrefix.result}/error`,
    errorCheckEmailNoExist: `${pathPrefix.result}/error-check-email-no-exist`,
    errorCheckEmail: `${pathPrefix.result}/error-check-email`,
    errorChangePassword: `${pathPrefix.result}/error-change-password`,
    successChangePassword: `${pathPrefix.result}/success-change-password`,
  },
  authOutlet: {
    registration: `${pathPrefix.auth}/registration`,
    confirmEmail: `${pathPrefix.auth}/confirm-email`,
    changePassword: `${pathPrefix.auth}/change-password`,
  },
  feedBacks: '/feedbacks',
  calendar: '/calendar',
  settings: '/settings',
  profile: '/profile',
  workouts: '/training',
  achievements: '/achievements',
};
