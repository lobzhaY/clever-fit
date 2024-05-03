import { Avatar, Rate } from 'antd';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';

import { FeedbackType } from '../../../../constants';

import './user-feedback.scss';

type UserFeedbackType = {
  userFeedback: FeedbackType;
};

export const UserFeedbackComponent: React.FC<UserFeedbackType> = ({ userFeedback }) => {
  const { imageSrc, fullName, rating, message, createdAt } = userFeedback;

  const refactorDate = (feedbackDate: string): string => {
    const date = new Date(feedbackDate);
    const formatDate: string = date.toLocaleDateString().replace(/\//g, '.');
    return formatDate;
  };

  return (
    <section className="user-feedback">
      <div className="content-author">
        <div className="author-avatar">
          <Avatar size={42} src={imageSrc || null} icon={imageSrc ? null : <UserOutlined />} />
        </div>
        <div className="author-name">
          <h6>{fullName || 'Пользователь'}</h6>
        </div>
      </div>

      <div className="content-comment">
        <div className="info">
          <Rate
            value={rating}
            disabled
            character={({ index = 0 }) => (index < rating ? <StarFilled /> : <StarOutlined />)}
          />
          <span className="date">{refactorDate(createdAt)}</span>
        </div>
        <div className="comment">{message || ''}</div>
      </div>
    </section>
  );
};
