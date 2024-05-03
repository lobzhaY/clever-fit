import { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { addPalsList, useGetPalsListQuery } from '../../../../../redux';

import { UserCardComponent } from '../user-card/user-card';

import { GetUserJointList, GetOnePals, emptyPalsList, userCard } from '../../../../../constants';

import styles from './pals-list.module.scss';

type palsListType = {
  invitedId: string[];
  searchText: string;
  setModalItem: (modalItem: GetUserJointList | GetOnePals) => void;
  setIsOpenModal: (isOpenModal: boolean) => void;
};

export const PalsListComponent: React.FC<palsListType> = ({
  invitedId,
  searchText,
  setModalItem,
  setIsOpenModal,
}) => {
  const { data } = useGetPalsListQuery({});

  const dispatch = useAppDispatch();
  const { palsList } = useAppSelector((state) => state.invite);

  useLayoutEffect(() => {
    if (data) {
      dispatch(addPalsList({ palsList: data }));
    }
  }, [data, dispatch]);

  return (
    <div className={styles.palsListWrapper}>
      <h6>{emptyPalsList.title}</h6>
      <div className={styles.palsList}>
        {palsList?.filter((pal: GetOnePals) => !invitedId.includes(pal.inviteId)).length !== 0 ? (
          palsList?.map((elem: GetOnePals, index) => (
            <UserCardComponent
              key={elem.id}
              item={elem}
              searchText={searchText}
              type={userCard.Short}
              handleOpenModal={setIsOpenModal}
              handleSaveItem={setModalItem}
              testKey={index}
            />
          ))
        ) : (
          <p className={styles.emptyText}>{emptyPalsList.subTitle}</p>
        )}
      </div>
    </div>
  );
};
