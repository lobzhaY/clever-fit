import { useCallback, useEffect, useState } from 'react';

import { Button, Form, Input } from 'antd';

import { AuthGoogleButtonComponent } from '../components';

import {
  hideLoader,
  history,
  showLoader,
  store,
  usePostRegistrationMutation,
} from '../../../../redux';

import {
  AuthBodyType,
  ROUTE_PATHS,
  historyStateRedirect,
  authFormItemRules,
  registrationTestId,
  requiredRule,
  passwordAuthValidationRule,
  changePasswordInputHelp,
  confirmAuthValidationRule,
} from '../../../../constants';

import './registration-component.scss';

type RegistrationFormType = {
  confirm: string;
  email: string;
  password: string;
};

export const RegistrationComponent: React.FC = () => {
  const [form] = Form.useForm();

  const [isValidate, setIsValidate] = useState<boolean>(false);

  const [postRegistration] = usePostRegistrationMutation();

  const onFinish = useCallback(
    async (values: RegistrationFormType) => {
      const body: AuthBodyType = {
        email: values.email,
        password: values.password,
      };

      store.dispatch(showLoader());

      await postRegistration(body)
        .unwrap()
        .then(() => {
          store.dispatch(hideLoader());
          history.push(
            {
              pathname: ROUTE_PATHS.resultOutlet.success,
            },
            historyStateRedirect
          );
        })
        .catch((error) => {
          store.dispatch(hideLoader());
          if (error.status === 409) {
            history.push(
              {
                pathname: ROUTE_PATHS.resultOutlet.errorUserExist,
              },
              historyStateRedirect
            );
          } else {
            history.push(
              {
                pathname: ROUTE_PATHS.resultOutlet.error,
              },
              {
                ...body,
                ...historyStateRedirect,
              }
            );
          }
        });
    },
    [postRegistration]
  );

  useEffect(() => {
    if (history.location.state) {
      onFinish(history.location.state as RegistrationFormType);
    }
  }, [onFinish]);

  return (
    <div className="registration-wrapper">
      <Form form={form} name="register" onFinish={onFinish} validateTrigger={['onChange']}>
        <div className="registration-form">
          <Form.Item
            className="form-item-email"
            name="email"
            rules={authFormItemRules}
            validateTrigger={['onChange']}>
            <Input
              type="email"
              addonBefore={<div className="email-registration">e-mail:</div>}
              data-test-id={registrationTestId.inputLogin}
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="password"
            rules={[
              requiredRule,
              passwordAuthValidationRule(
                () => setIsValidate(false),
                () => setIsValidate(true)
              ),
            ]}
            help={changePasswordInputHelp}
            validateTrigger={['onChange']}>
            <Input.Password data-test-id={registrationTestId.inputPassword} />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="confirm"
            dependencies={['password']}
            rules={[requiredRule, confirmAuthValidationRule(() => setIsValidate(false))]}
            validateTrigger={['onChange']}>
            <Input.Password data-test-id={registrationTestId.inputConfirmPassword} />
          </Form.Item>
        </div>

        <div className="registration-buttons">
          <Form.Item shouldUpdate className="buttons-item submit">
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                data-test-id={registrationTestId.buttonSubmit}
                disabled={
                  (isValidate && !form.isFieldsTouched(true)) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }>
                Войти
              </Button>
            )}
          </Form.Item>
          <Form.Item className="buttons-item google">
            <AuthGoogleButtonComponent />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
