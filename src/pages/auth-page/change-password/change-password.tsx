import { useCallback, useEffect, useState } from 'react';

import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import {
  usePostChangePasswordMutation,
  store,
  showLoader,
  hideLoader,
  history,
} from '../../../redux';

import {
  ChangePasswordBodyType,
  ROUTE_PATHS,
  changePasswordButton,
  changePasswordInputHelp,
  changePasswordInputPlaceholder,
  changePasswordInputPlaceholderRepeat,
  changePasswordTestId,
  changePasswordTitle,
  confirmAuthValidationRule,
  historyStateRedirect,
  passwordAuthValidationRule,
  requiredRule,
} from '../../../constants';

import './change-password.scss';

export const ChangePassword: React.FC = () => {
  const [isValidate, setIsValidate] = useState(false);
  const [form] = Form.useForm();
  const [userState, setUserState] = useState<ChangePasswordBodyType>();

  const [postChangePassword] = usePostChangePasswordMutation();

  const onFinish = useCallback(
    async (values?: ChangePasswordBodyType) => {
      const body: ChangePasswordBodyType = {
        password: '',
        confirmPassword: '',
      };

      if (values) {
        body.password = values.password;
        body.confirmPassword = values['password-repeat'];
      }
      if (userState?.password) {
        body.password = userState.password;
        body.confirmPassword = userState.confirmPassword;
      }

      store.dispatch(showLoader());

      await postChangePassword(body)
        .unwrap()
        .then(() => {
          store.dispatch(hideLoader());
          history.push(
            {
              pathname: ROUTE_PATHS.resultOutlet.successChangePassword,
            },
            historyStateRedirect
          );
        })
        .catch(() => {
          store.dispatch(hideLoader());
          history.push(
            {
              pathname: ROUTE_PATHS.resultOutlet.errorChangePassword,
            },
            {
              ...body,
              ...historyStateRedirect,
            }
          );
        });
    },
    [postChangePassword, userState?.confirmPassword, userState?.password]
  );

  useEffect(() => {
    if (history.location.state) {
      setUserState(history.location.state as ChangePasswordBodyType);
      onFinish();
    }
  }, [onFinish]);

  return (
    <section className="change-password-wrapper">
      <div className="change-password-container">
        <h3>{changePasswordTitle}</h3>
        <Form
          form={form}
          className="change-password-form"
          onFinish={onFinish}
          validateTrigger={['onChange']}>
          <Form.Item
            help={changePasswordInputHelp}
            name="password"
            className="change-password-form-item"
            rules={[
              requiredRule,
              passwordAuthValidationRule(
                () => setIsValidate(false),
                () => setIsValidate(true)
              ),
            ]}
            validateTrigger={['onChange']}>
            <Input.Password
              placeholder={changePasswordInputPlaceholder}
              data-test-id={changePasswordTestId.inputPassword}
            />
          </Form.Item>
          <Form.Item
            className="change-password-form-item"
            rules={[requiredRule, confirmAuthValidationRule(() => setIsValidate(false))]}
            name="password-repeat"
            dependencies={['password']}
            validateTrigger={['onChange']}>
            <Input.Password
              placeholder={changePasswordInputPlaceholderRepeat}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              data-test-id={changePasswordTestId.inputConfirmPassword}
            />
          </Form.Item>
          <Form.Item shouldUpdate className="change-buttons">
            {() => (
              <Button
                type="primary"
                className="change-password-button"
                htmlType="submit"
                disabled={
                  (isValidate && !form.isFieldsTouched(true)) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
                data-test-id={changePasswordTestId.buttonSubmit}>
                {changePasswordButton}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
