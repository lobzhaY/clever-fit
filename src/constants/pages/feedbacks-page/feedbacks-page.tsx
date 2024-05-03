import { ActionResultCardType } from '../../../components/ui/action-result-card/action-result-card';

export const feedBacksEmpty = {
    title: 'Оставьте свой отзыв первым',
    text: 'Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.  Поделитесь своим мнением и опытом с другими пользователями,  и помогите им сделать правильный выбор.',
    button: 'Написать отзыв',
};

export enum ModalWindowTypes {
    Success = 'success',
    ChangeTariff = 'change-tariff',
    Error = 'error',
    Server = 'error-server',
    ServerErrorExercise = 'error-server-exercise',
    ServerErrorTrainingList = 'error-server-training-list',
    Feedback = 'create-feedback',
    Null = ''
  }
  
  export type ResultStatuses =
    | ModalWindowTypes.Success
    | ModalWindowTypes.Error
    | ModalWindowTypes.Server
    | ModalWindowTypes.ServerErrorExercise
    | ModalWindowTypes.ChangeTariff;

export const feedbacksResults: Record<ResultStatuses, ActionResultCardType> = {
    success: {
        status: 'success',
        title: 'Отзыв успешно опубликован',
        btnTitle: ['Отлично'],
    },
    error: {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так. Попробуйте ещё раз.',
        btnTitle: ['Написать отзыв', 'Закрыть'],
    },
    'error-server': {
        status: '500',
        title: 'Что-то пошло не так',
        subTitle: 'Произошла ошибка, попробуйте ещё раз.',
        btnTitle: ['Назад'],
    },
    'error-server-exercise': {
        status: '500',
        title: 'Что-то пошло не так',
        subTitle: 'Произошла ошибка, попробуйте ещё раз.',
        btnTitle: ['Назад'],
    },
    'change-tariff': {
        status: '',
        title: 'Чек для оплаты у вас на почте',
        btnTitle: [''],
    },
};

export const FeedbackFormText = {
    title: 'Ваш отзыв',
    button: 'Опубликовать',
    placeholder: 'Расскажите, почему Вам понравилось наше приложение',
};
