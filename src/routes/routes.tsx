import { Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout, ResultAuthLayout } from '../layout/index.ts';

import {
  AuthPage,
  ChangePassword,
  ConfirmEmail,
  ErrorChangePassword,
  ErrorCheckEmail,
  ErrorCheckEmailNoExist,
  ErrorLogin,
  ErrorResult,
  ErrorUserExist,
  SuccessChangePassword,
  SuccessResult,
} from '../pages/index.ts';
import FeedbacksPageComponent from '../pages/feedbacks-page/feedback-page-component.tsx';
import MainPageComponent from '../pages/main-page/main-page-component.tsx';
import CalendarPageComponent from '../pages/calendar/calendar-page-component.tsx';
import ProfilePageComponent from '../pages/profile-page/profile-page-component.tsx';
import SettingsPageComponent from '../pages/settings-page/settings-page-component.tsx';
import WorkoutsPageComponent from '../pages/workouts/workouts-page-component.tsx';
import NotFoundPage from '../pages/not-found-page/not-found-page.tsx';
import AchievementsPageComponent from '../pages/achievements-page/achievements-page-component.tsx';

import { DirectAccess, LimitAccessRoute, PrivateRoute } from './private-routes/index.ts';

import { LoaderComponent, LoginComponent, RegistrationComponent } from '../components/index.ts';

import { ROUTE_PATHS } from '../constants/index.ts';

export const routes = (
  <Suspense fallback={<LoaderComponent />}>
    <Routes>
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
        <Route index={true} path={ROUTE_PATHS.main} element={<MainPageComponent />} />
        <Route path="/" element={<Navigate to={ROUTE_PATHS.main} />} />
        <Route path={ROUTE_PATHS.feedBacks} element={<FeedbacksPageComponent />} />
        <Route path={ROUTE_PATHS.calendar} element={<CalendarPageComponent />} />
        <Route path={ROUTE_PATHS.profile} element={<ProfilePageComponent />} />
        <Route path={ROUTE_PATHS.settings} element={<SettingsPageComponent />} />
        <Route path={ROUTE_PATHS.workouts} element={<WorkoutsPageComponent />} />
        <Route path={ROUTE_PATHS.achievements} element={<AchievementsPageComponent />} />
      </Route>

      <Route
        path={ROUTE_PATHS.routes.result}
        element={
          <LimitAccessRoute>
            <DirectAccess>
              <ResultAuthLayout />
            </DirectAccess>
          </LimitAccessRoute>
        }>
        <Route path={ROUTE_PATHS.resultOutlet.errorLogin} element={<ErrorLogin />} />
        <Route path={ROUTE_PATHS.resultOutlet.success} element={<SuccessResult />} />
        <Route path={ROUTE_PATHS.resultOutlet.errorUserExist} element={<ErrorUserExist />} />
        <Route path={ROUTE_PATHS.resultOutlet.error} element={<ErrorResult />} />
        <Route
          path={ROUTE_PATHS.resultOutlet.errorCheckEmailNoExist}
          element={<ErrorCheckEmailNoExist />}
        />
        <Route path={ROUTE_PATHS.resultOutlet.errorCheckEmail} element={<ErrorCheckEmail />} />
        <Route
          path={ROUTE_PATHS.resultOutlet.errorChangePassword}
          element={<ErrorChangePassword />}
        />
        <Route
          path={ROUTE_PATHS.resultOutlet.successChangePassword}
          element={<SuccessChangePassword />}
        />
      </Route>

      <Route
        path={ROUTE_PATHS.routes.auth}
        element={
          <LimitAccessRoute>
            <ResultAuthLayout />
          </LimitAccessRoute>
        }>
        <Route path="/auth" element={<AuthPage />}>
          <Route index element={<LoginComponent />} />
          <Route path="registration" element={<RegistrationComponent />} />
        </Route>
        <Route path={ROUTE_PATHS.authOutlet.confirmEmail} element={<ConfirmEmail />} />
        <Route path={ROUTE_PATHS.authOutlet.changePassword} element={<ChangePassword />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
