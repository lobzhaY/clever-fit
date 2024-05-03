export const achievementsTabsLabel = {
  week: 'За неделю',
  month: 'За месяц',
  allTime: 'За всё время (PRO)',
};

export enum PeriodRange {
  Week = 'week',
  Month = 'month',
}

export enum StatisticListType {
  Exercises = 'exercises',
  Load = 'load',
}

export const loadListTitle = {
  [PeriodRange.Week]: {
    [StatisticListType.Load]: 'Средняя нагрузка \nпо дням недели',
    [StatisticListType.Exercises]: 'Самые частые  упражнения \nпо дням недели',
  },
  [PeriodRange.Month]: {
    [StatisticListType.Exercises]: 'Самые частые  упражнения \nпо дням недели за месяц',
    [StatisticListType.Load]: 'Средняя нагрузка \nпо дням недели',
  },
};

export const daysNums = {
  [PeriodRange.Week]: 7,
  [PeriodRange.Month]: 28,
};

export const daysDiffNums = {
  [PeriodRange.Week]: 6,
  [PeriodRange.Month]: 27,
};

export enum TrainingListTagsText {
  Legs = 'Ноги',
  Hands = 'Руки',
  Strength = 'Силовая',
  Back = 'Спина',
  Chest = 'Грудь',
  All = 'Все',
}

export enum cardsIndex {
  totalLoad = 'totalLoad',
  totalDay = 'totalDay',
  approach = 'approach',
  replays = 'replays',
}

export const cardsLabel = [
  { title: 'Общая нагрузка, кг', key: cardsIndex.totalLoad },
  { title: 'Нагрузка в день, кг', key: cardsIndex.totalDay },
  { title: 'Количество \n повторений, раз', key: cardsIndex.approach },
  { title: 'Подходы, раз', key: cardsIndex.replays },
];

export enum MostOftenCardsRange {
  Training = 'training',
  Exercise = 'exercise',
}

export const mostOftenCardsLabel = {
  [MostOftenCardsRange.Training]: 'Самая частая \nтренировка',
  [MostOftenCardsRange.Exercise]: 'Самое частое \nупражнение',
};

export type mostOftenCardsValue = {
  [MostOftenCardsRange.Training]: string;
  [MostOftenCardsRange.Exercise]: string;
};

export enum BadgeColors {
  bgColor = 'bgColor',
  color = 'color',
  hasElem = 'hasElem',
  missingElem = 'missingElem',
}

export const colorsBadge = {
  [StatisticListType.Load]: {
    [BadgeColors.hasElem]: {
      [BadgeColors.bgColor]: '#2f54eb',
      [BadgeColors.color]: '#fff',
    },
    [BadgeColors.missingElem]: {
      [BadgeColors.bgColor]: '#f0f5ff',
      [BadgeColors.color]: '#2f54eb',
    },
  },
  [StatisticListType.Exercises]: {
    [BadgeColors.hasElem]: {
      [BadgeColors.bgColor]: '#ff4d4f',
      [BadgeColors.color]: '#fff',
    },
    [BadgeColors.missingElem]: {
      [BadgeColors.bgColor]: '#fff1f0',
      [BadgeColors.color]: '#ff4d4f',
    },
  },
};
