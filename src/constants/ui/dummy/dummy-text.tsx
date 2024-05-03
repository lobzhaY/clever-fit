import { PeriodRange } from '../../pages';

export enum dummyType {
  Achievements = 'achievements',
  Marathons = 'marathons',
}

export const dummyTextFuture = 'Данный раздел ещё в разработке';

export const dummyAchievements = {
  [PeriodRange.Week]: 'Ой, такой тренировки на этой неделе не было.',
  [PeriodRange.Month]: 'Ой, такой тренировки в этом месяце не было.',
};
