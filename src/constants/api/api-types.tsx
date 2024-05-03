export type AuthBodyType = {
  email: string;
  password: string;
};

export type ConfirmEmailBodyType = {
  email: string;
  code: string;
};

export type ChangePasswordBodyType = {
  password: string;
  confirmPassword?: string;
  ['password-repeat']?: string;
};

export type FeedbackType = {
  id: string;
  fullName: null | string;
  imageSrc: null | string;
  message: null | string;
  rating: number;
  createdAt: string;
};

export type PostFeedbackType = {
  message: string;
  rating: number;
};

export type GetExerciseType = {
  _id: string;
  name: string;
  date: string;
  isImplementation: boolean;
  userId: string;
  parameters: ExercisesParametersType;
  exercises: ExercisesType[];
};

export type PostPutExerciseType = {
  _id?: string;
  name: string;
  date: string;
  isImplementation?: boolean;
  parameters?: ExercisesParametersType;
  exercises: ExercisesType[];
};

export type ExercisesParametersType = {
  repeat: boolean;
  period: number;
  jointTraining: boolean;
  participants: string[];
};

export type ExercisesType = {
  _id?: string;
  name: string;
  replays: number;
  weight: number;
  approaches: number;
  isImplementation: boolean;
};

export type GetTrainingListType = TrainingListItemType[];

export type TrainingListItemType = {
  name: string;
  key: string;
};

export type PostTariffType = {
  tariffId: string;
  days: number;
};

export type GetTariffListType = TariffListItemType[];

export type TariffListItemType = {
  _id: string;
  name: string;
  periods: [
    {
      text: string;
      cost: number;
      days: number;
    }
  ];
};

export type UploadImageResponseAnswer = {
  name: string;
  url: string;
};

export type GetCurrentUserType = {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  imgSrc: string;
  readyForJointTraining: boolean;
  sendNotification: boolean;
  tariff: {
    tariffId: string;
    expired: string;
  };
};

export type PutCurrentUserBodyType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  imgSrc: string;
  readyForJointTraining: boolean;
  sendNotification: boolean;
};

export type GetAllInvite = GetInvite[];
export type GetInvite = {
  _id: string;
  from: {
    _id: string;
    firstName: null;
    lastName: null;
    imageSrc: null;
  };
  training: {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: {
      repeat: boolean;
      period: number;
      jointTraining: boolean;
      participants: string[];
    };
    exercises: [
      {
        _id: string;
        name: string;
        replays: number;
        weight: number;
        approaches: number;
        isImplementation: boolean;
      }
    ];
  };
  status: string;
  createdAt: string;
};

export type PostInvite = {
  to: string;
  trainingId: string;
};

export type PutInvite = {
  id: string;
  status: string;
};

export type GetAllPalsList = GetOnePals[];
export type GetOnePals = {
  id: string;
  name: string;
  trainingType: string;
  imageSrc: null;
  avgWeightInWeek: number;
  inviteId: string;
  status: string;
};

export enum TrainingStatus {
  Accepted = 'accepted',
  Pending = 'pending',
  Rejected = 'rejected',
}

export type GetUserJointTrainingList = GetUserJointList[];
export type GetUserJointList = {
  id: string;
  name: string;
  trainingType: string;
  imageSrc: null | string;
  avgWeightInWeek: number;
  status: null | string;
  inviteId: null | string;
};

export type GetUserList = GetUser[];
export type GetUser = {
  id: string;
  name: string;
};
