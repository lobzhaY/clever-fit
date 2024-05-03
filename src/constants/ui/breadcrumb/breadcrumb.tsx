import { ROUTE_PATHS } from '../../route-paths/paths';

type BreadcrumbItemsType = {
  path: string;
  title: string;
  children?: BreadcrumbItemType[];
};

type BreadcrumbItemType = {
  path: string;
  title: string;
};

export enum BreadcrumbTitleText {
  Main = 'Главная',
  Feedbacks = 'Отзывы пользователей',
  Calendar = 'Календарь',
  Profile = 'Профиль',
  Settings = 'Настройки',
  Workouts = 'Тренировки',
  Achievements = 'Достижения',
}

export const breadcrumbItems: BreadcrumbItemsType[] = [
  {
    path: ROUTE_PATHS.main,
    title: BreadcrumbTitleText.Main,
    children: [
      {
        path: ROUTE_PATHS.feedBacks,
        title: BreadcrumbTitleText.Feedbacks,
      },
      {
        path: ROUTE_PATHS.calendar,
        title: BreadcrumbTitleText.Calendar,
      },
      {
        path: ROUTE_PATHS.profile,
        title: BreadcrumbTitleText.Profile,
      },
      {
        path: ROUTE_PATHS.settings,
        title: BreadcrumbTitleText.Settings,
      },
      {
        path: ROUTE_PATHS.workouts,
        title: BreadcrumbTitleText.Workouts,
      },
      {
        path: ROUTE_PATHS.achievements,
        title: BreadcrumbTitleText.Achievements,
      },
    ],
  },
];
