import { ModalWindowTypes } from '../../../../constants';

export const createSubtitle = (email: string) => {
  return (
    <div className="tariff-result-subtitle">
      Мы отправили инструкцию для оплаты вам на e-mail{' '}
      <span className="traffic-result-span">{email}</span>. После подтверждения оплаты войдите в
      приложение заново.
      <p>Не пришло письмо? Проверьте папку Спам.</p>
    </div>
  );
};

export const getPadding = (modalKey: ModalWindowTypes, isMobile: boolean): { padding: string } => {
  if (modalKey === ModalWindowTypes.ChangeTariff) {
    return { padding: '0' };
  }
  if (isMobile && modalKey === ModalWindowTypes.ServerErrorExercise) {
    return { padding: '32px 16px' };
  }
  return { padding: `${modalKey === ModalWindowTypes.Server ? '64px 32px 56px' : '64px 32px'}` };
};
