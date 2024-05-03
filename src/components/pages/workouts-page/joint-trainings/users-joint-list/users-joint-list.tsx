import { useEffect, useState } from 'react';

import { Button, Grid, Input, List, PaginationProps } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { SearchProps } from 'antd/es/input';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { addSearchJointUsers } from '../../../../../redux';

import { UserCardComponent } from '../user-card/user-card';

import {
  PostPutExerciseType,
  headerUserJointBtnBack,
  workoutsTestId,
  GetUserJointList,
  userCard,
} from '../../../../../constants';

import { getGrid } from '../../utils';

import styles from './users-joint-list.module.scss';

type usersJointType = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  setNavigationUi: (navigationUi: boolean) => void;
};

export const UsersJointListComponent: React.FC<usersJointType> = ({
  searchText,
  setSearchText,
  setNavigationUi,
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { Search } = Input;
  const dispatch = useAppDispatch();

  const { jointUsers, searchJointUsers } = useAppSelector((state) => state.invite);

  const [isMobile, setIsMobile] = useState('lg');

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (screens.xs) {
      setIsMobile('xs');
    } else if (
      (screens.sm && screens.md && !screens.lg) ||
      (screens.sm && !screens.xs && !screens.lg)
    ) {
      setIsMobile('sm');
    } else {
      setIsMobile('lg');
    }
  }, [screens]);

  const handleBack = () => {
    setNavigationUi(false);
    setSearchText('');
  };

  const onChangePage: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchText(value);

    const filteredResults = jointUsers.filter((result: PostPutExerciseType) =>
      result.name.toLowerCase().includes(value.toLowerCase())
    );

    dispatch(addSearchJointUsers({ searchUserActionList: filteredResults }));
  };

  return (
    <div className={styles.headerUserJoint}>
      <div className={styles.header}>
        <Button type="text" className={styles.action} onClick={handleBack}>
          <ArrowLeftOutlined />
          <h4 className={styles.actionText}>{headerUserJointBtnBack}</h4>
        </Button>

        <Search
          placeholder="input search text"
          onSearch={onSearch}
          className={styles.search}
          data-test-id={workoutsTestId.search}
        />
      </div>
      <div className={styles.content}>
        <List
          className={styles.cardsWrapper}
          grid={getGrid(isMobile)}
          dataSource={searchText.length === 0 ? jointUsers : searchJointUsers}
          pagination={{
            onChange: (page) => {
              onChangePage(page, 12);
            },
            pageSize: 12,
            total: searchText.length === 0 ? jointUsers.length : searchJointUsers.length,
            current: currentPage,
            align: 'start',
            showSizeChanger: false,
          }}
          renderItem={(elem: GetUserJointList, index) => (
            <List.Item>
              <UserCardComponent
                key={elem.id}
                item={elem}
                searchText={searchText}
                type={userCard.All}
                testKey={index}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
