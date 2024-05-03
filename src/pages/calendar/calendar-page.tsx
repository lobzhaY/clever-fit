import { useCallback, useLayoutEffect, useState } from 'react';

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useAppDispatch } from '../../hooks';
import { useLazyGetTrainingListQuery, addTrainingListData } from '../../redux';

import {
  BreadcrumbComponent,
  SettingsButtonComponent,
  CalendarComponent,
  ModalServer,
} from '../../components';

import './calendar-page.scss';

const CalendarPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trigger] = useLazyGetTrainingListQuery({});

  const getDataTrainingList = useCallback(async () => {
    try {
      const data = await trigger({}).unwrap();
      dispatch(addTrainingListData({ trainingList: data }));
    } catch (error) {
      setIsModalVisible(true);
    }
  }, [dispatch, trigger]);

  useLayoutEffect(() => {
    getDataTrainingList();
  }, [getDataTrainingList]);

  return (
    <Layout className="main-container">
      <div className="header-wrapper">
        <BreadcrumbComponent />
        <div className="settings-button-wrapper">
          <SettingsButtonComponent />
        </div>
      </div>
      <Content className="calendar-content-container">
        <CalendarComponent />
      </Content>
      <ModalServer
        isModalVisible={isModalVisible}
        changeModalClose={setIsModalVisible}
        getDataTrainingList={getDataTrainingList}
      />
    </Layout>
  );
};

export default CalendarPage;
