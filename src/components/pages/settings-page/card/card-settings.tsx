import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import { TariffsText, tariffsCards, settingsTestId } from '../../../../constants';

import freeTariffImg from '../../../../assets/settings-page/free-tariff.png';
import proTariffImg from '../../../../assets/settings-page/pro-tariff.png';

import styles from './card-settings.module.scss';

type CardSettingsType = {
  cardsType: string;
  onOpenDrawer: (isOpen: boolean) => void;
  userTariff?: string;
  activeTariff?: string;
};

export const CardSettings: React.FC<CardSettingsType> = ({
  cardsType,
  onOpenDrawer,
  userTariff,
  activeTariff,
}) => {
  const getCardsContent = () => {
    if (cardsType === TariffsText.Free) {
      return (
        <p className={styles.tariffActive}>
          {tariffsCards.active} <CheckOutlined />
        </p>
      );
    } else {
      if (userTariff === TariffsText.Pro) {
        return (
          <div className={styles.activeText}>
            {' '}
            {tariffsCards.active} до {activeTariff}{' '}
          </div>
        );
      } else {
        return (
          <Button data-test-id={settingsTestId.buttonActiveTariff} className={styles.activeBtn}>
            {tariffsCards.setActiveBtn}
          </Button>
        );
      }
    }
  };

  return (
    <Card
      title={`${cardsType} ${TariffsText.Tariff}`}
      extra={
        <Button type="text" onClick={() => onOpenDrawer(true)} className={styles.extraBtn}>
          {tariffsCards.detailsBtn}
        </Button>
      }
      cover={
        <img
          alt={cardsType}
          src={cardsType === TariffsText.Free ? freeTariffImg : proTariffImg}
          className={
            !activeTariff && cardsType === TariffsText.Pro
              ? `${styles.coverImg} ${styles.disabledTariff}`
              : styles.coverImg
          }
        />
      }
      data-test-id={cardsType === TariffsText.Pro && settingsTestId.cardPorTariff}
      className={styles.card}>
      {getCardsContent()}
    </Card>
  );
};
