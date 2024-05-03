import { useEffect, useState } from 'react';

import { Button, Select } from 'antd';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';

import { useAppSelector } from '../../../../hooks';

import {
  TrainingListText,
  TrainingListItemType,
  PostPutExerciseType,
  calendarTestId,
} from '../../../../constants';

import styles from './popover-title.module.scss';

type PopoverTitleComponentType = {
  title: string;
  closePopover: (isOpen: boolean) => void;
  hasSubTitle: boolean;
  createTrainingBtn: boolean;
  changeCreateTraining: (isCreate: boolean) => void;
  changeActiveSelect: (activeSelect: TrainingListText) => void;
  addTraining: boolean;
  activeSelect: TrainingListText | undefined;
  isFuture: boolean;
};
export const PopoverTitleComponent: React.FC<PopoverTitleComponentType> = ({
  title,
  closePopover,
  hasSubTitle,
  createTrainingBtn,
  changeCreateTraining,
  changeActiveSelect,
  addTraining,
  activeSelect,
  isFuture,
}) => {
  const { trainingList, userExercises } = useAppSelector((state) => state.userExercises);

  const [selectTrainingList, setSelectTrainingList] = useState<TrainingListItemType[]>();

  useEffect(() => {
    const activeExercises = userExercises.filter((elem: PostPutExerciseType) => {
      return dayjs(elem.date).format('DD.MM.YYYY') == title;
    });

    if (isFuture) {
      const newSelect = trainingList.filter((elem: TrainingListItemType) => {
        return !activeExercises.some((item: PostPutExerciseType) => elem.name === item.name);
      });

      setSelectTrainingList(newSelect);
    } else {
      const newSelect = activeExercises.filter((elem: PostPutExerciseType) => {
        return !elem.isImplementation;
      });

      setSelectTrainingList(newSelect);
    }
  }, [userExercises, isFuture, title, trainingList]);

  const handleClosePopover = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    closePopover(false);
  };

  const handleChange = (value: TrainingListText) => {
    changeActiveSelect(value);
  };

  return (
    <div className={styles.popoverTitleContainer}>
      {createTrainingBtn ? (
        <div className="popover-title-select">
          <ArrowLeftOutlined
            data-test-id={calendarTestId.modalActionCreate.buttonClose}
            onClick={() => changeCreateTraining(false)}
          />
          <Select
            data-test-id={calendarTestId.modalActionCreate.select}
            defaultValue={addTraining ? TrainingListText.Null : activeSelect}
            onChange={handleChange}
            options={selectTrainingList?.map((elem) => ({
              value: elem.name,
              label: elem.name,
            }))}
          />
        </div>
      ) : (
        <>
          <div className="popover-title-active">
            <h6>Тренировки на {title}</h6>
            {hasSubTitle || <p>Нет активный тренировок</p>}
          </div>
          <Button onClick={handleClosePopover}>
            <CloseOutlined data-test-id={calendarTestId.modalActionTraining.buttonClose} />
          </Button>
        </>
      )}
    </div>
  );
};
