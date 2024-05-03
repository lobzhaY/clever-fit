import { Modal } from 'antd';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

import {
  getJointTrainingTextAction,
  calendarTestId,
  errorTrainingModalTitle,
  errorTrainingListModalText,
} from '../../../../constants';

import './modal-server.scss';

type modalServerType = {
  isModalVisible: boolean;
  changeModalClose: (isClose: boolean) => void;
  getDataTrainingList: (type?: getJointTrainingTextAction) => Promise<void>;
};

export const ModalServer: React.FC<modalServerType> = ({
  isModalVisible,
  changeModalClose,
  getDataTrainingList,
}) => {
  const handleModalClose = () => {
    changeModalClose(false);
  };

  return (
    <Modal
      className="custom-modal"
      open={isModalVisible}
      onCancel={handleModalClose}
      onOk={() => getDataTrainingList()}
      centered
      okText="Обновить"
      closable
      closeIcon={<CloseOutlined data-test-id={calendarTestId.modalErrorUserTraining.buttonClose} />}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ 'data-test-id': calendarTestId.modalErrorUserTraining.button }}
      wrapClassName="confirm-modal"
      maskClosable>
      <>
        <CloseCircleOutlined />
        <div className="error-body-wrapper">
          <h6 data-test-id={calendarTestId.modalErrorUserTraining.title}>
            {errorTrainingModalTitle}
          </h6>
          <p data-test-id={calendarTestId.modalErrorUserTraining.subtitle}>
            {errorTrainingListModalText}
          </p>
        </div>
      </>
    </Modal>
  );
};
