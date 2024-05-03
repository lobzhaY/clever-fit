import { Badge } from 'antd';

import { BadgeColors, StatisticListType } from '../../../../../constants';

import styles from './load-item.module.scss';
import { WeekDayDataType } from '../../types/achievements-types';
import { getColor, getName } from '../../utils/getLoad';

type LoadStatisticItemType = {
  elem: WeekDayDataType;
  index: number;
  type: StatisticListType;
};
export const LoadStatisticItemComponent: React.FC<LoadStatisticItemType> = ({
  elem,
  index,
  type,
}) => {
  return (
    <div className={styles.loadItemWrapper}>
      <Badge
        count={index + 1}
        style={{
          color: getColor(type, elem, BadgeColors.color),
        }}
        color={getColor(type, elem, BadgeColors.bgColor)}
        className={styles.badge}
      />
      <span className={styles.loadItemDays}>{elem.dayOfWeek}</span>
      <span className={styles.loadItemValues}>{getName(elem, type)}</span>
    </div>
  );
};
