export type pathPrefixType = {
  result: string;
  auth: string;
};

export type routePathsType = {
  main: string;
  routes: pathPrefixType;
  resultOutlet: {
    errorLogin: string;
    success: string;
    errorUserExist: string;
    error: string;
    errorCheckEmailNoExist: string;
    errorCheckEmail: string;
    errorChangePassword: string;
    successChangePassword: string;
  };
  authOutlet: {
    registration: string;
    confirmEmail: string;
    changePassword: string;
  };
  feedBacks: string;
  calendar: string;
  settings: string;
  profile: string;
  workouts: string;
  achievements: string;
};
