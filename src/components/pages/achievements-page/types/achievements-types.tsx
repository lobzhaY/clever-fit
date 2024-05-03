import { cardsIndex } from '../../../../constants';

export type FormattedDataType = {
  key: cardsIndex;
  title: string;
  value: number;
};

export type DataType = {
  [key: string]: DataItemType[];
};

export enum exercisesName {
  exercisesName = 'exercisesName',
  name = 'name',
}

export enum cardsIndexFormatted {
  totalLoad = 'totalLoad',
  approach = 'approaches',
  replays = 'replays',
}

export type DataItemType = {
  [cardsIndex.approach]: number;
  date: string;
  [exercisesName.exercisesName]: string[];
  load: number;
  name: string;
  [cardsIndex.replays]: number;
  [cardsIndex.totalLoad]: number;
};

export type WeekDayDataType = {
  date: string;
  dayOfWeek: string;
  load: number;
  numDayOfWeek: number;
  trainingName: string;
};

export type ExercisesDataType = {
  [key: string]: number;
};

export type FormattedExercisesType = {
  type: string;
  value: number;
};

export type DateItemType = {
  date: string;
  load: number;
};
