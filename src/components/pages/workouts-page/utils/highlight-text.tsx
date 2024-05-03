import { ReactNode } from 'react';

import { Typography } from 'antd';

import { userCard } from '../../../../constants';

const { Text } = Typography;

export const highlightText = (
  text: string,
  type: userCard,
  searchText: string | undefined,
  name: string
): ReactNode => {
  if (type !== userCard.Modal && searchText) {
    if (searchText.length === 0) {
      return name;
    }
    const regex = new RegExp(`(${searchText})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <Text mark key={index}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  }
  return text;
};
