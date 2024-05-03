import dayjs from 'dayjs';

export const getActiveTariffDate = (tariffExpired: string) => {
  const dateExpired = dayjs(tariffExpired);
  const dayExpired = dateExpired.date() < 10 ? `0${dateExpired.date()}` : dateExpired.date();
  const monthExpired =
    dateExpired.month() + 1 < 10 ? `0${dateExpired.month() + 1}` : dateExpired.month() + 1;
  return `${dayExpired}.${monthExpired}`;
};

export const transformCost = (cost: number) => {
  const newCost = `${cost}`.replace('.', ',');
  return `${newCost} $`;
};
