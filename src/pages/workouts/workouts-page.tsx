import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Badge, Drawer, Grid, Layout, Tabs, TabsProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { CloseOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  useLazyGetTrainingListQuery,
  store,
  showLoader,
  addTrainingListData,
  hideLoader,
  closeDrawer,
} from '../../redux';

import {
  MyTrainingsComponent,
  EmptyMyTrainingsComponent,
  JointTrainingsComponent,
  MarathonsComponent,
  BreadcrumbComponent,
  SettingsButtonComponent,
  ModalServer,
  DrawerTitleComponent,
  DrawerBodyComponent,
} from '../../components';

import { calendarTestId, workoutsPageNav } from '../../constants';

import styles from './workouts-page.module.scss';

const WorkoutsPage: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const dispatch = useAppDispatch();
  const { userExercises } = useAppSelector((state) => state.userExercises);
  const { countInvites } = useAppSelector((state) => state.invite);

  const [trigger] = useLazyGetTrainingListQuery({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showButtonCreate, setShowButtonCreate] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setIsOpenDrawer(store.getState().userExercises.drawer.isOpen)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getDataTrainingList = useCallback(async () => {
    dispatch(showLoader());
    try {
      const data = await trigger({}).unwrap();
      dispatch(addTrainingListData({ trainingList: data }));
      setShowButtonCreate(false);
    } catch (error) {
      setIsModalVisible(true);
      setShowButtonCreate(true);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, trigger]);

  useLayoutEffect(() => {
    getDataTrainingList();
  }, [getDataTrainingList]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <div className={styles.tabsLabel}>{workoutsPageNav.myTrainings}</div>,
      children:
        userExercises.length > 0 ? (
          <MyTrainingsComponent showButtonCreate={showButtonCreate} />
        ) : (
          <EmptyMyTrainingsComponent showButtonCreate={showButtonCreate} />
        ),
    },
    {
      key: '2',
      label: (
        <div className={styles.tabsLabel}>
          {workoutsPageNav.jointTrainings}
          <Badge count={countInvites}></Badge>
        </div>
      ),
      children: <JointTrainingsComponent />,
    },
    {
      key: '3',
      label: <div className={styles.tabsLabel}>{workoutsPageNav.marathons}</div>,
      children: <MarathonsComponent />,
    },
  ];

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <>
      <Layout className={styles.mainContainer}>
        <div className={styles.headerWrapper}>
          <BreadcrumbComponent />
          <div className={styles.buttonSettingsWrapper}>
            <SettingsButtonComponent />
          </div>
        </div>
        <Content className={styles.workoutsContentContainer}>
          <div className={styles.workoutsBodyWrapper}>
            <Tabs
              defaultActiveKey="1"
              centered
              items={items}
              className={styles.tabsNav}
              indicator={{ size: (origin) => origin, align: 'center' }}
            />
          </div>
        </Content>
        <ModalServer
          isModalVisible={isModalVisible}
          changeModalClose={setIsModalVisible}
          getDataTrainingList={getDataTrainingList}
        />
      </Layout>
      <Drawer
        title={<DrawerTitleComponent />}
        placement="right"
        mask={false}
        maskClosable={true}
        open={isOpenDrawer}
        onClose={handleCloseDrawer}
        data-test-id={calendarTestId.modalActionDrawer.drawer}
        closeIcon={<CloseOutlined data-test-id={calendarTestId.modalActionDrawer.buttonClose} />}
        style={{ width: isMobile ? '360px' : '408px' }}>
        <div ref={drawerRef} style={{ height: '100%' }}>
          <DrawerBodyComponent isOpenDrawer={isOpenDrawer} />
        </div>
      </Drawer>
    </>
  );
};

export default WorkoutsPage;
