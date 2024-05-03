import { useEffect, useState } from 'react';

import { Grid } from 'antd';
import { Column } from '@ant-design/charts';

import dayjs from 'dayjs';

import { getMonthConfig, getWeekConfig } from './config';

import { PeriodRange } from '../../../../../constants';

import { DataType, DateItemType } from '../../types/achievements-types';

import styles from './load-statistic.module.scss';
import { getSum } from '../../utils';

type LoadStatisticColumnType = {
  data: DataType;
  period: PeriodRange;
};

export const LoadStatisticColumnComponent: React.FC<LoadStatisticColumnType> = ({
  data,
  period,
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [loadData, setLoadData] = useState<DateItemType[]>();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const formatData = (data: DataType): DateItemType[] => {
    const arrKeys = Object.keys(data);
    return arrKeys.map((elem) => {
      const load = getSum(data[elem], 'load');
      return {
        date: dayjs(elem).format('DD.MM'),
        load: load,
      };
    });
  };

  useEffect(() => {
    const dataArr = formatData(data);
    setLoadData(dataArr);
  }, [data]);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    if (!screens.xs && !screens.lg && screens.sm && screens.md) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }
  }, [screens]);

  return (
    loadData?.length && (
      <div
        className={
          period === PeriodRange.Week ? styles.statisticWrapper : styles.statisticMonthWrapper
        }>
        <Column
          {...(period === PeriodRange.Week
            ? getWeekConfig(isMobile, isTablet, loadData)
            : getMonthConfig(isMobile, isTablet, loadData))}
        />
      </div>
    )
  );
};
