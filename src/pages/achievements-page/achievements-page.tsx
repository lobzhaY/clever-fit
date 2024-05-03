import { useCallback, useLayoutEffect, useState } from 'react';

import { Layout, Tabs, TabsProps } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useAppDispatch } from '../../hooks';
import {
  useLazyGetTrainingListQuery,
  showLoader,
  addTrainingListData,
  hideLoader,
} from '../../redux';

import {
  AchievementsWrapperComponent,
  BreadcrumbComponent,
  ModalServer,
  SettingsButtonComponent,
} from '../../components';

import { PeriodRange, achievementsTabsLabel } from '../../constants';

import styles from './achievements-page.module.scss';

const AchievementsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [trigger] = useLazyGetTrainingListQuery({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('week');

  const items: TabsProps['items'] = [
    {
      key: 'week',
      label: <div className={styles.tabsLabel}>{achievementsTabsLabel.week}</div>,
      children: <AchievementsWrapperComponent period={PeriodRange.Week} />,
    },
    {
      key: 'month',
      label: <div className={styles.tabsLabel}>{achievementsTabsLabel.month}</div>,
      children: <AchievementsWrapperComponent period={PeriodRange.Month} />,
    },
    {
      key: 'allTime',
      label: <div className={styles.tabsLabel}>{achievementsTabsLabel.allTime}</div>,
      disabled: true,
    },
  ];

  const getDataTrainingList = useCallback(async () => {
    dispatch(showLoader());
    try {
      const data = await trigger({}).unwrap();
      dispatch(addTrainingListData({ trainingList: data }));
    } catch (error) {
      setIsModalVisible(true);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, trigger]);

  useLayoutEffect(() => {
    getDataTrainingList();
  }, [getDataTrainingList]);

  const saveChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <Layout className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <BreadcrumbComponent />
        <div className={styles.buttonSettingsWrapper}>
          <SettingsButtonComponent />
        </div>
      </div>
      <Content className={styles.achievementsContentContainer}>
        <div className={styles.achievementsBodyWrapper}>
          <Tabs
            centered
            items={items}
            className={styles.tabsNav}
            onChange={saveChange}
            indicator={{ size: (origin) => origin, align: 'center' }}
            activeKey={activeKey}
            destroyInactiveTabPane={true}
          />
        </div>
      </Content>
      <ModalServer
        isModalVisible={isModalVisible}
        changeModalClose={setIsModalVisible}
        getDataTrainingList={getDataTrainingList}
      />
    </Layout>
  );
};

export default AchievementsPage;
