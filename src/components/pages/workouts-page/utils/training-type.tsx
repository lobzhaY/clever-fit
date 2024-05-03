import {
  ExercisesType,
  PostPutExerciseType,
  TrainingListItemType,
  GetUserJointTrainingList,
  TrainingStatus,
} from '../../../../constants';

type GroupedByName = {
  [key: string]: ExercisesType[];
};

export const getQueryTrainingType = (
  trainingArr: PostPutExerciseType[],
  trainingList: TrainingListItemType[]
): string => {
  const groupedByName: GroupedByName = trainingArr.reduce((acc: GroupedByName, curr) => {
    if (acc[curr.name]) {
      acc[curr.name].push(...curr.exercises);
    } else {
      acc[curr.name] = [...curr.exercises];
    }
    return acc;
  }, {});

  const loadByName = trainingList.map((item) => {
    if (groupedByName[item.name]) {
      const arr = groupedByName[item.name].map((elem) => {
        const { approaches, replays, weight } = elem;
        return approaches * replays * weight;
      });
      return { name: item.name, exercises: arr };
    }
    return;
  });

  const totalLoadByName = loadByName.map((elem) => {
    if (elem) {
      const elemExercises = elem.exercises.reduce((acc, curr) => {
        return (acc += curr);
      }, 0);
      return {
        name: elem.name,
        sum: elemExercises,
      };
    } else {
      return;
    }
  });

  const filteredData = totalLoadByName.filter((obj) => obj && obj.sum !== undefined);

  const maxObject = filteredData.reduce((max, obj) => {
    if (max && obj) {
      return obj.sum > max.sum ? obj : max;
    }
  });

  const maxName = trainingList.filter((elem) => elem.name === maxObject?.name)[0].key;
  return maxName;
};

export const getSortedData = (data: GetUserJointTrainingList) => {
  const sortedData = data.sort((a, b) => {
    if (a.status === TrainingStatus.Accepted && b.status !== TrainingStatus.Accepted) return -1;
    if (a.status !== TrainingStatus.Accepted && b.status === TrainingStatus.Accepted) return 1;
    return a.name.localeCompare(b.name);
  });

  return sortedData;
};
