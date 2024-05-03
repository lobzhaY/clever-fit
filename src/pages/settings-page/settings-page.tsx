import { useEffect, useState } from 'react';

import { Button, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetTariffListQuery, addTariffList, addModal, history } from '../../redux';

import { BreadcrumbComponent, CardSettings, FormSettings, DrawerSettings } from '../../components';

import {
  ModalWindowTypes,
  ROUTE_PATHS,
  TariffsText,
  settingsButtons,
  settingsPageTitle,
} from '../../constants';

import { getActiveTariffDate } from './utils/settings-utils';

import styles from './settings-page.module.scss';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data } = useGetTariffListQuery({});

  const { tariff } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [userTariff, setUserTariff] = useState('');
  const [activeTariff, setActiveTariff] = useState('');

  useEffect(() => {
    if (data) {
      dispatch(addTariffList({ tariffList: data }));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (!tariff.tariffId && !tariff.expired) {
      setUserTariff(TariffsText.Free);
    } else {
      setUserTariff(TariffsText.Pro);
      setActiveTariff(getActiveTariffDate(tariff.expired));
    }
  }, [tariff]);

  const handleLookAllReview = () => {
    history.push(ROUTE_PATHS.feedBacks);
  };

  const handleWriteReview = () => {
    dispatch(addModal({ type: ModalWindowTypes.Feedback }));
  };

  return (
    <Layout className={styles.mainContainer}>
      <BreadcrumbComponent />
      <Content className={styles.settingsContentContainer}>
        <div className={styles.settingsBodyWrapper}>
          <div className={styles.settingsPageCardsWrapper}>
            <h4>{settingsPageTitle}</h4>
            <div className={styles.tariffsCardsContainer}>
              <CardSettings cardsType={TariffsText.Free} onOpenDrawer={setOpen} />
              <CardSettings
                cardsType={TariffsText.Pro}
                onOpenDrawer={setOpen}
                userTariff={userTariff}
                activeTariff={activeTariff}
              />
            </div>
          </div>
          <FormSettings userTariff={userTariff} />
          <div className={styles.settingsBtn}>
            <Button type="primary" onClick={handleWriteReview} className={styles.writeReview}>
              {settingsButtons.writeReview}
            </Button>
            <Button type="text" onClick={handleLookAllReview} className={styles.lookReview}>
              {settingsButtons.lookReview}
            </Button>
          </div>
        </div>
      </Content>
      <DrawerSettings
        openDrawer={open}
        onCloseDrawer={setOpen}
        userTariff={userTariff}
        activeTariff={activeTariff}
      />
    </Layout>
  );
};

export default SettingsPage;
