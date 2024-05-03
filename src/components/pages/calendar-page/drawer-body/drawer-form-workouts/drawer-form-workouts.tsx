import { useEffect, useState } from 'react';

import { Checkbox, DatePicker, Form, FormInstance, Select } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons';

import dayjs, { Dayjs } from 'dayjs';

import { useAppSelector } from '../../../../../hooks';

import { DrawerType, TrainingListText, workoutsTestId } from '../../../../../constants';

import { dateFormat } from '../../../profile-page/profile-form/utils/profile-form-utils';
import {
  DayOfWeekSelectorData,
  PeriodicitySelectorData,
  dateRender,
  disabledDate,
} from '../../../workouts-page/utils';

import styles from './drawer-form-workouts.module.scss';

type FormDrawerType = {
  selectType: string;
  date: Dayjs;
  withPeriod: boolean;
  selectPeriod: number;
  selectDay: string;
};

type DrawerFormWorkoutType = {
  form: FormInstance<FormDrawerType>;
  isOpenDrawer: boolean;
};

export const DrawerFormWorkoutComponent: React.FC<DrawerFormWorkoutType> = ({
  form,
  isOpenDrawer,
}) => {
  const { typeDrawer } = useAppSelector((state) => state.userExercises.drawer);
  const { trainingList, allTrainings, userExercises, activeTrainingId } = useAppSelector(
    (state) => state.userExercises
  );

  const [withPeriod, setWithPeriod] = useState(false);
  const [startWith, setStartWith] = useState(false);

  useEffect(() => {
    const currentExercises = userExercises.filter((elem) => elem._id === activeTrainingId)[0];
    if (typeDrawer === DrawerType.ModalUpdate && isOpenDrawer) {
      form.setFieldsValue({
        selectType: currentExercises.name,
        date: dayjs(currentExercises.date),
      });

      if (currentExercises.parameters?.repeat) {
        form.setFieldValue('withPeriod', currentExercises.parameters.repeat);
        form.setFieldValue('selectPeriod', `${currentExercises.parameters.period}`);
        setWithPeriod(currentExercises.parameters.repeat);
        setStartWith(!!currentExercises.parameters.period);
      }
    }
  }, [typeDrawer, allTrainings, activeTrainingId, form, userExercises, isOpenDrawer]);

  const handleValueChange = (changedValues: FormDrawerType) => {
    if (changedValues.withPeriod) {
      setWithPeriod(true);
    }

    if (changedValues.selectPeriod) {
      setStartWith(true);
    }
  };

  return (
    <Form
      form={form}
      name={`form-create`}
      onValuesChange={handleValueChange}
      style={{ minHeight: '76px' }}>
      <Form.Item name="selectType">
        <Select
          className={styles.selectType}
          data-test-id="modal-create-exercise-select"
          defaultValue={
            typeDrawer === DrawerType.ModalCreate
              ? TrainingListText.Null
              : form.getFieldValue('selectType')
          }
          options={trainingList?.map((elem) => ({
            value: elem.name,
            label: elem.name,
          }))}
          size="middle"
        />
      </Form.Item>

      <div style={{ display: 'flex', gap: '16px' }}>
        <Form.Item name="date" style={{ width: '132px' }}>
          <DatePicker
            disabledDate={disabledDate}
            cellRender={(current) => dateRender(current, userExercises)}
            suffixIcon={<CalendarTwoTone />}
            format={dateFormat}
            size="small"
            style={{ width: '132px', height: '32px' }}
            data-test-id={workoutsTestId.drawer.datePicker}
          />
        </Form.Item>

        <Form.Item name="withPeriod" valuePropName="checked">
          <Checkbox data-test-id={workoutsTestId.drawer.checkbox}>
            <span>С периодичностью</span>
          </Checkbox>
        </Form.Item>
      </div>

      {withPeriod && (
        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
          <Form.Item name="selectPeriod">
            <Select
              data-test-id={workoutsTestId.drawer.select}
              style={{ width: '132px' }}
              defaultValue={PeriodicitySelectorData[0]}
              options={PeriodicitySelectorData.map((item) => ({
                value: item.period,
                label: <span className="date-title">{item.item}</span>,
              }))}
              size="middle"
            />
          </Form.Item>

          {startWith && (
            <Form.Item name="selectDay">
              <Select
                style={{ width: '162px' }}
                defaultValue="1"
                options={DayOfWeekSelectorData.map((item) => ({
                  value: item.value,
                  label: <span className="date-title">{item.label}</span>,
                }))}
                size="middle"
              />
            </Form.Item>
          )}
        </div>
      )}
    </Form>
  );
};
