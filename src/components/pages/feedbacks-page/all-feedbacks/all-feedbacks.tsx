import { useState } from 'react';

import { Button, List } from 'antd';

import { UserFeedbackComponent } from '..';

import { useAppDispatch } from '../../../../hooks';
import { addModal } from '../../../../redux';

import { FeedbackType, ModalWindowTypes, reviewsTestId } from '../../../../constants';

import './all-feedbacks.scss';

type AllFeedbacksType = {
  feedbacks: FeedbackType[];
};

export const AllFeedbacksComponent: React.FC<AllFeedbacksType> = ({ feedbacks }) => {
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);

  const dispatch = useAppDispatch();

  const displayedFeedbacks = showAllFeedbacks ? feedbacks : feedbacks.slice(0, 4);

  const showForm = () => {
    dispatch(addModal({ type: ModalWindowTypes.Feedback }));
  };

  return (
    <section className="all-feedbacks-container">
      <div className="feedbacks-wrapper">
        <List
          dataSource={displayedFeedbacks}
          renderItem={(item: FeedbackType) => (
            <List.Item key={item.id}>
              <UserFeedbackComponent userFeedback={item} />
            </List.Item>
          )}
        />
      </div>
      <div className="buttons">
        <Button
          type="primary"
          data-test-id={reviewsTestId.reviewsPage.writeReview}
          onClick={showForm}
          className="button-primary">
          Написать отзыв
        </Button>
        {!showAllFeedbacks && feedbacks.length > 4 ? (
          <Button
            type="text"
            onClick={() => setShowAllFeedbacks(true)}
            data-test-id={reviewsTestId.reviewsPage.allReviewsButton}
            className="button-text">
            Развернуть все отзывы
          </Button>
        ) : (
          <Button type="text" className="button-text" onClick={() => setShowAllFeedbacks(false)}>
            Свернуть все отзывы
          </Button>
        )}
      </div>
    </section>
  );
};
