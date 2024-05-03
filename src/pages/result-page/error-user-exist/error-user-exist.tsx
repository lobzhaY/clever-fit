import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import {
  errorUserExistButton,
  errorUserExistText,
  errorUserExistTitle,
  resultsPagesTestId,
} from '../../../constants';

import './error-user-exist.scss';

export const ErrorUserExist: React.FC = () => {
  const redirectToRegister = () => {
    history.back();
  };

  return (
    <section className="error-user-exist-wrapper">
      <div className="container">
        <div className="icon">
          <CloseCircleFilled />
        </div>
        <div className="text-wrapper">
          <h3>{errorUserExistTitle}</h3>
          <p>{errorUserExistText}</p>
        </div>
        <Button
          type="primary"
          data-test-id={resultsPagesTestId.resultErrorUserExist}
          onClick={redirectToRegister}>
          {errorUserExistButton}
        </Button>
      </div>
    </section>
  );
};
