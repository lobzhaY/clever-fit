import { Button, FormInstance } from 'antd';

import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  usePostExerciseMutation,
  usePutExerciseMutation,
  usePostInviteMutation,
  removeDataFromDrawer,
  showLoader,
  closeDrawer,
  addAlert,
  updateJointUsers,
  hideLoader,
} from '../../../../../redux';

import {
  DrawerType,
  ExercisesType,
  alertText,
  alertAction,
  PostInvite,
} from '../../../../../constants';

import { ModalConfirmType, showDeleteConfirm } from '../../popover-body/utils/popover-body-utils';

import styles from './drawer-actions.module.scss';

type DrawerActionsType = {
  saveDataButton: boolean;
  form: FormInstance<DrawerType>;
  formsData: ExercisesType[];
};

export const DrawerActionsComponent: React.FC<DrawerActionsType> = ({
  saveDataButton,
  form,
  formsData,
}) => {
  const dispatch = useAppDispatch();
  const { typeDrawer } = useAppSelector((state) => state.userExercises.drawer);
  const { drawer, userInviteId, userExercises, activeTrainingId } = useAppSelector(
    (state) => state.userExercises
  );

  const [postExercise] = usePostExerciseMutation();
  const [putExercise] = usePutExerciseMutation();
  const [postInvite] = usePostInviteMutation();

  let modalInstance: ModalConfirmType | null = null;

  const handleCloseModal = () => {
    dispatch(removeDataFromDrawer());
    (modalInstance as ModalConfirmType).destroy();
  };

  const handleSaveData = () => {
    let period = null;
    if (form.getFieldValue('withPeriod')) {
      if (!form.getFieldValue('selectPeriod')) {
        period = 1;
      } else {
        period = form.getFieldValue('selectPeriod');
      }
    }

    const body = {
      name: form.getFieldValue('selectType') || drawer.activeTraining.content,
      date: dayjs(form.getFieldValue('date')).toISOString(),
      isImplementation: false,
      parameters: {
        repeat: form.getFieldValue('withPeriod'),
        period: period,
        jointTraining: false,
        participants: [],
      },
      exercises: formsData.map((elem) => ({
        name: elem.name,
        replays: elem.replays,
        weight: elem.weight,
        approaches: elem.approaches,
        isImplementation: false,
      })),
    };

    if (typeDrawer === DrawerType.ModalCreate || typeDrawer === DrawerType.InviteCreate) {
      dispatch(showLoader());
      postExercise(body)
        .unwrap()
        .then((data) => {
          dispatch(closeDrawer());
          dispatch(
            addAlert({
              isOpen: true,
              type: alertText[alertAction.CreateExercisesSuccessTrainingPage],
            })
          );

          if (typeDrawer === DrawerType.InviteCreate) {
            dispatch(showLoader());
            let inviteBody;
            if (userInviteId) {
              inviteBody = {
                to: userInviteId.id,
                trainingId: data._id,
              };
            }

            postInvite(inviteBody as PostInvite)
              .unwrap()
              .then((data) => {
                dispatch(updateJointUsers({ userId: data.to._id }));
              })
              .catch(() => (modalInstance = showDeleteConfirm(handleCloseModal)))
              .finally(() => dispatch(hideLoader()));
          }
        })
        .catch(() => {
          dispatch(closeDrawer());
          modalInstance = showDeleteConfirm(handleCloseModal);
        })
        .finally(() => dispatch(hideLoader()));
    }

    const currentExercises = userExercises.filter((elem) => elem._id === activeTrainingId)[0];

    if (
      typeDrawer === DrawerType.ModalUpdate &&
      dayjs(currentExercises.date).isSameOrBefore(dayjs())
    ) {
      body.isImplementation = true;
    }

    if (typeDrawer === DrawerType.ModalUpdate) {
      dispatch(showLoader());
      putExercise({
        id: currentExercises._id as string,
        body: body,
      })
        .unwrap()
        .then(() => {
          dispatch(closeDrawer());
          dispatch(
            addAlert({
              isOpen: true,
              type: alertText[alertAction.UpdateExercisesSuccessTrainingPage],
            })
          );
        })
        .catch(() => {
          dispatch(closeDrawer());
          modalInstance = showDeleteConfirm(handleCloseModal);
        })
        .finally(() => {
          dispatch(closeDrawer());
          dispatch(hideLoader());
        });
    }
    dispatch(closeDrawer());
  };

  return (
    <div className={styles.actions}>
      <Button type="primary" disabled={saveDataButton} onClick={handleSaveData}>
        {typeDrawer === DrawerType.InviteCreate ? 'Отправить приглашение' : 'Сохранить'}
      </Button>
    </div>
  );
};
