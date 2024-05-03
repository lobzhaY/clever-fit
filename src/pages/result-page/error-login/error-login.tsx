import { Button } from 'antd';
import { WarningFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import { errorLoginText, errorLoginTitle, resultsPagesTestId } from '../../../constants';

import './error-login.scss';

export const ErrorLogin: React.FC = () => {
  const redirectToAuth = () => {
    history.back();
  };

  return (
    <section className="error-login-wrapper">
      <div className="container">
        <div className="icon">
          <WarningFilled />
        </div>
        <div className="text-wrapper">
          <h3>{errorLoginTitle}</h3>
          <p>{errorLoginText}</p>
        </div>
        <Button
          type="primary"
          data-test-id={resultsPagesTestId.resultErrorLogin}
          onClick={redirectToAuth}>
          Повторить
        </Button>
      </div>
    </section>
  );
};
