import { Button } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import { useAppDispatch } from '../../../../hooks';
import { addNavData } from '../../../../redux';

import { NavButtonWrapperComponent } from '..';

import { ICardsActionArr, cardsActionTitleBtn, smallCardType } from '../../../../constants';

import './small-card.scss';

type SmallCardPropsType = {
  itemType: string;
  itemSmallCard?: ICardsActionArr;
  testId?: string;
};

export const SmallCardComponent: React.FC<SmallCardPropsType> = ({
  itemType,
  itemSmallCard,
  testId,
}) => {
  const dispatch = useAppDispatch();

  const getHandleButton = () => {
    if (itemSmallCard?.textButton === cardsActionTitleBtn.calendar) {
      dispatch(addNavData({ typeNav: cardsActionTitleBtn.calendar }));
    }
    if (itemSmallCard?.textButton === cardsActionTitleBtn.profile) {
      dispatch(addNavData({ typeNav: cardsActionTitleBtn.profile }));
    }
    if (itemSmallCard?.textButton === cardsActionTitleBtn.exercise) {
      dispatch(addNavData({ typeNav: cardsActionTitleBtn.exercise }));
    }
  };

  return (
    <>
      {itemType === smallCardType.footer ? (
        <>
          <div className="footer-card small-card">
            <div className="small-card__header">
              <a href="#" className="footer-card__link">
                Скачать на телефон
              </a>
              <p>Доступно в PRO-тарифе</p>
            </div>
            <div className="footer-card__actions-wrapper">
              <div className="footer-card__action">
                <Button type="text" shape="default" size="middle" className="button-action-wrapper">
                  <AndroidFilled className="button-action__icon" />
                  <p>Android OS</p>
                </Button>
              </div>
              <div className="footer-card__action">
                <Button type="text" shape="default" size="middle" className="button-action-wrapper">
                  <AppleFilled className="button-action__icon" />
                  <p>Apple iOS</p>
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="footer-card small-card small-card__adaptive">
            <div className="small-card__header-main">
              <p>{itemSmallCard?.title}</p>
            </div>
            <div className="small-card__main-actions-wrapper">
              <NavButtonWrapperComponent>
                <Button
                  type="link"
                  shape="default"
                  size="middle"
                  className="button-action-wrapper-small"
                  onClick={getHandleButton}
                  data-test-id={testId}>
                  {itemSmallCard?.icon}
                  <p>{itemSmallCard?.textButton}</p>
                </Button>
              </NavButtonWrapperComponent>
            </div>
          </div>
        </>
      )}
    </>
  );
};
