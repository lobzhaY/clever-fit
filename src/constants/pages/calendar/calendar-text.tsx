export const errorTrainingListModalText = 'Попробуйте ещё раз.';
export const errorTrainingModalTitle = 'При открытии данных произошла ошибка';

export enum TrainingListText {
  Legs = 'Ноги',
  Hands = 'Руки',
  Strength = 'Силовая',
  Back = 'Спина',
  Chest = 'Грудь',
  Null = 'Выбор типа тренировки',
}

export enum DrawerType {
  Create = 'Create',
  UpdateFuture = 'UpdateFuture',
  ModalCreate = 'ModalCreate',
  ModalUpdate = 'ModalUpdate',
  InviteCreate = 'InviteCreate',
}

export type TrainingListKeys =
  | TrainingListText.Legs
  | TrainingListText.Hands
  | TrainingListText.Strength
  | TrainingListText.Back
  | TrainingListText.Chest;

export const colorStatusBadge: Record<TrainingListKeys, { color: string; content: string }> = {
  [TrainingListText.Legs]: { color: 'red', content: TrainingListText.Legs },
  [TrainingListText.Hands]: { color: 'cyan', content: TrainingListText.Hands },
  [TrainingListText.Strength]: { color: 'yellow', content: TrainingListText.Strength },
  [TrainingListText.Back]: { color: 'orange', content: TrainingListText.Back },
  [TrainingListText.Chest]: { color: 'green', content: TrainingListText.Chest },
};

export const getColorStatusBadge = (name: TrainingListKeys) => {
  return colorStatusBadge[name];
};

export enum popoverPositionText {
  Left = 'bottomLeft',
  Right = 'bottom',
}
