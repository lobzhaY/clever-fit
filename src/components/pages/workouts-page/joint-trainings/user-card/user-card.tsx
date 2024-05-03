import { ReactElement, useCallback, useEffect, useState } from 'react';

import { Avatar, Button } from 'antd';
import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { openDrawer, createInvite } from '../../../../../redux';

import {
  GetUserJointList,
  GetOnePals,
  userCard,
  TrainingStatus,
  colorStatusBadge,
  TrainingListKeys,
  DrawerType,
  workoutsTestId,
  getDataTestIdWithIndex,
} from '../../../../../constants';

import { highlightText } from '../../utils';

import styles from './user-card.module.scss';

type userCardType = {
  item: GetUserJointList | GetOnePals;
  searchText?: string;
  type: userCard;
  handleOpenModal?: (isOpen: boolean) => void;
  handleSaveItem?: (item: GetUserJointList | GetOnePals) => void;
  testKey?: number;
  handleModal?: (inviteId: string) => void;
};

export const UserCardComponent: React.FC<userCardType> = ({
  item,
  searchText,
  type,
  handleOpenModal,
  handleSaveItem,
  testKey,
  handleModal,
}) => {
  const dispatch = useAppDispatch();
  const { pendingInvites } = useAppSelector((state) => state.invite);

  const { name, imageSrc, trainingType, avgWeightInWeek, status, inviteId, id } = item;

  const [statusText, setStatusText] = useState<ReactElement>();

  const getStatusUi = useCallback(() => {
    const pendingArr: GetUserJointList[] = pendingInvites.filter(
      (elem: GetUserJointList) => elem.id === id
    );

    switch (status as unknown as TrainingStatus) {
      case TrainingStatus.Accepted:
        setStatusText(
          <span className={styles.trainingStatus}>
            тренировка одобрена {<CheckCircleFilled className={styles.statusApproved} />}
          </span>
        );
        break;
      case (pendingArr[0] && pendingArr[0].status) || TrainingStatus.Pending:
        setStatusText(<span className={styles.trainingStatus}>ожидает подтверждения</span>);
        break;
      case TrainingStatus.Rejected:
        setStatusText(
          <span className={styles.trainingStatus}>
            тренировка отклонена{' '}
            {<ExclamationCircleOutlined className={styles.statusNotApproved} />}
          </span>
        );
        break;
      default:
        break;
    }
  }, [id, pendingInvites, status]);

  useEffect(() => {
    getStatusUi();
  }, [status, pendingInvites, getStatusUi]);

  const getClassName = (type: userCard) => {
    if (type === userCard.All) {
      return styles.cardsWrapper;
    }
    if (type === userCard.Short) {
      return styles.cardsWrapperShort;
    }
    return styles.cardsWrapperModal;
  };

  const handleCancel = async () => {
    if (handleModal) {
      handleModal(inviteId as string);
    }
  };

  const handleShowModal = (elem: GetUserJointList | GetOnePals): void => {
    if (type === userCard.Short && handleOpenModal && handleSaveItem) {
      handleOpenModal(true);
      handleSaveItem(elem);
    }
  };

  const handleCreateNewInvite = () => {
    dispatch(
      openDrawer({
        activeSelect: colorStatusBadge[trainingType as TrainingListKeys],
        typeDrawer: DrawerType.InviteCreate,
      })
    );
    dispatch(createInvite({ userInvitedId: item }));
  };

  return (
    <div
      className={getClassName(type)}
      onClick={() => handleShowModal(item)}
      data-test-id={
        type === userCard.Modal
          ? workoutsTestId.modal
          : getDataTestIdWithIndex(workoutsTestId.jointTraining.cards, testKey as number)
      }>
      <div className={styles.lineInfo}>
        <div className={styles.avatarWrapper}>
          <Avatar size={42} src={imageSrc || null} icon={imageSrc ? null : <UserOutlined />} />
          <h6>{highlightText(name, type, searchText, name)}</h6>
        </div>
        <div className={styles.trainingWrapper}>
          <div className={styles.trainingItem}>
            <span className={styles.itemTitle}>Тип тренировки:</span>{' '}
            <span className={styles.itemContent}>{trainingType}</span>
          </div>
          <div className={styles.trainingItem}>
            <span className={styles.itemTitle}>Средняя нагрузка:</span>{' '}
            <span className={styles.itemContent}>{avgWeightInWeek} кг/нед</span>
          </div>
        </div>
      </div>
      {(type === userCard.All || type === userCard.Modal) && (
        <div className={styles.activeWrapper}>
          {status === TrainingStatus.Accepted ? (
            <Button onClick={handleCancel}>Отменить тренировку</Button>
          ) : (
            <Button
              type="primary"
              disabled={status === TrainingStatus.Rejected || status === TrainingStatus.Pending}
              onClick={handleCreateNewInvite}>
              Создать тренировку
            </Button>
          )}
          <>{status && <div className={styles.statusBlock}>{statusText}</div>}</>
        </div>
      )}
    </div>
  );
};
