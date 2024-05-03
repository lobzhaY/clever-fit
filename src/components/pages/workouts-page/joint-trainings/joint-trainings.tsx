import { useState } from 'react';

import { Button, Modal } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  useLazyGetPalsListQuery,
  useLazyGetUserJointTrainingListQuery,
  showLoader,
  addJointUsers,
  addSearchJointUsers,
  hideLoader,
  addPalsList,
} from '../../../../redux';

import { UserCardComponent } from './user-card/user-card';

import {
  getJointTrainingTextAction,
  GetUserJointList,
  GetOnePals,
  headerPalsCard,
  userCard,
} from '../../../../constants';

import { getQueryTrainingType, getSortedData } from '../utils';

import styles from './joint-trainings.module.scss';

import {
  ModalConfirmType,
  showDeleteConfirm,
} from '../../calendar-page/popover-body/utils/popover-body-utils';
import { ModalServer } from '../../../ui';
import { PalsListComponent } from './pals-list/pals-list';
import { SiderJointComponent } from './sider-joint/sider-joint';
import { UsersJointListComponent } from './users-joint-list/users-joint-list';

export const JointTrainingsComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const [refetch] = useLazyGetPalsListQuery();
  const [getUserJointList] = useLazyGetUserJointTrainingListQuery({});

  const { userExercises, trainingList } = useAppSelector((state) => state.userExercises);
  const { newInvites } = useAppSelector((state) => state.invite);

  const [navigationUi, setNavigationUi] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [searchText, setSearchText] = useState('');

  const [errorModalType, setErrorModalType] = useState<getJointTrainingTextAction>();
  const [modalItem, setModalItem] = useState<GetUserJointList | GetOnePals>();
  const [invitedId, setInvitedId] = useState<string[]>([]);

  let modalInstance: ModalConfirmType | null = null;

  const handleGetAccidentallyUsers = async (type: getJointTrainingTextAction) => {
    setSearchText('');

    let body;
    if (type === getJointTrainingTextAction.Accidentally) {
      body = {};
    } else {
      body = {
        trainingType: getQueryTrainingType(userExercises, trainingList),
      };
    }

    dispatch(showLoader());
    await getUserJointList(body)
      .unwrap()
      .then((data) => {
        const sortedData = getSortedData([...data]);
        dispatch(addJointUsers({ jointUsersList: sortedData }));
        dispatch(addSearchJointUsers({ searchUserActionList: [] }));
        setNavigationUi(true);
      })
      .catch(() => {
        setIsModalVisible(true);
        setErrorModalType(type);
      })
      .finally(() => dispatch(hideLoader()));
  };

  const handleCancelModal = async (inviteId: string) => {
    dispatch(showLoader());
    refetch({})
      .unwrap()
      .then((data) => {
        dispatch(addPalsList({ palsList: data }));
      })
      .catch(() => (modalInstance = showDeleteConfirm(handleUserCloseModal)))
      .finally(() => {
        dispatch(hideLoader());
        setIsOpenModal(false);
      });

    setInvitedId((prev) => [...prev, inviteId]);
  };

  const handleUserCloseModal = () => {
    (modalInstance as ModalConfirmType).destroy();
  };

  return (
    <div className={styles.jointWrapper}>
      {newInvites.length > 0 && !navigationUi && (
        <div>
          <SiderJointComponent />
        </div>
      )}
      {navigationUi ? (
        <UsersJointListComponent
          searchText={searchText}
          setSearchText={setSearchText}
          setNavigationUi={setNavigationUi}
        />
      ) : (
        <>
          <div className={styles.headerPalsCard}>
            <div className={styles.header}>
              <h3>{headerPalsCard.title}</h3>
              <p>{headerPalsCard.subtitle}</p>
            </div>
            <div className={styles.actions}>
              <Button
                type="text"
                className={styles.accidentally}
                onClick={() => handleGetAccidentallyUsers(getJointTrainingTextAction.Accidentally)}>
                {headerPalsCard.actions.accidentally}
              </Button>
              <Button
                type="text"
                className={styles.parameters}
                onClick={() => handleGetAccidentallyUsers(getJointTrainingTextAction.Parameters)}>
                {headerPalsCard.actions.parameters}
              </Button>
            </div>
          </div>

          <PalsListComponent
            invitedId={invitedId}
            searchText={searchText}
            setModalItem={setModalItem}
            setIsOpenModal={setIsOpenModal}
          />

          <Modal closable={true} open={isOpenModal} footer={null}>
            <UserCardComponent
              item={modalItem as GetUserJointList}
              type={userCard.Modal}
              handleModal={handleCancelModal}
            />
          </Modal>
          <ModalServer
            isModalVisible={isModalVisible}
            changeModalClose={setIsModalVisible}
            getDataTrainingList={() =>
              handleGetAccidentallyUsers(errorModalType as getJointTrainingTextAction)
            }
          />
        </>
      )}
    </div>
  );
};
