import { Button } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { BASE_URL, ENDPOINT_AUTH_GOOGLE } from '../../../../../constants';

export const AuthGoogleButtonComponent: React.FC = () => {
  const clickGoogleAuth = () => {
    window.location.href = `${BASE_URL}${ENDPOINT_AUTH_GOOGLE}`;
  };

  return (
    <Button className="google-button" onClick={clickGoogleAuth}>
      <GooglePlusOutlined className="span-icon" />
      <p>Регистрация через Google</p>
    </Button>
  );
};
