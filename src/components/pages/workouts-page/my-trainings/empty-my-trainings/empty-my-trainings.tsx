import { Button } from 'antd';

import { useAppDispatch } from '../../../../../hooks';
import { openDrawer } from '../../../../../redux';

import { DrawerType, emptyMyTrainingsText } from '../../../../../constants';

import styles from './empty-my-trainings.module.scss';

type EmptyMyTrainingsType = {
  showButtonCreate: boolean;
};

export const EmptyMyTrainingsComponent: React.FC<EmptyMyTrainingsType> = ({ showButtonCreate }) => {
  const dispatch = useAppDispatch();

  const handleCreateTraining = () => {
    dispatch(
      openDrawer({
        typeDrawer: DrawerType.ModalCreate,
      })
    );
  };

  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.emptyContainer}>
        <h3>{emptyMyTrainingsText.title}</h3>
        <div className={styles.buttonContainer}>
          <Button disabled={showButtonCreate} type="primary" onClick={handleCreateTraining}>
            {emptyMyTrainingsText.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
