import { useEffect, useState } from 'react';

import { Grid } from 'antd';

import { Pie } from '@ant-design/charts';

import { findPercent, getArrOfValues, getCount } from '../utils/getLoad';

import {
  DataType,
  ExercisesDataType,
  FormattedExercisesType,
  exercisesName,
} from '../types/achievements-types';

import styles from './common-exercises-block.module.scss';
import { getConfig } from './config';

type CommonExercisesStatisticType = {
  data: DataType;
};

export const CommonExercisesStatisticComponent: React.FC<CommonExercisesStatisticType> = ({
  data,
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [dataExercises, setDataExercises] = useState<FormattedExercisesType[]>();

  const [isMobile, setIsMobile] = useState(false);

  const formatData = (data: DataType): ExercisesDataType => {
    const objVal = Object.values(data);
    const values = getArrOfValues(objVal, exercisesName.exercisesName);
    return getCount(values);
  };

  const structuredData = (data: ExercisesDataType): FormattedExercisesType[] => {
    const objKeys = Object.keys(data);
    const allExercises = objKeys.reduce((acc, curr: string) => (acc += data[curr]), 0);
    return objKeys.reduce((acc: FormattedExercisesType[], cur) => {
      const formatData: FormattedExercisesType = {
        type: cur,
        value: findPercent(allExercises, data[cur]),
      };
      acc.push(formatData);
      return acc;
    }, []);
  };

  useEffect(() => {
    const dataArr = formatData(data);
    const formattedData = structuredData(dataArr);
    setDataExercises(formattedData);
  }, [data]);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  return (
    dataExercises?.length && (
      <div className={styles.commonBlock}>
        <Pie {...getConfig(dataExercises, isMobile)} />
      </div>
    )
  );
};
