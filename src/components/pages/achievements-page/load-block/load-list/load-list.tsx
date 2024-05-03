import { useCallback, useEffect, useState } from 'react';

import { Collapse, Grid } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/ru';
dayjs.locale('ru');

import { LoadStatisticItemComponent } from '../load-item/load-item';

import { PeriodRange, StatisticListType, loadListTitle } from '../../../../../constants';

import {
  DataItemType,
  DataType,
  WeekDayDataType,
  exercisesName,
} from '../../types/achievements-types';

import styles from './load-list.module.scss';
import { getSum } from '../../utils';
import {
  formatMonthDate,
  formattedMonthValuesByDate,
  formattedMonthValuesExercises,
  getCount,
  getMaxField,
} from '../../utils/getLoad';

type LoadStatisticListType = {
  data: DataType;
  period: PeriodRange;
  type: StatisticListType;
};

export const LoadStatisticListComponent: React.FC<LoadStatisticListType> = ({
  data,
  period,
  type,
}) => {
  dayjs.extend(isoWeek);

  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const [loadData, setLoadData] = useState<WeekDayDataType[]>();
  const [monthData, setMonthData] = useState<WeekDayDataType[][]>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  const formatData = useCallback((data: DataType): WeekDayDataType[] => {
    const arrKeys = Object.keys(data);
    return arrKeys.map((elem) => {
      const dateStr = dayjs(elem).format('dddd');
      const load = getSum(data[elem], 'load');
      return {
        date: elem,
        dayOfWeek: dateStr.charAt(0).toUpperCase() + dateStr.slice(1),
        load: load,
        numDayOfWeek: dayjs(elem).isoWeekday(),
        trainingName: getAllNames(data[elem], exercisesName.exercisesName),
      };
    });
  }, []);

  useEffect(() => {
    const dataArr = formatData(data);
    if (period === PeriodRange.Month) {
      const monthData = formatMonthDate(dataArr);
      setMonthData(monthData);
    }

    dataArr.sort((a, b) => a.numDayOfWeek - b.numDayOfWeek);

    if (type === StatisticListType.Exercises && period === PeriodRange.Month) {
      const groupedByDayOfWeek = formattedMonthValuesByDate(dataArr);
      const objKeys = Object.keys(groupedByDayOfWeek);
      const formattedValues = formattedMonthValuesExercises(objKeys, groupedByDayOfWeek);

      setLoadData(formattedValues);
    } else {
      setLoadData(dataArr);
    }
  }, [data, period, formatData, type]);

  const getAllNames = (data: DataItemType[], nameField: exercisesName): string => {
    const values = data
      .map((elem) => {
        return elem[nameField];
      })
      .flat();

    const elementCount = getCount(values);
    return getMaxField(elementCount).key;
  };

  return (
    <div className={styles.loadListWrapper}>
      {period === PeriodRange.Month && type === StatisticListType.Load ? null : (
        <h6 className={styles.loadListTitle}>{loadListTitle[period][type]}</h6>
      )}
      {period === PeriodRange.Week || type === StatisticListType.Exercises ? (
        <div className={styles.loadListContainer}>
          {loadData?.map((elem, index) => {
            return <LoadStatisticItemComponent elem={elem} index={index} type={type} key={index} />;
          })}
        </div>
      ) : (
        <>
          {isMobile ? (
            <div>
              <Collapse
                accordion
                bordered={false}
                expandIconPosition="end"
                ghost={true}
                size="small"
                expandIcon={({ isActive }) => (
                  <DownOutlined rotate={isActive ? 180 : 0} className={styles.collapsedIcon} />
                )}
                items={monthData?.map((elem, index) => ({
                  label: (
                    <p className={styles.collapsedTitle}>
                      Неделя {dayjs(elem[index].date).startOf('isoWeek').format('DD.MM')}-
                      {dayjs(elem[index].date).endOf('isoWeek').format('DD.MM')}
                    </p>
                  ),
                  key: index,
                  children: elem.map((item, indexItem) => {
                    return (
                      <LoadStatisticItemComponent
                        elem={item}
                        index={indexItem}
                        type={type}
                        key={indexItem}
                      />
                    );
                  }),
                }))}
              />
            </div>
          ) : (
            <div className={styles.listMonthWrapper}>
              {monthData?.map((elem, index) => {
                return (
                  <div className={styles.listMonthItemWrapper} key={index}>
                    <h6 className={styles.listMonthItemTitle}>
                      Неделя {dayjs(elem[index].date).startOf('isoWeek').format('DD.MM')} -{' '}
                      {dayjs(elem[index].date).endOf('isoWeek').format('DD.MM')}
                    </h6>
                    <div className={styles.loadListContainer}>
                      {elem.map((item, index) => {
                        return (
                          <LoadStatisticItemComponent
                            elem={item}
                            index={index}
                            type={type}
                            key={index}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
