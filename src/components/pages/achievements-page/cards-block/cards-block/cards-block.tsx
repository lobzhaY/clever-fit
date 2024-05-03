import { useEffect, useState } from 'react';

import { CardsItemComponent } from '../cards-item/cards-item';

import { PeriodRange, cardsLabel, cardsIndex } from '../../../../../constants';

import { findSum, groupExercisesValues } from '../../utils/getLoad';

import { DataType, FormattedDataType } from '../../types/achievements-types';

import styles from './cards-block.module.scss';

type CardsBlockType = {
  data: DataType;
  period: PeriodRange;
};

export const CardsBlockComponent: React.FC<CardsBlockType> = ({ data, period }) => {
  const [cardsData, setCardsData] = useState<FormattedDataType[]>();

  const formatDataCards = (data: DataType): FormattedDataType[] => {
    return cardsLabel.map((elem) => {
      const val =
        elem.key === cardsIndex.totalDay
          ? groupExercisesValues(data, cardsIndex.totalLoad)
          : groupExercisesValues(data, elem.key);
      return {
        ...elem,
        value: findSum(val),
      };
    });
  };

  useEffect(() => {
    const dataCards = formatDataCards(data);
    setCardsData(dataCards);
  }, [data]);

  return (
    <div className={styles.cardsWrapper}>
      {cardsData &&
        cardsData.map((elem, index) => (
          <CardsItemComponent data={elem} period={period} key={index} />
        ))}
    </div>
  );
};
