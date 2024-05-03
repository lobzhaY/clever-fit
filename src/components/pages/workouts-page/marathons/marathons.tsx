import { DummyComponent } from '../../..';

import { dummyType } from '../../../../constants/ui/dummy/dummy-text';

import styles from './marathons.module.scss';

export const MarathonsComponent: React.FC = () => {
  return (
    <div className={styles.marathonsContainer}>
      <DummyComponent type={dummyType.Marathons} />
    </div>
  );
};
