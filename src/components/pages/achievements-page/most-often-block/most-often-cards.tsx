import { useEffect, useState } from 'react';

import {
  TrainingListTagsText,
  mostOftenCardsValue,
  MostOftenCardsRange,
  mostOftenCardsLabel,
} from '../../../../constants';

import { DataType, exercisesName } from '../types/achievements-types';

import styles from './most-often-cards.module.scss';
import { getArrOfValues, getCount, getMaxField } from '../utils/getLoad';

type MostOftenCardsType = {
  data: DataType;
  selectedTags: TrainingListTagsText;
};

export const MostOftenCardsComponent: React.FC<MostOftenCardsType> = ({ data, selectedTags }) => {
  const [cardsData, setCardsData] = useState<mostOftenCardsValue>();

  useEffect(() => {
    const dataCards: mostOftenCardsValue = {
      [MostOftenCardsRange.Training]: getAllNames(data, exercisesName.name),
      [MostOftenCardsRange.Exercise]: getAllNames(data, exercisesName.exercisesName),
    };
    setCardsData(dataCards);
  }, [data, selectedTags]);

  const getAllNames = (data: DataType, nameField: exercisesName): string => {
    const objVal = Object.values(data);
    const values = getArrOfValues(objVal, nameField);
    const elementCount = getCount(values);
    return getMaxField(elementCount).key;
  };

  return (
    <div className={styles.oftenCardsWrapper}>
      {selectedTags === TrainingListTagsText.All && (
        <div>
          <span>{mostOftenCardsLabel[MostOftenCardsRange.Training]}</span>
          <h6>{cardsData && cardsData[MostOftenCardsRange.Training].toLowerCase()}</h6>
        </div>
      )}
      <div>
        <span>{mostOftenCardsLabel[MostOftenCardsRange.Exercise]}</span>
        <h6>{cardsData && cardsData[MostOftenCardsRange.Exercise].toLocaleLowerCase()}</h6>
      </div>
    </div>
  );
};
