import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../../../hooks';

import {
  PeriodRange,
  StatisticListType,
  TrainingListTagsText,
  loadListTitle,
} from '../../../../constants';
import { CardsBlockComponent } from '../cards-block';
import { CommonExercisesStatisticComponent } from '../common-exercises-block';
import { LoadStatisticColumnComponent, LoadStatisticListComponent } from '../load-block';
import { MostOftenCardsComponent } from '../most-often-block';
import { TagMenuComponent } from '../tag-menu';
import { getLoad } from '../utils';
import { DummyComponent } from '../../../ui';
import { dummyType } from '../../../../constants/ui/dummy/dummy-text';

import styles from './achievements-wrapper.module.scss';

type AchievementsWrapperType = {
  period: PeriodRange;
};

export const AchievementsWrapperComponent: React.FC<AchievementsWrapperType> = ({ period }) => {
  const { userExercises } = useAppSelector((state) => state.userExercises);
  const [selectedTags, setSelectedTags] = useState<TrainingListTagsText>(TrainingListTagsText.All);

  const [data, setData] = useState({});
  const [hasTraining, setHasTraining] = useState(true);

  useEffect(() => {
    const newData = getLoad(period, userExercises, selectedTags);
    setData(newData);
  }, [period, selectedTags, userExercises]);

  useEffect(() => {
    const objValues = Object.values(data).flat();
    setHasTraining(!!objValues.length);
  }, [period, data]);

  return (
    <div className={styles.achievementsWrapper}>
      <TagMenuComponent selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      {hasTraining ? (
        <div className={styles.achievementsContainer}>
          <div>
            <section
              className={
                period === PeriodRange.Week ? styles.containerWeek : styles.containerMonth
              }>
              {period === PeriodRange.Month && (
                <h6 className={styles.loadTitle}>
                  {loadListTitle[PeriodRange.Month][StatisticListType.Load]}
                </h6>
              )}
              <LoadStatisticColumnComponent data={data} period={period} />
              <LoadStatisticListComponent
                data={data}
                period={period}
                type={StatisticListType.Load}
              />
            </section>
          </div>
          <CardsBlockComponent data={data} period={period} />
          <MostOftenCardsComponent data={data} selectedTags={selectedTags} />
          <section className={styles.containerWeek}>
            <CommonExercisesStatisticComponent data={data} />
            <LoadStatisticListComponent
              data={data}
              period={period}
              type={StatisticListType.Exercises}
            />
          </section>
        </div>
      ) : (
        <DummyComponent type={dummyType.Achievements} period={period} />
      )}
    </div>
  );
};
