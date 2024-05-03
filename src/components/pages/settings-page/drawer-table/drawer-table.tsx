import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { TariffsText, comparisonTariffsText } from '../../../../constants';

import styles from './drawer-table.module.scss';

type DrawerTableType = {
  activeTariff: string;
};

export const DrawerTable: React.FC<DrawerTableType> = ({ activeTariff }) => {
  const getDataSource = () => {
    const arr = Object.keys(comparisonTariffsText).map((elem, index) => {
      return {
        key: index,
        name: comparisonTariffsText[elem].title,
        [TariffsText.Free]: comparisonTariffsText[elem][TariffsText.Free] ? (
          <CheckCircleFilled />
        ) : (
          <CloseCircleOutlined />
        ),
        [TariffsText.Pro]: comparisonTariffsText[elem][TariffsText.Pro] ? (
          <CheckCircleFilled />
        ) : (
          <CloseCircleOutlined />
        ),
      };
    });

    return arr;
  };

  const dataSource = getDataSource();

  return (
    <>
      <div className={styles.drawerTable}>
        <div className={styles.headerRow}>
          <div className={styles.tariffItemFree}>{TariffsText.Free}</div>
          <div className={styles.tariffItemPro}>
            {TariffsText.Pro} {activeTariff === TariffsText.Pro && <CheckCircleOutlined />}
          </div>
        </div>
        <div className={styles.tableContent}>
          {dataSource.map((elem, index) => (
            <div key={elem.key} className={styles.tableItem}>
              <p className={styles.tableItemName}>{elem.name}</p>
              <div className={styles.flexTariff}>
                <span className={index == 0 || index == 2 ? '' : styles.ItemFree}>
                  {elem[TariffsText.Free]}
                </span>
                <span className={styles.itemPro}>{elem[TariffsText.Pro]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
