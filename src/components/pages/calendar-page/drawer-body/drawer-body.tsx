import { useEffect, useState } from 'react';

import { Button, Form } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { addDataFromDrawer, checkErrorResponse, store } from '../../../../redux';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import { DrawerFormComponent } from '../drawer-form/drawer-form';

import {
  ExercisesType,
  PostPutExerciseType,
  DrawerType,
  GetUserJointList,
} from '../../../../constants';

import { DrawerActionsComponent } from './drawer-actions/drawer-actions';
import { DrawerFormWorkoutComponent } from './drawer-form-workouts/drawer-form-workouts';

import styles from './drawer-body.module.scss';

type DrawerBodyComponentType = {
  isOpenDrawer: boolean;
};

export const DrawerBodyComponent: React.FC<DrawerBodyComponentType> = ({ isOpenDrawer }) => {
  dayjs.extend(isSameOrBefore);

  const dispatch = useAppDispatch();

  const {
    allTrainings,
    userExercises,
    activeDate: selectedDate,
    activeTrainingId,
    userInviteId,
  } = useAppSelector((state) => state.userExercises);
  const { activeTraining, typeDrawer } = useAppSelector((state) => state.userExercises.drawer);

  const [form] = Form.useForm();

  const [deleteFormDisabled, setDeleteFormDisabled] = useState(true);
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const [saveDataButton, setSaveDataButton] = useState(true);

  const [prevFormsData, setPrevFormsData] = useState<ExercisesType[]>();

  const getTrainingsById = () => {
    const activeTraining = allTrainings.filter(
      (elem: PostPutExerciseType) => elem._id === activeTrainingId
    )[0];
    return (activeTraining as PostPutExerciseType)
      ? (activeTraining as PostPutExerciseType).exercises
      : [{ name: '', replays: 1, weight: 0, approaches: 1, isImplementation: false }];
  };

  const [formsData, setFormsData] = useState<ExercisesType[]>(getTrainingsById());

  useEffect(() => {
    const typeExercises = form.getFieldValue('selectType');
    const dateExercises = form.getFieldValue('date');

    const nameValue = formsData.filter((elem) => elem.name.length > 0);

    if (typeExercises && dateExercises && nameValue.length > 0) {
      setSaveDataButton(() => false);
    }
  }, [form, formsData, isOpenDrawer]);

  useEffect(() => {
    if (typeDrawer === DrawerType.ModalCreate) {
      setSaveDataButton(() => true);
    }
  }, [typeDrawer, isOpenDrawer]);

  useEffect(() => {
    if (typeDrawer === DrawerType.InviteCreate) {
      form.setFieldValue('selectType', (userInviteId as GetUserJointList).trainingType);
    }
    if (typeDrawer === DrawerType.ModalUpdate && isOpenDrawer) {
      const activeTraining = userExercises.filter(
        (elem: PostPutExerciseType) => elem._id === activeTrainingId
      )[0];
      setFormsData(() => activeTraining.exercises);
    }
  }, [typeDrawer, userExercises, activeTrainingId, isOpenDrawer, form, userInviteId]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setIsErrorResponse(() => store.getState().userExercises.drawer.isErrorResponse)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isErrorResponse) {
      const prevExercises = userExercises.filter(
        (elem: PostPutExerciseType) => elem._id === activeTrainingId
      )[0];

      setFormsData(() => (prevExercises ? (prevExercises as PostPutExerciseType).exercises : []));
      dispatch(checkErrorResponse(false));
    } else {
      setPrevFormsData(formsData);
    }
  }, [isErrorResponse, formsData, prevFormsData, activeTrainingId, dispatch, userExercises]);

  useEffect(() => {
    if (typeDrawer === DrawerType.UpdateFuture) {
      setFormsData(() => {
        return (allTrainings as unknown as PostPutExerciseType[])[0].exercises;
      });
    }
  }, [typeDrawer, allTrainings]);

  useEffect(() => {
    if (!isOpenDrawer) {
      const formsWithData = formsData?.filter((form) => form.name.trim() !== '');
      if (formsWithData.length > 0) {
        dispatch(
          addDataFromDrawer({
            trainingName: activeTraining.content,
            trainingDate: (selectedDate as unknown as dayjs.Dayjs)?.toISOString(),
            training: formsData,
            trainingId: activeTrainingId,
            updateKey: DrawerType.UpdateFuture,
          })
        );
      }

      if (typeDrawer !== DrawerType.UpdateFuture) {
        setFormsData([{ name: '', replays: 1, weight: 0, approaches: 1, isImplementation: false }]);
      }

      if (typeDrawer === DrawerType.ModalCreate || typeDrawer === DrawerType.ModalUpdate) {
        form.resetFields();
      }
    }
  }, [
    isOpenDrawer,
    dispatch,
    activeTraining,
    formsData,
    selectedDate,
    typeDrawer,
    activeTrainingId,
    form,
  ]);

  const addForm = () => {
    setFormsData([
      ...formsData,
      { name: '', replays: 1, weight: 0, approaches: 1, isImplementation: false },
    ]);
  };

  const handleFormChange = (index: number, value: ExercisesType) => {
    const updatedFormsData = [...formsData];
    updatedFormsData[index] = value;
    setFormsData(updatedFormsData);

    if (value.isImplementation) {
      setDeleteFormDisabled(false);
    }
  };

  const handleDeleteForm = () => {
    setFormsData((prev) => {
      const filterArr = prev.filter((elem) => !elem.isImplementation);
      return filterArr;
    });

    setDeleteFormDisabled(true);
  };

  return (
    <div className={styles.drawerBodyWrapper}>
      <div>
        <div className="drawer-form-content">
          {(typeDrawer === DrawerType.ModalCreate ||
            typeDrawer === DrawerType.ModalUpdate ||
            typeDrawer === DrawerType.InviteCreate) && (
            <DrawerFormWorkoutComponent form={form} isOpenDrawer={isOpenDrawer} />
          )}
          {formsData.map((elem, index) => (
            <DrawerFormComponent
              key={index}
              index={index}
              formData={elem}
              onChange={handleFormChange}
              isOpenDrawer={isOpenDrawer}
            />
          ))}
        </div>
        <div className="drawer-body-action">
          <Button onClick={addForm} type="text" className="action-add">
            <PlusOutlined /> Добавить ещё {typeDrawer === DrawerType.ModalCreate && 'упражнение'}
          </Button>
          {(typeDrawer === DrawerType.UpdateFuture || typeDrawer === DrawerType.ModalUpdate) && (
            <Button
              disabled={deleteFormDisabled}
              onClick={handleDeleteForm}
              className="action-remove"
              type="text">
              <MinusOutlined />
              Удалить
            </Button>
          )}
        </div>
      </div>
      {(typeDrawer === DrawerType.ModalCreate ||
        typeDrawer === DrawerType.ModalUpdate ||
        typeDrawer === DrawerType.InviteCreate) && (
        <DrawerActionsComponent saveDataButton={saveDataButton} form={form} formsData={formsData} />
      )}
    </div>
  );
};
