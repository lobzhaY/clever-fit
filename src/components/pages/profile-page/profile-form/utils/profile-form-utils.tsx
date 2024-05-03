import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import { errorModalProfileRequest, passwordAuthValidationRule } from '../../../../../constants';

export const dateFormat = 'DD.MM.YYYY';

export const showErrorModal = () => {
  Modal.error({
    title: <h6>{errorModalProfileRequest.title}</h6>,
    content: <p>{errorModalProfileRequest.subtitle}</p>,
    okText: <span>{errorModalProfileRequest.btnText}</span>,
    className: 'error-modal',
    icon: <CloseCircleOutlined />,
  });
};

export type profileFormType = {
  birthday: undefined | string;
  confirm: undefined | string;
  email: undefined | string;
  firstName: undefined | string;
  lastName: undefined | string;
  password: undefined | string;
};

export const passwordRules = (
  passwordChanged: boolean,
  changeValidate: (isValidate: boolean) => void
) => [
  {
    required: passwordChanged,
    message: 'Please input your password!',
  },
  passwordAuthValidationRule(
    () => changeValidate(true),
    () => changeValidate(false)
  ),
];
