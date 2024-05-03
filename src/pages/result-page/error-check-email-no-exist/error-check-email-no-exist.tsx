import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import {
  errorCheckEmailNoExistButton,
  errorCheckEmailNoExistText,
  errorCheckEmailNoExistTitle,
  resultsPagesTestId,
} from '../../../constants';

import './error-check-email-no-exist.scss';

export const ErrorCheckEmailNoExist: React.FC = () => {
  const redirectBack = () => {
    history.back();
  };

  return (
    <section className="error-check-email-no-exist-wrapper">
      <div className="container">
        <div className="icon">
          <CloseCircleFilled />
        </div>
        <div className="text-wrapper">
          <h3>{errorCheckEmailNoExistTitle}</h3>
          <p>{errorCheckEmailNoExistText}</p>
        </div>
        <Button
          type="primary"
          data-test-id={resultsPagesTestId.resultErrorCheckEmailNoExist}
          onClick={redirectBack}>
          {errorCheckEmailNoExistButton}
        </Button>
      </div>
    </section>
  );
};
