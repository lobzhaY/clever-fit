import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import {
  ROUTE_PATHS,
  errorChangePasswordButton,
  errorChangePasswordText,
  errorChangePasswordTitle,
  resultsPagesTestId,
} from '../../../constants';

import './error-change-password.scss';

export const ErrorChangePassword: React.FC = () => {
  const [bodyState, setBodyState] = useState({});

  useEffect(() => {
    if (history.location.state) {
      setBodyState(history.location.state);
    }
  }, []);

  const redirectBack = () => {
    history.push(
      {
        pathname: ROUTE_PATHS.authOutlet.changePassword,
      },
      {
        ...bodyState,
      }
    );
  };

  return (
    <section className="error-change-password-wrapper">
      <div className="container">
        <div className="icon">
          <CloseCircleFilled />
        </div>
        <div className="text-wrapper">
          <h3>{errorChangePasswordTitle}</h3>
          <p>{errorChangePasswordText}</p>
        </div>
        <Button
          type="primary"
          data-test-id={resultsPagesTestId.resultErrorChangePassword}
          onClick={redirectBack}>
          {errorChangePasswordButton}
        </Button>
      </div>
    </section>
  );
};
