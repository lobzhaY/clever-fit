export const PeriodicitySelectorData = [
  { item: 'Через 1 день', period: 1 },
  { item: 'Через 2 дня', period: 2 },
  { item: 'Через 3 дня', period: 3 },
  { item: 'Через 4 дня', period: 4 },
  { item: 'Через 5 дней', period: 5 },
  { item: 'Через 6 дней', period: 6 },
  { item: '1 раз в неделю', period: 7 },
];

export const DayOfWeekSelectorData = [
  { value: '1', label: 'Понедельник' },
  { value: '2', label: 'Вторник' },
  { value: '3', label: 'Среда' },
  { value: '4', label: 'Четверг' },
  { value: '5', label: 'Пятница' },
  { value: '6', label: 'Суббота' },
  { value: '7', label: 'Воскресенье' },
];

export const getItemByPeriod = (period: number | null | undefined): string => {
  const foundItem = PeriodicitySelectorData.find((data) => data.period === period);

  return foundItem ? foundItem.item : '';
};
