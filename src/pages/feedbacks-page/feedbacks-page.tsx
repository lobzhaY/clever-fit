import { useCallback, useEffect, useState } from 'react';

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useAppDispatch } from '../../hooks';
import { useLazyGetFeedbacksQuery, addModal, showLoader, hideLoader, history } from '../../redux';

import {
  BreadcrumbComponent,
  AllFeedbacksComponent,
  FeedBacksEmptyComponent,
} from '../../components';

import { FeedbackType, ModalWindowTypes, ROUTE_PATHS } from '../../constants';

import './feedbacks-page.scss';

type QueryResult = {
  data?: FeedbackType[];
  error?: { status: number };
};

const FeedbacksPage: React.FC = () => {
  const [getFeedbacks, { data: allFeedbacks }] = useLazyGetFeedbacksQuery();
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>();

  const dispatch = useAppDispatch();

  const handleError = useCallback(
    (data: QueryResult) => {
      if (data.error && data.error.status === 403) {
        localStorage.removeItem('token');
        history.replace(ROUTE_PATHS.routes.auth);
      } else if (data.error) {
        dispatch(addModal({ type: ModalWindowTypes.Server }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoader());

      await getFeedbacks({})
        .then((data) => handleError(data as QueryResult))
        .finally(() => dispatch(hideLoader()));
    };

    fetchData();
  }, [getFeedbacks, dispatch, handleError]);

  useEffect(() => {
    if (allFeedbacks) {
      setFeedbacks(allFeedbacks);
    }
  }, [allFeedbacks]);

  return (
    <Layout className="main-container">
      <BreadcrumbComponent />
      <Content className="feedback-content-container">
        {feedbacks ? (
          feedbacks.length > 0 ? (
            <AllFeedbacksComponent feedbacks={feedbacks} />
          ) : (
            <FeedBacksEmptyComponent />
          )
        ) : null}
      </Content>
    </Layout>
  );
};

export default FeedbacksPage;
