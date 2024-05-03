import { useState } from 'react';

import { Avatar, Badge, Button, Popover } from 'antd';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';

import { useAppDispatch } from '../../../../../hooks';
import {
  useLazyGetPalsListQuery,
  usePutInviteMutation,
  showLoader,
  hideLoader,
} from '../../../../../redux';

import {
  GetInvite,
  TrainingStatus,
  workoutsTestId,
  getColorStatusBadge,
  TrainingListKeys,
} from '../../../../../constants';

import {
  ModalConfirmType,
  showDeleteConfirm,
} from '../../../calendar-page/popover-body/utils/popover-body-utils';

import styles from './message-card.module.scss';
import { updatePalsList } from '../../../../../redux/slices/invite-slice';

type MessageCardType = {
  item: GetInvite;
};

export const MessageCardComponent: React.FC<MessageCardType> = ({ item }) => {
  const dispatch = useAppDispatch();

  const [refetch] = useLazyGetPalsListQuery();
  const [putInvite] = usePutInviteMutation({});

  const { from, createdAt, training, _id } = item;

  const [open, setOpen] = useState(false);

  let modalInstance: ModalConfirmType | null = null;

  const handleAnswer = async (type: TrainingStatus) => {
    const body = {
      id: _id,
      status: type,
    };

    dispatch(showLoader());
    setOpen(false);

    await putInvite(body)
      .unwrap()
      .then(() => {
        refetch({});
        dispatch(updatePalsList({ inviteId: item._id }));
      })
      .catch(() => {
        modalInstance = showDeleteConfirm(handleCloseModal);
      })
      .finally(() => dispatch(hideLoader()));
  };

  const handleOpenPopover = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    (modalInstance as ModalConfirmType).destroy();
  };

  return (
    <div className={styles.messageWrapper}>
      <div className={styles.userContainer}>
        <Avatar
          className={styles.userAvatar}
          size={42}
          src={from.imageSrc || null}
          icon={from.imageSrc ? null : <UserOutlined />}
        />

        <div className={styles.userName}>
          <h6>{from.firstName}</h6>
          <h6>{from.lastName}</h6>
        </div>
      </div>
      <div className={styles.messageContainer}>
        <span className={styles.messageDate}>{dayjs(createdAt).format('DD.MM.YYYY')}</span>
        <div className={styles.messageContent}>
          <h5>
            Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь присоединиться ко
            мне на следующих тренировках?
          </h5>
          <Popover
            placement="bottomLeft"
            arrow={false}
            trigger="click"
            open={open}
            overlayInnerStyle={{
              display: 'flex',
              flexDirection: 'column',
              width: '312px',
              minHeight: '134px',
            }}
            content={
              <div data-test-id={workoutsTestId.jointTraining.modal}>
                <div className={styles.popoverTitle}>
                  <Badge
                    color={getColorStatusBadge(training.name as TrainingListKeys).color}
                    text={getColorStatusBadge(training.name as TrainingListKeys).content}
                  />
                  <Button onClick={() => setOpen(false)}>
                    <CloseOutlined />
                  </Button>
                </div>
                <div className={styles.popoverContent}>
                  <div className={styles.linePeriod}>
                    <h5>Через {training.parameters.period} дня</h5>
                    <p>{dayjs(training.date).format('DD.MM.YYYY')}</p>
                  </div>
                  {training.exercises.map((elem) => (
                    <div className={styles.lineExercises}>
                      <p>{elem.name}</p>
                      <span>
                        {elem.approaches} x ({`${elem.weight} кг` || elem.replays})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            }>
            <Button type="link" onClick={handleOpenPopover}>
              Посмотреть детали тренировки
            </Button>
          </Popover>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <Button
          type="primary"
          className={styles.actionTogether}
          onClick={() => handleAnswer(TrainingStatus.Accepted)}>
          Тренироваться вместе
        </Button>
        <Button
          className={styles.actionSingle}
          onClick={() => handleAnswer(TrainingStatus.Rejected)}>
          Отклонить запрос
        </Button>
      </div>
    </div>
  );
};
