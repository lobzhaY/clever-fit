import { useCallback, useEffect, useState } from 'react';

import { Alert, Button, ConfigProvider, DatePicker, Form, Input } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons';
import ruRU from 'antd/lib/locale/ru_RU';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { usePutUserMutation, useLazyGetCurrentUserQuery, addUserData } from '../../../../redux';

import {
  profileHeaders,
  profileFormPlaceholders,
  profileTestId,
  authFormItemRules,
  changePasswordInputHelp,
  confirmAuthValidationRule,
  profileBtn,
  alertProfileText,
} from '../../../../constants';

import {
  dateFormat,
  passwordRules,
  profileFormType,
  showErrorModal,
} from './utils/profile-form-utils';

import { FieldData } from '../../../../pages';

import { UploadImage } from '../upload-img';

import styles from './profile-form.module.scss';

export const ProfileForm: React.FC = () => {
  dayjs.extend(customParseFormat);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state);

  const [form] = Form.useForm();

  const [putUserData] = usePutUserMutation();
  const [trigger] = useLazyGetCurrentUserQuery({});

  const [isValidate, setIsValidate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const setFields = useCallback(() => {
    const newArr = Object.entries(user).filter((elem) => elem[1] && elem[0] !== 'tariff');
    newArr.forEach((elem) => {
      if (elem[0] === 'birthday') {
        form.setFieldValue(elem[0], dayjs(elem[1] as string));
      } else {
        form.setFieldValue(elem[0], elem[1]);
      }
    });
  }, [form, user]);

  useEffect(() => {
    setFields();
  }, [user, setFields]);

  const onFinish = async (values: profileFormType) => {
    await putUserData(values)
      .unwrap()
      .then(() => {
        setIsValidate(false);
        setSuccess(true);
        setPasswordChanged(false);

        trigger()
          .unwrap()
          .then((data) => dispatch(addUserData({ currentUser: data })));
      })
      .catch(() => {
        showErrorModal();
        setIsValidate(false);
      });
  };

  const handleFieldsChange = (changedFields: FieldData[]) => {
    if (changedFields[0].name[0] === 'password' || changedFields[0].name[0] === 'confirm') {
      if (!passwordChanged) {
        setIsValidate(false);
        setPasswordChanged(true);
      }
      if (changedFields[0].value && (changedFields[0].value as string).length === 0) {
        setIsValidate(true);
        setPasswordChanged(false);
      }
    } else {
      setIsValidate(true);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="profile"
        className={styles.profileForm}
        onFinish={onFinish}
        onFieldsChange={handleFieldsChange}
        validateTrigger={['onChange']}>
        <div className={styles.personalInfoWrapper}>
          <h5>{profileHeaders.personalInfo}</h5>
          <div className={styles.personalInfoContent}>
            <UploadImage changeIsValidate={setIsValidate} />
            <div className={styles.personalInfo}>
              <Form.Item name="firstName">
                <Input
                  type="text"
                  placeholder={profileFormPlaceholders.name}
                  data-test-id={profileTestId.inputName}
                />
              </Form.Item>

              <Form.Item name="lastName">
                <Input
                  type="text"
                  placeholder={profileFormPlaceholders.lastName}
                  data-test-id={profileTestId.inputSurname}
                />
              </Form.Item>

              <Form.Item name="birthday">
                <ConfigProvider locale={ruRU}>
                  <DatePicker
                    placeholder={profileFormPlaceholders.birthday}
                    suffixIcon={<CalendarTwoTone />}
                    format={dateFormat}
                    data-test-id={profileTestId.fieldBirthday}
                  />
                </ConfigProvider>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={styles.privacyAuthorizationWrapper}>
          <h5>{profileHeaders.privacyAuthorization}</h5>
          <div className={styles.privacyAuthorizationContent}>
            <Form.Item
              name="email"
              rules={authFormItemRules}
              validateTrigger={['onChange']}
              className={styles.itemEmail}>
              <Input
                type="email"
                addonBefore={<div className="email-registration">e-mail:</div>}
                data-test-id={profileTestId.fieldEmail}
              />
            </Form.Item>

            <Form.Item
              shouldUpdate
              name="password"
              rules={passwordChanged ? passwordRules(passwordChanged, setIsValidate) : []}
              help={changePasswordInputHelp}
              validateTrigger={['onChange']}
              className={styles.itemPassword}>
              <Input.Password
                placeholder={profileFormPlaceholders.password}
                data-test-id={profileTestId.fieldPassword}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                {
                  required: passwordChanged,
                  message: 'Please confirm your password!',
                },
                confirmAuthValidationRule(() => {
                  setIsValidate(() => true);
                }),
              ]}
              validateTrigger={['onChange']}
              className={styles.itemPassword}>
              <Input.Password
                placeholder={profileFormPlaceholders.repeatPassword}
                data-test-id={profileTestId.fieldRepeatPassword}
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item shouldUpdate className={styles.buttonsItemSubmit}>
          {() => (
            <Button
              type="primary"
              className={styles.profileBtn}
              data-test-id={profileTestId.buttonSubmit}
              htmlType="submit"
              disabled={
                !isValidate || !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }>
              {profileBtn}
            </Button>
          )}
        </Form.Item>
      </Form>
      {success && (
        <Alert
          description={alertProfileText}
          type="success"
          showIcon
          closable
          onClose={() => setSuccess(false)}
          data-test-id={profileTestId.alertComponent}
          className={styles.alert}
        />
      )}
    </>
  );
};
