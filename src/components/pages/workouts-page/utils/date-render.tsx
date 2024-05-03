import dayjs, { Dayjs } from 'dayjs';

import { PostPutExerciseType } from '../../../../constants';

export const disabledDate = (current: Dayjs) => {
  return current && current.isSameOrBefore(dayjs());
};

export const dateRender = (
  current: string | number | Dayjs,
  userExercises: PostPutExerciseType[]
) => {
  const isTrainingDay = userExercises.filter((elem) =>
    (current as Dayjs).isSame(dayjs(elem.date), 'day')
  )[0];

  if (isTrainingDay) {
    return (
      <div
        className="ant-picker-cell-inner"
        style={{ backgroundColor: '#f0f5ff', borderRadius: '2px', position: 'relative' }}>
        {(current as Dayjs).date()}
        <div className="training-marker" />
      </div>
    );
  }
  return (current as Dayjs).date();
};
