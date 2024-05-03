import { useEffect, useState } from 'react';

import { Button, Grid } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { history } from '../../../redux';

import { ROUTE_PATHS, settingsTestId } from '../../../constants';

import styles from './settings-button.module.scss';

export const SettingsButtonComponent: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  const handleRedirectToSettingsPage = () => {
    history.push(ROUTE_PATHS.settings);
  };

  return (
    <Button
      type="text"
      shape="default"
      size="middle"
      className={styles.buttonWrapper}
      onClick={handleRedirectToSettingsPage}
      data-test-id={settingsTestId.buttonSettings}>
      <SettingOutlined className="extra__icon" />
      {!isMobile && <p>Настройки</p>}
    </Button>
  );
};
