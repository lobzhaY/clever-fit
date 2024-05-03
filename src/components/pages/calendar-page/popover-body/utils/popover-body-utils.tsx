import { Modal, ModalFuncProps } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import { calendarTestId } from '../../../../../constants';

const { confirm } = Modal;

export type ModalConfirmType = {
  destroy: () => void;
  update?: (
    configUpdate: ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)
  ) => void;
};

export const showDeleteConfirm = (handleCloseModal: () => void) => {
  return confirm({
    title: (
      <h6 data-test-id={calendarTestId.modalErrorUserTraining.title}>
        При сохранении данных произошла ошибка
      </h6>
    ),
    centered: true,
    icon: <CloseCircleOutlined data-test-id={calendarTestId.modalErrorUserTraining.buttonClose} />,
    content: (
      <p data-test-id={calendarTestId.modalErrorUserTraining.subtitle}>
        Придётся попробовать ещё раз
      </p>
    ),
    cancelText: 'Закрыть',
    closable: false,
    okButtonProps: { style: { display: 'none' } },
    cancelButtonProps: { 'data-test-id': calendarTestId.modalErrorUserTraining.button },
    wrapClassName: 'confirm-modal-err',
    onCancel() {
      handleCloseModal();
    },
  });
};
