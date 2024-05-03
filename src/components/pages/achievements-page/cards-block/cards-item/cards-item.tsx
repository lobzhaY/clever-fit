import { useEffect, useState } from 'react';
import { PeriodRange, cardsIndex, daysNums } from '../../../../../constants';
import styles from './cards-item.module.scss';
import { FormattedDataType } from '../../types/achievements-types';

type CardsItemType = {
  data: FormattedDataType;
  period: PeriodRange;
};

export const CardsItemComponent: React.FC<CardsItemType> = ({ data, period }) => {
  const { title, value, key } = data;
  const [dayVal, setDayVal] = useState(0);

  useEffect(() => {
    if (key === cardsIndex.totalDay) {
      const days = daysNums[period];
      const daysVal = +(value / days).toFixed(1);
      setDayVal(daysVal);
    }
  }, [data, period, value, key]);

  return (
    <div className={styles.cardItemWrapper}>
      <p>{key === cardsIndex.totalDay ? dayVal : value}</p>
      <span>{title}</span>
    </div>
  );
};
