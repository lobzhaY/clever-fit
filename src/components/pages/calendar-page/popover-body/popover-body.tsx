import { useEffect, useState } from 'react';

import { Badge, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import Lottie from 'react-lottie';
import animationData from '../../../ui/loader/loader.json';

import {
  addActiveTrainingId,
  addDataFromDrawer,
  checkErrorResponse,
  closeDrawer,
  openDrawer,
  removeDataFromDrawer,
  store,
  updateTypeDrawer,
  usePostExerciseMutation,
  usePutExerciseMutation,
} from '../../../../redux';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
  PostPutExerciseType,
  DrawerType,
  colorStatusBadge,
  TrainingListKeys,
  TrainingListText,
  calendarTestId,
  getDataTestIdWithIndex,
  getColorStatusBadge,
} from '../../../../constants';

import { ModalConfirmType, showDeleteConfirm } from './utils/popover-body-utils';

import { PopoverBodyComponentType } from './types/popover-body-type';

import emptyExerciseList from '../../../../assets/calendar/empty-exercises.svg';

import './popover-body.scss';

export const PopoverBodyComponent: React.FC<PopoverBodyComponentType> = ({
  listData,
  trainingListUser,
  activeSelect,
  createTrainingBtn,
  changeCreateTraining,
  closeModal,
  isFuture,
  changeActiveSelect,
  addTraining,
  changeAddTraining,
}) => {
  const dispatch = useAppDispatch();

  const {
    trainingList,
    userExercises,
    allTrainings,
    activeDate: selectDate,
    activeTrainingId,
  } = useAppSelector((state) => state.userExercises);
  const { typeDrawer } = useAppSelector((state) => state.userExercises.drawer);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const [isLoading, setIsLoading] = useState(false);

  const [postExercise] = usePostExerciseMutation();
  const [putExercise] = usePutExerciseMutation();

  const [activeExercises, setActiveExercises] = useState<PostPutExerciseType>();
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  let modalInstance: ModalConfirmType | null = null;

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setIsErrorResponse(() => store.getState().userExercises.drawer.isErrorResponse)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const activeCreateExercises = allTrainings.filter(
      (elem: PostPutExerciseType) =>
        elem.name === activeSelect && (selectDate as unknown as dayjs.Dayjs).isSame(elem.date)
    );

    const activeExercises1 = userExercises.filter(
      (elem: PostPutExerciseType) => elem._id === activeTrainingId
    );

    setActiveExercises(() => {
      if (isErrorResponse || typeDrawer === DrawerType.UpdateFuture) {
        return activeExercises1[0];
      }
      if (!isErrorResponse) {
        return activeCreateExercises[0];
      }
    });
  }, [
    activeSelect,
    selectDate,
    allTrainings,
    userExercises,
    activeTrainingId,
    isErrorResponse,
    typeDrawer,
  ]);

  useEffect(() => {
    if (!createTrainingBtn) {
      dispatch(removeDataFromDrawer());
    }
  }, [createTrainingBtn, dispatch]);

  const handleChangeTrainingBtn = () => {
    changeCreateTraining(true);
  };

  const handleAddExercises = () => {
    dispatch(
      openDrawer({
        activeSelect: colorStatusBadge[activeSelect as TrainingListKeys],
        typeDrawer: DrawerType.Create,
      })
    );
  };

  const handleSaveExercises = () => {
    dispatch(checkErrorResponse(false));

    if (activeExercises && typeDrawer === DrawerType.Create) {
      setIsLoading(true);
      postExercise(activeExercises)
        .unwrap()
        .then(() => {
          changeCreateTraining(false);
        })
        .catch(() => {
          modalInstance = showDeleteConfirm(handleCloseModal);
          closeModal(false);
          dispatch(checkErrorResponse(true));
        })
        .finally(() => setIsLoading(false));
    }
    if (activeExercises && typeDrawer === DrawerType.UpdateFuture && isFuture) {
      setIsLoading(true);
      putExercise({
        id: activeExercises._id as string,
        body: {
          name: activeExercises.name,
          date: activeExercises.date,
          exercises: activeExercises.exercises,
        },
      })
        .unwrap()
        .then(() => {
          changeCreateTraining(false);
        })
        .catch(() => {
          modalInstance = showDeleteConfirm(handleCloseModal);
          closeModal(false);
          dispatch(checkErrorResponse(true));
        })
        .finally(() => setIsLoading(false));
    }

    if (activeExercises && typeDrawer === DrawerType.UpdateFuture && !isFuture) {
      setIsLoading(true);
      putExercise({
        id: activeExercises._id as string,
        body: {
          name: activeExercises.name,
          date: activeExercises.date,
          exercises: activeExercises.exercises,
          isImplementation: true,
        },
      })
        .unwrap()
        .then(() => {
          changeCreateTraining(false);
        })
        .catch(() => {
          modalInstance = showDeleteConfirm(handleCloseModal);
          closeModal(false);
          dispatch(checkErrorResponse(true));
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleCloseModal = () => {
    changeCreateTraining(false);
    changeActiveSelect(TrainingListText.Null);
    dispatch(removeDataFromDrawer());
    dispatch(closeDrawer());
    setActiveExercises(undefined);
    (modalInstance as ModalConfirmType).destroy();
  };

  const handleUpdateExercises = (item: PostPutExerciseType) => {
    dispatch(addActiveTrainingId({ trainingId: item._id }));
    dispatch(updateTypeDrawer({ typeDrawer: DrawerType.UpdateFuture }));
    changeAddTraining(false);
    changeCreateTraining(true);
    changeActiveSelect(item.name as TrainingListText);
  };

  useEffect(() => {
    if (isUpdate) {
      setActiveExercises(allTrainings[0]);
    }
  }, [activeExercises, allTrainings, isUpdate]);

  const handleUpdateWithDrawer = () => {
    dispatch(
      openDrawer({
        activeSelect: colorStatusBadge[activeSelect as TrainingListKeys],
        typeDrawer: DrawerType.UpdateFuture,
      })
    );

    dispatch(
      addDataFromDrawer({
        trainingName: activeExercises?.name,
        trainingDate: activeExercises?.date,
        training: activeExercises?.exercises,
        trainingId: activeExercises?._id,
        isFuture: isFuture,
      })
    );
    setIsUpdate(true);
  };

  return (
    <div
      data-test-id={
        !createTrainingBtn
          ? calendarTestId.modalActionTraining.training
          : calendarTestId.modalActionCreate.exercise
      }
      className={createTrainingBtn ? 'popover-body-drawer' : ''}>
      <div className="list-body">
        {createTrainingBtn ? (
          !!activeExercises?.exercises.length || !addTraining ? (
            <ul className="list-body-drawer">
              {activeExercises?.exercises.map((item, index) => (
                <li key={item.name}>
                  {item.name}{' '}
                  <EditOutlined
                    onClick={() => handleUpdateWithDrawer()}
                    data-test-id={getDataTestIdWithIndex(
                      calendarTestId.modalActionTraining.editButton,
                      index
                    )}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-training">
              <img src={emptyExerciseList} alt="No active training" />
            </div>
          )
        ) : trainingListUser?.length ? (
          <ul>
            {trainingListUser?.map((item: PostPutExerciseType, index) => (
              <li
                key={index}
                className={
                  item.isImplementation ? 'active-implementation' : 'inactive-implementation'
                }>
                <Badge
                  color={getColorStatusBadge(item.name as TrainingListKeys).color}
                  text={getColorStatusBadge(item.name as TrainingListKeys).content}
                />
                <button
                  onClick={() => handleUpdateExercises(item)}
                  data-test-id={getDataTestIdWithIndex(
                    calendarTestId.modalActionTraining.editButton,
                    index
                  )}
                  disabled={item.isImplementation}>
                  <EditOutlined />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-training">
            <img src={emptyExerciseList} alt="No active training" />
          </div>
        )}
      </div>
      <span className="actions">
        {createTrainingBtn ? (
          <>
            <Button
              disabled={!activeSelect || activeSelect === TrainingListText.Null}
              onClick={handleAddExercises}>
              Добавить упражнения
            </Button>
            <Button
              type="text"
              disabled={
                !activeExercises ||
                !activeSelect ||
                activeSelect === TrainingListText.Null ||
                !activeExercises?.exercises.length
              }
              onClick={handleSaveExercises}>
              {isLoading && <Lottie options={defaultOptions} height={10} width={10} />}
              {isFuture ? ' Сохранить' : 'Сохранить изменения'}
            </Button>
          </>
        ) : (
          <Button
            disabled={!isFuture || trainingList.length <= listData.length}
            className="create"
            type="primary"
            onClick={handleChangeTrainingBtn}>
            Создать тренировку
          </Button>
        )}
      </span>
    </div>
  );
};
