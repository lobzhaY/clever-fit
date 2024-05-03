import { Rule, RuleObject } from 'antd/es/form';
import { LoginComponent, RegistrationComponent } from '../../../components/pages/auth-page';

export const confirmEmailTitle = `Введите код для восстановления аккауанта`;
export const confirmEmailTitleError = `Неверный код. Введите код для восстановления аккауанта`;

export const confirmEmailTextInfo = `Не пришло письмо? Проверьте папку Спам.`;

export const changePasswordTitle = `Восстановление аккауанта`;
export const changePasswordInputHelp = `Пароль не менее 8 символов, с заглавной буквой и цифрой`;
export const changePasswordInputPlaceholder = 'Новый пароль';
export const changePasswordInputPlaceholderRepeat = 'Повторите пароль';
export const changePasswordButton = 'Сохранить';
export const changePasswordInputError = 'Пароли не совпадают';

export const authTabs = {
  label: {
    login: 'Вход',
    registration: 'Регистрация',
  },
  children: {
    login: <LoginComponent />,
    registration: <RegistrationComponent />,
  },
};

export const regAuth =
  /^(?=^.{8,}$)(?=(?:[^A-Z]*[A-Z]){1,}[^A-Z]*$)(?=(?:[^a-z]*[a-z]){1,}[^a-z]*$)(?=(?:\D*\d){1,}\D*$)[A-Za-z\d]+$/;

export const historyStateRedirect = { flowRedirectFrom: true };

export const authFormItemRules: Rule[] = [
  {
    type: 'email',
    message: '',
  },
  {
    required: true,
    message: '',
  },
];

export const requiredRule = {
  required: true,
  message: '',
};

type ResolveFunction = () => void;
type RejectFunction = () => void;

export const passwordAuthValidationRule = (
  resolveFn: ResolveFunction,
  rejectFu: RejectFunction
) => {
  return {
    message: changePasswordInputHelp,
    validator: (_: RuleObject, value: string) => {
      if (regAuth.test(value)) {
        return Promise.resolve(resolveFn());
      }
      return Promise.reject(rejectFu());
    },
  };
};

export const confirmAuthValidationRule = (resolveFn: ResolveFunction) => {
  return ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
    validator(_: RuleObject, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve(resolveFn());
      }
      return Promise.reject(new Error(changePasswordInputError));
    },
  });
};
