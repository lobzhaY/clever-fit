import { HeartFilled, CalendarTwoTone, ProfileOutlined } from '@ant-design/icons';
import { calendarTestId, profileTestId } from '../../data-test/data-test-id';

export const cardsActionsText: string[] = [
  'С CleverFit ты сможешь:',
  '— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;',
  '— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;',
  '— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;',
  '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.',
];
export const cardsLegacy =
  'CleverFit — это не просто приложение, а твой личный помощник в\n мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!';

export type ISmallCard = {
  main: string;
  footer: string;
};
export const smallCardType: ISmallCard = {
  main: 'main-page-card',
  footer: 'footer-small-card',
};

export type ICardsActionArr = {
  title: string;
  textButton: string;
  icon: React.ReactNode;
  type: string;
  testId: string;
};

export const cardsActionTitleBtn = {
  exercise: 'Тренировки',
  calendar: 'Календарь',
  profile: 'Профиль',
};

export const cardsActionsArr: ICardsActionArr[] = [
  {
    title: 'Расписать тренировки',
    textButton: cardsActionTitleBtn.exercise,
    icon: <HeartFilled className="button-action__icon-main" />,
    type: smallCardType.main,
    testId: 'menu-button-training',
  },
  {
    title: 'Назначить календарь',
    textButton: cardsActionTitleBtn.calendar,
    icon: <CalendarTwoTone className="button-action__icon-main" />,
    type: smallCardType.main,
    testId: calendarTestId.buttonCalendar,
  },
  {
    title: 'Заполнить профиль',
    textButton: cardsActionTitleBtn.profile,
    icon: <ProfileOutlined className="button-action__icon-main" />,
    type: smallCardType.main,
    testId: profileTestId.buttonProfile,
  },
];

export const headerTitle =
  'Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей мечты!';
