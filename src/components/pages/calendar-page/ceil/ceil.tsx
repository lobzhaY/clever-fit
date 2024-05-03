import { useEffect, useState } from 'react';

import { Badge, Popover } from 'antd';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';

import { useAppSelector } from '../../../../hooks';

import { PopoverTitleComponent } from '../popover-title/popover-title';
import { PopoverBodyComponent } from '../popover-body/popover-body';

import {
  TrainingListText,
  PostPutExerciseType,
  popoverPositionText,
  getColorStatusBadge,
  TrainingListKeys,
} from '../../../../constants';

import { CeilComponentType } from './types/cell-type';

import './ceil.scss';

export const CeilComponent: React.FC<CeilComponentType> = ({
  isOpen,
  closeModal,
  listData,
  ceilDate,
  screenSize,
}) => {
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isoWeek);

  const { userExercises, activeDate: selectedDate } = useAppSelector(
    (state) => state.userExercises
  );

  const [isOpenCeil, setIsOpenCeil] = useState(false);
  const [createTraining, setCreateTraining] = useState(false);
  const [addTraining, setAddTraining] = useState(true);
  const [isFuture, setIsFuture] = useState(false);
  const [activeSelectTraining, setActiveSelectTraining] = useState<TrainingListText>();
  const [activeExercises, setActiveExercises] = useState<PostPutExerciseType[]>();
  const [popoverPosition, setPopoverPosition] = useState(popoverPositionText.Left);

  useEffect(() => {
    if ((dayjs(selectedDate) as unknown as dayjs.Dayjs)?.isSame(ceilDate)) {
      setIsFuture(dayjs().isSameOrBefore(selectedDate));
    }
  }, [selectedDate, ceilDate]);

  useEffect(() => {
    if ((dayjs(selectedDate) as unknown as dayjs.Dayjs)?.day() === 0) {
      setPopoverPosition(popoverPositionText.Right);
    } else {
      setPopoverPosition(popoverPositionText.Left);
    }
  }, [selectedDate]);

  useEffect(() => {
    setIsOpenCeil(
      (dayjs(selectedDate) as unknown as dayjs.Dayjs)?.format('DD-MM-YYYY') ===
        ceilDate.format('DD-MM-YYYY')
    );
  }, [selectedDate, ceilDate]);

  useEffect(() => {
    const active = listData.map((elem) => {
      const arr = userExercises.filter((item: PostPutExerciseType) => item._id === elem.trainingId);
      return arr.length === 1
        ? arr[0]
        : arr.filter((exercises: PostPutExerciseType) => exercises.name === elem.badge.content)[0];
    });

    setActiveExercises(() => active);
  }, [userExercises, listData]);

  return (
    <div className="cell-wrapper">
      {isOpen === isOpenCeil && (
        <Popover
          overlayStyle={{
            zIndex: 6,
            minHeight: addTraining ? '240px' : '200px',
            maxHeight: '349px',
          }}
          overlayInnerStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            position: 'relative',
            left: popoverPosition === popoverPositionText.Right ? '50px' : '0',
            top: !screenSize ? '30px' : '0',
          }}
          title={
            <PopoverTitleComponent
              title={ceilDate.format('DD.MM.YYYY')}
              closePopover={closeModal}
              hasSubTitle={!!listData.length}
              createTrainingBtn={createTraining}
              changeCreateTraining={setCreateTraining}
              activeSelect={activeSelectTraining}
              changeActiveSelect={setActiveSelectTraining}
              addTraining={addTraining}
              isFuture={isFuture}
            />
          }
          trigger="click"
          arrow={false}
          placement={!screenSize ? 'bottom' : popoverPosition}
          content={
            <PopoverBodyComponent
              listData={listData}
              createTrainingBtn={createTraining}
              changeCreateTraining={setCreateTraining}
              trainingListUser={activeExercises}
              activeSelect={activeSelectTraining}
              changeActiveSelect={setActiveSelectTraining}
              closeModal={closeModal}
              isFuture={isFuture}
              addTraining={addTraining}
              changeAddTraining={setAddTraining}
            />
          }
          open={isOpen && isOpenCeil}></Popover>
      )}
      <div className="cell">
        <ul className="events">
          {screenSize &&
            activeExercises?.map((elem) => (
              <li key={elem._id}>
                <Badge
                  color={getColorStatusBadge(elem.name as TrainingListKeys).color}
                  text={getColorStatusBadge(elem.name as TrainingListKeys).content}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
