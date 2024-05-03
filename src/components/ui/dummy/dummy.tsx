import { Result } from 'antd';

import { PeriodRange, dummyTextFuture } from '../../../constants';

import styles from './dummy.module.scss';
import { dummyAchievements, dummyType } from '../../../constants/ui/dummy/dummy-text';

import notFound from '../../../assets/achievements/not-found.png';

type DummyType = {
  type: dummyType;
  period?: PeriodRange;
};

export const DummyComponent: React.FC<DummyType> = ({ type, period }) => {
  return (
    <div className={styles.dummyWrapper}>
      {type === dummyType.Marathons ? (
        <Result status="404" title={<h6 className={styles.dummyTitle}>{dummyTextFuture}</h6>} />
      ) : (
        <div className={styles.customDummy}>
          <div className={styles.dummyImg}>
            <img src={notFound} alt="Not Found Exercises" />
          </div>
          <h3>{period && dummyAchievements[period]}</h3>
        </div>
      )}
    </div>
  );
};
