import { useEffect, useState } from 'react';

import { Form, Grid, Switch, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useAppSelector } from '../../../../hooks';
import { usePutUserMutation } from '../../../../redux';

import {
  tariffsSettings,
  settingsPrompt,
  settingsTestId,
  TariffsText,
} from '../../../../constants';

import { FieldData } from '../../../../pages';

import styles from './form-settings.module.scss';

type FormSettingsType = {
  userTariff: string;
};

export const FormSettings: React.FC<FormSettingsType> = ({ userTariff }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [form] = Form.useForm();

  const { sendNotification, readyForJointTraining } = useAppSelector((state) => state.user);

  const [putSettings] = usePutUserMutation({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ sendNotification, readyForJointTraining });
  }, [form, sendNotification, readyForJointTraining]);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  const handleSwitchChange = async (changedFields: FieldData[]) => {
    if (changedFields[0].name[0] === 'darkTheme') {
      localStorage.setItem('darkTheme', changedFields[0].value as string);
      return;
    }
    const body = {
      [changedFields[0].name[0]]: changedFields[0].value,
    };
    await putSettings(body).unwrap();
  };

  return (
    <Form
      form={form}
      name="settings-content"
      onFieldsChange={handleSwitchChange}
      className={styles.form}>
      <div className={styles.itemWrapper}>
        <span className={styles.switchLabel}>
          <span className={styles.labelTitle}>{tariffsSettings.jointTraining} </span>
          <Tooltip
            placement={isMobile ? 'top' : 'bottomLeft'}
            title={settingsPrompt.jointTraining}
            trigger="hover">
            <ExclamationCircleOutlined
              data-test-id={settingsTestId.icons.trainings}
              className={styles.labelIcon}
            />
          </Tooltip>
        </span>
        <Form.Item name="readyForJointTraining" className={styles.formItem}>
          <Switch
            data-test-id={settingsTestId.switches.trainings}
            className={styles.switch}
            size={isMobile ? 'small' : 'default'}
          />
        </Form.Item>
      </div>
      <div className={styles.itemWrapper}>
        <span className={styles.switchLabel}>
          <span className={styles.labelTitle}>{tariffsSettings.notifications} </span>
          <Tooltip
            placement={isMobile ? 'top' : 'bottomLeft'}
            title={settingsPrompt.notifications}
            trigger="hover">
            <ExclamationCircleOutlined
              data-test-id={settingsTestId.icons.notifications}
              className={styles.labelIcon}
            />
          </Tooltip>
        </span>
        <Form.Item name="sendNotification" className={styles.formItem}>
          <Switch
            data-test-id={settingsTestId.switches.notifications}
            className={styles.switch}
            size={isMobile ? 'small' : 'default'}
          />
        </Form.Item>
      </div>
      <div className={styles.itemWrapper}>
        <span
          className={
            userTariff !== TariffsText.Free ? styles.switchLabel : styles.switchLabelDisabled
          }>
          <span className={styles.labelTitle}>{tariffsSettings.darkTheme} </span>
          <Tooltip
            title={
              userTariff === TariffsText.Free
                ? settingsPrompt.darkTheme
                : settingsPrompt.darkThemePro
            }
            placement={isMobile ? 'top' : 'bottomLeft'}
            trigger="hover">
            <ExclamationCircleOutlined
              data-test-id={settingsTestId.icons.theme}
              className={styles.labelIcon}
            />
          </Tooltip>
        </span>
        <Form.Item name="darkTheme" className={styles.formItem}>
          <Switch
            disabled={userTariff === TariffsText.Free}
            data-test-id={settingsTestId.switches.theme}
            className={styles.switch}
            size={isMobile ? 'small' : 'default'}
          />
        </Form.Item>
      </div>
    </Form>
  );
};
