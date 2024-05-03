import { FormattedExercisesType } from '../types/achievements-types';

import styles from './common-exercises-block.module.scss';

export const getConfig = (dataExercises: FormattedExercisesType[], isMobile: boolean) => ({
  className: styles.commonBlockWrapper,
  data: dataExercises,
  angleField: 'value',
  colorField: 'type',
  innerRadius: 0.7,
  interaction: {
    elementHighlight: true,
  },
  state: {
    inactive: { opacity: 0.8 },
  },
  margin: 90,
  label: {
    text: isMobile ? ({ type }: { type: string }) => type.split(' ').join('\n') : 'type',
    position: 'outside',
    connector: false,
    style: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#262626',
    },
  },
  tooltip: false,
  legend: false,
  height: 340,
  width: 520,
  style: {
    fontWeight: 'bold',
  },
  scale: { color: { palette: 'set1' } },
  theme: 'classic',
});
