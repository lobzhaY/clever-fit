import { SmallCardComponent } from '../../pages/main-page/small-card/small-card';

import { Button } from 'antd';

import { history } from '../../../redux';

import { ROUTE_PATHS, reviewsTestId, smallCardType } from '../../../constants';

import './footer-component.scss';

export const FooterComponent: React.FC = () => {
  const handleRedirect = () => {
    history.push(ROUTE_PATHS.feedBacks);
  };

  return (
    <footer className="footer">
      <div className="footer__extra">
        <Button
          type="text"
          className="footer__button"
          onClick={handleRedirect}
          data-test-id={reviewsTestId.mainPage}>
          <p>Смотреть отзывы</p>
        </Button>
      </div>
      <SmallCardComponent itemType={smallCardType.footer} />
    </footer>
  );
};
