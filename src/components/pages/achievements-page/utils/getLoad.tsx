import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';

import {
  BadgeColors,
  ExercisesType,
  PeriodRange,
  PostPutExerciseType,
  StatisticListType,
  TrainingListTagsText,
  cardsIndex,
  colorsBadge,
  daysDiffNums,
} from '../../../../constants';

import {
  DataItemType,
  DataType,
  ExercisesDataType,
  WeekDayDataType,
  cardsIndexFormatted,
  exercisesName,
} from '../types/achievements-types';

export const getLoad = (
  period: PeriodRange,
  userExercises: PostPutExerciseType[],
  selectedTags: TrainingListTagsText
) => {
  const userExercisesFromPeriod = getUserExercisesFromPeriod(period, userExercises);

  const exercises = userExercisesFromPeriod.map((elem) => {
    if (typeof elem === 'string') {
      return [
        {
          date: elem,
          name: '',
          exercisesName: [],
          load: 0,
          totalLoad: 0,
          replays: 0,
          approach: 0,
        },
      ];
    }
    const itemArr = (elem as PostPutExerciseType[]).map((item) => ({
      date: item.date,
      name: item.name,
      exercisesName: getExercisesName(item.exercises),
      load: getLoadExercises(item.exercises) / item.exercises.length,
      totalLoad: getLoadExercises(item.exercises),
      replays: getSum(item.exercises, cardsIndexFormatted.replays),
      approach: getSum(item.exercises, cardsIndexFormatted.approach),
    }));
    return itemArr;
  });

  const arrExercisesByDay = exercises.reduce((elem: DataType, curr: DataItemType[]) => {
    if (elem[curr[0].date]) {
      elem[curr[0].date].push(...curr);
    } else {
      elem[curr[0].date] = [...curr];
    }
    return elem;
  }, {});

  if (selectedTags === TrainingListTagsText.All) {
    return arrExercisesByDay;
  }

  const arrEntries = Object.entries(arrExercisesByDay);

  const arrExercisesByName = arrEntries.reduce((acc: DataType, curr) => {
    const filteredArr = curr[1].filter((elem) => elem.name === selectedTags);
    if (acc[curr[0]]) {
      acc[curr[0]].push(...filteredArr);
    } else {
      acc[curr[0]] = [...filteredArr];
    }
    return acc;
  }, {});

  return arrExercisesByName;
};

const getUserExercisesFromPeriod = (period: PeriodRange, userExercises: PostPutExerciseType[]) => {
  dayjs.extend(duration);
  dayjs.extend(isoWeek);
  dayjs.extend(isBetween);

  const dates: (Date | string)[] = [];

  const current = dayjs();

  const endOfWeek = period === PeriodRange.Week ? current : current.endOf('isoWeek');

  const startOfWeek = endOfWeek.subtract(daysDiffNums[period], 'day');

  const exercises = userExercises.filter((elem: PostPutExerciseType) => {
    return dayjs(elem.date).isBetween(startOfWeek, endOfWeek, 'day', '[]');
  });

  const days = endOfWeek.diff(startOfWeek, 'day');

  for (let i = 0; i <= days; i++) {
    const date = startOfWeek.add(i, 'day');
    dates.push(date.toISOString());
  }

  const newArr = dates.map((elem) => {
    const newElem = exercises.filter((item) => dayjs(item.date).isSame(dayjs(elem), 'day'));
    return newElem.length ? newElem : elem;
  });

  return newArr;
};

const getLoadExercises = (exercises: ExercisesType[]) => {
  const reduceExercises = exercises.reduce((acc, { replays, approaches, weight }) => {
    return (acc += replays * approaches * weight);
  }, 0);

  return reduceExercises;
};

export const getSum = (
  exercises: (DataItemType | ExercisesType)[],
  nameField: cardsIndex | cardsIndexFormatted | string
) => {
  return exercises.reduce((acc, curr: DataItemType | ExercisesType) => (acc += curr[nameField]), 0);
};

export const findSum = (arr: number[]) => {
  return arr.reduce((acc, curr) => (acc += curr), 0);
};

export const groupExercisesValues = (data: DataType, nameField: cardsIndex) => {
  const objKeys = Object.keys(data);
  const valuesArr = objKeys.map((elem) => {
    return getSum(data[elem], nameField);
  });
  return valuesArr;
};

export const getExercisesName = (data: ExercisesType[]) => {
  return data.map((elem) => elem.name);
};

export const getExercisesTrainingsName = (data: WeekDayDataType[]) => {
  return data.map((elem) => elem.trainingName);
};

export const findPercent = (dataLength: number, exercisesCount: number) => {
  return Math.floor((100 * exercisesCount) / dataLength);
};

export const getMaxField = (elementCount: ExercisesDataType) => {
  return Object.entries(elementCount).reduce(
    (acc, [key, value]) => {
      if (value > acc.value) {
        acc.key = key;
        acc.value = value;
      }
      return acc;
    },
    { key: '', value: -Infinity }
  );
};

export const getArrOfValues = (objVal: DataItemType[][], nameField: exercisesName) => {
  return objVal
    .map((elem) => {
      return elem.map((item) => item[nameField]);
    })
    .flat();
};

export const getCount = (values: (string | string[])[]) => {
  return values.flat().reduce((acc: ExercisesDataType, curr: string) => {
    if (curr.length) {
      acc[curr] = (acc[curr] || 0) + 1;
    }
    return acc;
  }, {});
};

export const formatMonthDate = (data: WeekDayDataType[]): WeekDayDataType[][] => {
  const newData = [...data];
  const weeks = [];
  while (newData.length > 0) {
    weeks.push(newData.splice(0, 7));
  }
  return weeks;
};

export const getName = (item: WeekDayDataType, type: StatisticListType) => {
  if (type === StatisticListType.Load) {
    return item.trainingName ? `${item.load} кг` : '';
  }
  return item.trainingName;
};

export const getColor = (
  type: StatisticListType,
  item: WeekDayDataType,
  colorType: BadgeColors.bgColor | BadgeColors.color
) => {
  let hasElem: BadgeColors.hasElem | BadgeColors.missingElem;
  if (item.load > 0 && !!item.trainingName.length && type === StatisticListType.Load) {
    hasElem = item.load === 0 ? BadgeColors.missingElem : BadgeColors.hasElem;
  } else {
    hasElem = item.trainingName.length ? BadgeColors.hasElem : BadgeColors.missingElem;
  }

  if (colorsBadge[type] && colorsBadge[type][hasElem]) {
    const colorData = colorsBadge[type][hasElem];
    return colorData[colorType];
  }
};

export const formattedMonthValuesByDate = (dataArr: WeekDayDataType[]) => {
  return dataArr.reduce((acc: { [key: string]: WeekDayDataType[] }, curr: WeekDayDataType) => {
    const { dayOfWeek } = curr;
    if (!acc[dayOfWeek]) {
      acc[dayOfWeek] = [];
    }
    acc[dayOfWeek].push(curr);
    return acc;
  }, {});
};

export const formattedMonthValuesExercises = (
  objKeys: string[],
  groupData: { [key: string]: WeekDayDataType[] }
) => {
  return objKeys.map((elem) => {
    const item = groupData[elem];
    const trainingsNames = getExercisesTrainingsName(item);
    const trainingsCounts = getCount(trainingsNames);

    return {
      date: item[0].date,
      dayOfWeek: item[0].dayOfWeek,
      load: item[0].load,
      numDayOfWeek: item[0].numDayOfWeek,
      trainingName: getMaxField(trainingsCounts).key,
    };
  });
};
