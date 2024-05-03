import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Alert, Breakpoint, Button, Flex, Grid, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';

import { useAppSelector } from '../../hooks';

import { MenuComponent } from '../../components';

import { siderButtonTestId, workoutsTestId } from '../../constants';

import './main-layout.scss';

export const MainLayout: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { isOpen, type } = useAppSelector((state) => state.userExercises.alert);

  const [collapsed, setCollapsed] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState(siderButtonTestId.desktop);

  useEffect(() => {
    catchBreakpoints(screens);
  }, [screens]);

  const catchBreakpoints = (screens: Partial<Record<Breakpoint, boolean>>) => {
    if (screens.xs) {
      setCurrentBreakpoint(siderButtonTestId.mobile);
    }
  };

  useEffect(() => {
    setSuccess(isOpen);
  }, [isOpen]);

  return (
    <>
      <Flex gap="middle" wrap="wrap">
        <Layout className="main-wrapper">
          <div className="sider-container">
            <Sider
              className="sider"
              trigger={null}
              collapsible
              collapsed={collapsed}
              collapsedWidth={currentBreakpoint !== siderButtonTestId.mobile ? '64px' : '0'}
              defaultCollapsed={true}
              width={currentBreakpoint === siderButtonTestId.mobile ? '106px' : '208px'}>
              <MenuComponent isCollapsed={collapsed} />
            </Sider>

            <div className="button-sider-position">
              <Button
                type="text"
                className="button-trigger-menu"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                data-test-id={currentBreakpoint}
              />
            </div>
          </div>
          <Outlet></Outlet>
        </Layout>
      </Flex>
      {success && (
        <Alert
          description={<p className="alert-success">{type}</p>}
          type="success"
          showIcon
          closable
          onClose={() => setSuccess(false)}
          data-test-id={workoutsTestId.myTraining.successAlert}
          className="alert"
        />
      )}
    </>
  );
};
