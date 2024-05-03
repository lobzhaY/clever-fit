import { LiteralUnion } from 'antd/es/_util/type';

import dayjs from 'dayjs';

export type CeilComponentType = {
  isOpen: boolean;
  closeModal: (isOpen: boolean) => void;
  listData: {
    trainingId: string | undefined;
    badge: {
      color: LiteralUnion<
        | 'blue'
        | 'purple'
        | 'cyan'
        | 'green'
        | 'magenta'
        | 'pink'
        | 'red'
        | 'orange'
        | 'yellow'
        | 'volcano'
        | 'geekblue'
        | 'lime'
        | 'gold'
      >;
      content: string;
    };
  }[];
  ceilDate: dayjs.Dayjs;
  screenSize: boolean;
};
