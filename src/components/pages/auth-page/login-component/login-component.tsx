import { useCallback, useEffect, useState } from 'react';

import { Button, Checkbox, Form, Input } from 'antd';

import { AuthGoogleButtonComponent } from '../components';

import {
  addAuthData,
  hideLoader,
  history,
  showLoader,
  store,
  usePostAuthorizationMutation,
  usePostCheckEmailMutation,
} from '../../../../redux';

import {
  AuthBodyType,
  ROUTE_PATHS,
  authFormItemRules,
  historyStateRedirect,
  loginTestId,
  requiredRule,
} from '../../../../constants';

import './login-component.scss';

type LoginFormType = {
  email: string;
  password: string;
  remember?: boolean;
};

type StateFormType = {
  email: string;
};

export const LoginComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [userState, setUserState] = useState<StateFormType>({ email: '' });
  const [disabledField, setDisabledField] = useState(false);
  const submittable = true;

  const [postAuthorization] = usePostAuthorizationMutation();
  const [postCheckEmail] = usePostCheckEmailMutation();

  const postValueCheckEmail = useCallback(async () => {
    const emailFieldValue = form.getFieldValue('email');

    const body = {
      email: '',
    };

    if (emailFieldValue) {
      body.email = emailFieldValue;
    }
    if (userState.email) {
      body.email = userState.email;
    }

    store.dispatch(showLoader());
    await postCheckEmail(body)
      .unwrap()
      .then(() => {
        history.push({ pathname: ROUTE_PATHS.authOutlet.confirmEmail }, { ...body });
        store.dispatch(hideLoader());
      })
      .catch((error) => {
        store.dispatch(hideLoader());
        if (error.status === 404 && error.data.message === 'Email не найден') {
          history.push(
            {
              pathname: ROUTE_PATHS.resultOutlet.errorCheckEmailNoExist,
            },
            historyStateRedirect
          );
        } else {
          history.push(
            {
              pathname: ROUTE_PATHS.resultOutlet.errorCheckEmail,
            },
            {
              ...body,
              ...historyStateRedirect,
            }
          );
        }
      });
  }, [form, postCheckEmail, userState.email]);

  const checkEmail = useCallback(async () => {
    form
      .validateFields(['email'])
      .then(() => {
        setDisabledField(false);
        postValueCheckEmail();
      })
      .catch(() => {
        setDisabledField(true);
      });
  }, [form, setDisabledField, postValueCheckEmail]);

  useEffect(() => {
    if (history.location.state) {
      const { state } = history.location;
      setUserState({ email: (state as StateFormType).email });
      form.setFieldValue('email', (state as StateFormType).email);
      checkEmail();
    }
  }, [form, checkEmail]);

  const onFinish = async (values: LoginFormType) => {
    if (values.password.length >= 8) {
      const body: AuthBodyType = {
        email: values.email,
        password: values.password,
      };

      store.dispatch(showLoader());
      await postAuthorization(body)
        .unwrap()
        .then((data) => {
          if (values.remember) {
            localStorage.setItem('token', data.accessToken);
          }
          const storeData = {
            userEmail: values.email,
            userToken: data.accessToken,
          };
          store.dispatch(addAuthData(storeData));
          store.dispatch(hideLoader());
          history.push(ROUTE_PATHS.main);
        })
        .catch(() => {
          store.dispatch(hideLoader());
          history.push(
            {
              pathname: ROUTE_PATHS.resultOutlet.errorLogin,
            },
            historyStateRedirect
          );
        });
    }
  };

  const checkDisabledField = () => {
    form
      .validateFields(['email'])
      .then(() => {
        setDisabledField(false);
      })
      .catch(() => {
        setDisabledField(true);
      });
  };

  return (
    <div className="login-wrapper">
      <Form form={form} name="login" onFinish={onFinish} validateTrigger={['onChange']}>
        <div className="login-form">
          <Form.Item
            className="form-item-email"
            name="email"
            rules={authFormItemRules}
            validateTrigger={['onChange']}>
            <Input
              type="email"
              addonBefore={<div className="email-login">e-mail:</div>}
              data-test-id={loginTestId.inputLogin}
              onChange={checkDisabledField}
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="password"
            rules={[requiredRule]}
            validateTrigger={['onChange']}>
            <Input.Password data-test-id={loginTestId.inputPassword} />
          </Form.Item>

          <div className="item-remember">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              className="form-item-checked">
              <Checkbox data-test-id={loginTestId.checkBoxRemember}>Запомнить меня</Checkbox>
            </Form.Item>
            <Button
              type="text"
              className="link"
              data-test-id={loginTestId.buttonForgot}
              onClick={checkEmail}
              disabled={disabledField}>
              Забыли пароль?
            </Button>
          </div>
        </div>
        <div className="login-buttons">
          <Form.Item className="buttons-item submit" shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                data-test-id={loginTestId.buttonSubmit}
                disabled={
                  (!submittable && !form.isFieldsTouched(true)) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }>
                Log in
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
