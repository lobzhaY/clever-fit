import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import {
  ROUTE_PATHS,
  resultsPagesTestId,
  successResultButton,
  successResultText,
  successResultTitle,
} from '../../../constants';

import './success.scss';

export const SuccessResult: React.FC = () => {
  const redirectToAuth = () => {
    history.push(ROUTE_PATHS.routes.auth);
  };

  return (
    <section className="success-result-wrapper">
      <div className="container">
        <div className="icon">
          <CheckCircleFilled />
        </div>
        <div className="text-wrapper">
          <h3>{successResultTitle}</h3>
          <p>{successResultText}</p>
        </div>
        <Button
          type="primary"
          data-test-id={resultsPagesTestId.resultSuccess}
          onClick={redirectToAuth}>
          {successResultButton}
        </Button>
      </div>
    </section>
  );
};
