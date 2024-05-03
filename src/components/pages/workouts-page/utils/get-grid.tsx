export const getGrid = (size: string) => {
  let grid = { column: 4, gutter: 12 };
  switch (size) {
    case 'xs':
      grid = { column: 1, gutter: 12 };
      break;
    case 'sm':
      grid = { column: 2, gutter: 16 };
      break;
    default:
      grid = { column: 4, gutter: 12 };
      break;
  }
  return grid;
};
