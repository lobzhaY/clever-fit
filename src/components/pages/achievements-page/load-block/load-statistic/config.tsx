import { DateItemType } from '../../types/achievements-types';

import styles from './load-statistic.module.scss';

export const getWeekConfig = (isMobile: boolean, isTablet: boolean, loadData: DateItemType[]) => ({
  className: styles.columnWrapper,
  data: loadData,
  xField: 'date',
  yField: 'load',
  style: {
    maxWidth: 50,
    fill: '#85A5FF',
  },
  axis: {
    x: {
      tick: false,
      title: 'Нагрузка, кг',
      titleSpacing: isMobile ? 8 : 16,
      titlePosition: 'bottom',
      titleFontSize: isMobile ? 10 : 14,
      titleFontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      labelSpacing: isMobile ? 8 : 16,
      line: true,
      lineLineDash: [2, 4],
    },
    y: {
      fontSize: 1,
      labelSpacing: isMobile ? 6 : 16,
      tick: false,
      labelFormatter: (val: number) => `${val} кг`,
    },
    sizeField: (isMobile && 14) || (isTablet && 20) || 25,
  },
});

export const getMonthConfig = (isMobile: boolean, isTablet: boolean, loadData: DateItemType[]) => ({
  className: styles.columnWrapper,
  data: loadData,
  xField: 'date',
  yField: 'load',
  style: {
    width: 30,
    fill: '#85A5FF',
  },
  height: isMobile ? 240 : 374,
  scrollbar: {
    x: {
      ratio: isTablet ? 0.15 : 0.5,
    },
  },
  axis: {
    x: {
      tick: false,
      title: 'Нагрузка, кг',
      titleSpacing: isMobile ? 6 : 14,
      titlePosition: 'bottom',
      titleFontSize: isMobile ? 12 : 14,
      titleFontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      labelSpacing: isMobile ? 6 : 14,
      line: true,
      lineLineDash: [2, 4],
      labelAutoRotate: false,
      labelAutoHide: false,
      labelLineWidth: isMobile ? 14 : 15,
      label: {
        style: {
          textAlign: 'center',
          fontSize: isMobile ? 12 : 14,
        },
      },
    },
    y: {
      labelSpacing: isMobile ? 8 : 16,
      tick: false,
      labelFormatter: (val: number) => `${val} кг`,
    },
    sizeField: (isMobile && 16) || (isTablet && 20) || 25,
  },
});
