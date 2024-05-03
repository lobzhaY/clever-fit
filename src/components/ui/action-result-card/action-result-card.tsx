import { ReactNode, useEffect, useState } from 'react';

import { Grid, Result, Typography } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { CheckCircleFilled } from '@ant-design/icons';

import { useAppSelector } from '../../../hooks';

import {
  ModalWindowTypes,
  feedbacksResults,
  ResultStatuses,
  calendarTestId,
} from '../../../constants';

import { createSubtitle, getPadding } from './utils/action-card-utils';

import './action-result-card.scss';

export type ActionResultCardType = {
  status: ResultStatusType;
  title: string;
  btnTitle: string[];
  subTitle?: string;
};

export type ActionButtonCardType = {
  extraBtn: ReactNode[] | ReactNode;
};

export const ActionResultCardComponent: React.FC<ActionButtonCardType> = ({ extraBtn }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { Title } = Typography;

  const { type: modalKey } = useAppSelector((state) => state.modal);
  const { email } = useAppSelector((state) => state.user);

  const [state, setState] = useState<{
    status: ResultStatusType;
    title: string;
    subTitle: string | JSX.Element;
  }>();
  const [dataTestId, setDataTestId] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  useEffect(() => {
    if (modalKey != ModalWindowTypes.Feedback) {
      const { status, title, subTitle } = feedbacksResults[modalKey as ResultStatuses];
      if (!subTitle && modalKey === ModalWindowTypes.ChangeTariff) {
        const newSubTitle = createSubtitle(email);
        setState({ status, title, subTitle: newSubTitle });
      } else {
        setState({ status, title, subTitle: subTitle || '' });
      }
    }
  }, [modalKey, email]);

  useEffect(() => {
    if (modalKey === ModalWindowTypes.ServerErrorExercise) {
      setDataTestId(calendarTestId.modalNoReview);
    }
  }, [modalKey]);

  return (
    <div
      className={
        modalKey === ModalWindowTypes.ChangeTariff
          ? 'action-result-card tariff-result'
          : 'action-result-card'
      }
      style={getPadding(modalKey, isMobile)}
      data-test-id={dataTestId}>
      <Result
        status={state?.status}
        title={<Title level={3}>{state?.title}</Title>}
        subTitle={state?.subTitle}
        extra={extraBtn}
        icon={
          modalKey === ModalWindowTypes.ChangeTariff ? (
            <CheckCircleFilled className="iconChangeTariff" />
          ) : (
            ''
          )
        }
      />
    </div>
  );
};
