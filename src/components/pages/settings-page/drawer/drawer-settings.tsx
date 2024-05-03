import { useEffect, useState } from 'react';

import { Button, Drawer, Grid, Radio, RadioChangeEvent, Space } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { addModal, usePostTariffMutation } from '../../../../redux';

import { DrawerTable } from '../drawer-table/drawer-table';

import {
  ModalWindowTypes,
  settingsTestId,
  drawerText,
  TariffsText,
  drawerBtn,
  tariffsCards,
  drawerTitleCoast,
} from '../../../../constants';

import { PeriodsType, transformCost } from '../../../../pages';

import styles from './drawer-settings.module.scss';

type DrawerSettingsType = {
  openDrawer: boolean;
  onCloseDrawer: (isOpen: boolean) => void;
  userTariff: string;
  activeTariff: string;
};

export const DrawerSettings: React.FC<DrawerSettingsType> = ({
  openDrawer,
  onCloseDrawer,
  userTariff,
  activeTariff,
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const dispatch = useAppDispatch();
  const { tariffList } = useAppSelector((state) => state.settings);

  const [postTariff] = usePostTariffMutation({});

  const [disabledButton, setDisabledButton] = useState(true);
  const [tariffsAll, setTariffsAll] = useState<PeriodsType[]>();
  const [value, setValue] = useState<number>(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  useEffect(() => {
    if (tariffList.length !== 0) {
      const { periods } = tariffList[0];
      setTariffsAll(periods);
    }
  }, [tariffList]);

  const handleChangeTariff = async () => {
    const { _id } = tariffList[0];

    await postTariff({
      tariffId: _id,
      days: value as number,
    })
      .unwrap()
      .then(() => {
        dispatch(addModal({ type: ModalWindowTypes.ChangeTariff }));
        onCloseDrawer(false);
      });
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    setDisabledButton(false);
  };

  return (
    <Drawer
      className={styles.drawer}
      data-test-id={settingsTestId.sider}
      destroyOnClose={true}
      title={<h6 className={styles.drawerTitle}>{drawerText}</h6>}
      onClose={() => onCloseDrawer(false)}
      open={openDrawer}
      mask={false}
      footer={
        userTariff === TariffsText.Free && (
          <Button
            type="primary"
            disabled={disabledButton}
            onClick={handleChangeTariff}
            data-test-id={settingsTestId.tariffSubmit}
            className={styles.drawerBtn}>
            {drawerBtn}
          </Button>
        )
      }
      width={isMobile ? '360px' : '408px'}>
      <div className={styles.drawerBody}>
        {userTariff === TariffsText.Pro && (
          <div className={styles.drawerActivePro}>
            <p>
              Ваш {TariffsText.Pro} {TariffsText.Tariff} {tariffsCards.active} до {activeTariff}
            </p>
          </div>
        )}
        <DrawerTable activeTariff={userTariff} />
        {userTariff === TariffsText.Free && (
          <div data-test-id={settingsTestId.blockCost} className={styles.blockCost}>
            <h6>{drawerTitleCoast}</h6>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical" className={styles.radioSpace}>
                {tariffsAll &&
                  tariffsAll.map((elem, index) => (
                    <div key={index} className={styles.radioItem}>
                      <Radio value={elem.days} data-test-id={`tariff-${elem.cost}`}>
                        {' '}
                        <div className={styles.radioLabel}>
                          <span>{elem.text}</span> <h6>{transformCost(elem.cost)}</h6>
                        </div>
                      </Radio>
                    </div>
                  ))}
              </Space>
            </Radio.Group>
          </div>
        )}
      </div>
    </Drawer>
  );
};
