export const settingsPageTitle = 'Мой тариф';

export enum TariffsText {
  Free = 'FREE',
  Pro = 'PRO',
  Tariff = 'tariff',
}

export const tariffsCards = {
  detailsBtn: 'Подробнее',
  active: 'активен',
  setActiveBtn: 'Активировать',
};

export const tariffsSettings = {
  darkTheme: 'Тёмная тема',
  notifications: 'Уведомления',
  jointTraining: 'Открыт для совместных тренировок',
};

export const settingsButtons = {
  writeReview: 'Написать отзыв',
  lookReview: 'Смотреть все отзывы',
};

export const settingsPrompt = {
  jointTraining: 'включеная функция позволит участвовать в совместных тренировках',
  notifications: 'включеная функция позволит получать уведомления об активностях',
  darkTheme: 'темная тема доступна для PRO tariff',
  darkThemePro: 'включенная функция позволит использовать темную тему',
};

export const drawerText = 'Сравнить тарифы';

export const drawerTitleCoast = 'Стоимость тарифа';

export const drawerBtn = 'Выбрать и оплатить';

export type comparisonTariffsTextType = {
  [key: string]: {
    title: string;
    [TariffsText.Free]: boolean;
    [TariffsText.Pro]: boolean;
  };
};

export const comparisonTariffsText: comparisonTariffsTextType = {
  statisticMonth: {
    title: 'Статистика за месяц',
    [TariffsText.Free]: true,
    [TariffsText.Pro]: true,
  },
  statisticAll: {
    title: 'Статистика за всё время',
    [TariffsText.Free]: false,
    [TariffsText.Pro]: true,
  },
  jointTraining: {
    title: 'Совместные тренировки',
    [TariffsText.Free]: true,
    [TariffsText.Pro]: true,
  },
  participationMarathons: {
    title: 'Участие в марафонах',
    [TariffsText.Free]: false,
    [TariffsText.Pro]: true,
  },
  appiOs: {
    title: 'Приложение iOS',
    [TariffsText.Free]: false,
    [TariffsText.Pro]: true,
  },
  appAndroid: {
    title: 'Приложение Android',
    [TariffsText.Free]: false,
    [TariffsText.Pro]: true,
  },
  personalGpt: {
    title: 'Индивидуальный Chat GPT',
    [TariffsText.Free]: false,
    [TariffsText.Pro]: true,
  },
};
