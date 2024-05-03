export enum alertAction {
  CreateExercisesSuccessTrainingPage = 'NewExercisesSuccessTrainingPage',
  UpdateExercisesSuccessTrainingPage = 'UpdateExercisesSuccessTrainingPage',
}

export const alertText = {
  [alertAction.CreateExercisesSuccessTrainingPage]: 'Новая тренировка успешно добавлена',
  [alertAction.UpdateExercisesSuccessTrainingPage]: 'Тренировка успешно обновлена',
};
