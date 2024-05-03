import { ReactNode, useEffect, useState } from 'react';

import { Button, Grid, Modal } from 'antd';

import { ActionResultCardComponent, FormFeedbackComponent } from '../../..';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  usePostFeedbackMutation,
  removeModal,
  changeFormValidate,
  removeAuthData,
  addModal,
  showLoader,
  hideLoader,
  history,
} from '../../../../redux';

import {
  PostFeedbackType,
  ModalWindowTypes,
  ROUTE_PATHS,
  ResultStatuses,
  feedbacksResults,
  reviewsTestId,
  settingsTestId,
  FeedbackFormText,
} from '../../../../constants';

import styles from './modal-window.module.scss';

export const ModalWindowComponent: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const dispatch = useAppDispatch();

  const { isOpen, type: typeModal, formValidate } = useAppSelector((state) => state.modal);

  const [postFeedback] = usePostFeedbackMutation();

  const [formFeedbackValue, setFormFeedbackValue] = useState<PostFeedbackType>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  const handleOk = () => {
    dispatch(removeModal());
    dispatch(changeFormValidate({ formValidate: true }));
  };

  const handleCancel = () => {
    dispatch(removeModal());
    if (typeModal === ModalWindowTypes.ChangeTariff) {
      localStorage.removeItem('token');
      dispatch(removeAuthData());
      history.replace(ROUTE_PATHS.routes.auth);
    } else {
      dispatch(changeFormValidate({ formValidate: true }));
    }
  };

  const showFeedbackForm = () => {
    dispatch(
      addModal({
        type: ModalWindowTypes.Feedback,
        isRepeat: true,
        repeatVal: formFeedbackValue,
      })
    );
  };

  const createModalButton = (
    modalKey: ResultStatuses | ModalWindowTypes
  ): ReactNode[] | ReactNode => {
    if (feedbacksResults[modalKey as ResultStatuses]) {
      const { btnTitle } = feedbacksResults[modalKey as ResultStatuses];
      const [titleBtn, closeBtn] = btnTitle;
      if (modalKey === 'error-server') {
        return (
          <Button
            type="primary"
            className="modal-button-server"
            onClick={() => history.push(ROUTE_PATHS.main)}>
            {titleBtn}
          </Button>
        );
      } else if (modalKey === ModalWindowTypes.ServerErrorExercise) {
        return (
          <Button
            type="primary"
            className="modal-button-server"
            onClick={() => dispatch(removeModal())}>
            {titleBtn}
          </Button>
        );
      } else if (modalKey === ModalWindowTypes.ChangeTariff) {
        return null;
      } else {
        if (btnTitle.length > 1) {
          return [
            <Button
              type="primary"
              key="feedback"
              data-test-id={reviewsTestId.errorModal}
              onClick={showFeedbackForm}
              className="modal-button-feedback">
              {titleBtn}
            </Button>,
            <Button key="back" className="modal-button-back" onClick={handleCancel}>
              {closeBtn}
            </Button>,
          ];
        } else {
          return [
            <Button type="primary" className="modal-button-good" key="good" onClick={handleOk}>
              {titleBtn}
            </Button>,
          ];
        }
      }
    }
  };

  const getValue = (val: PostFeedbackType) => {
    setFormFeedbackValue(val);
  };

  const postUserFeedback = async () => {
    if (!formFeedbackValue?.rating) {
      dispatch(changeFormValidate({ formValidate: true }));
    }

    if (formFeedbackValue && !formValidate) {
      dispatch(removeModal());
      dispatch(showLoader());
      await postFeedback(formFeedbackValue as PostFeedbackType)
        .unwrap()
        .then(() => {
          dispatch(hideLoader());
          dispatch(addModal({ type: ModalWindowTypes.Success }));
        })
        .catch(() => {
          dispatch(hideLoader());
          dispatch(addModal({ type: ModalWindowTypes.Error }));
        });
    }
  };

  const modalStyles = {
    mask: {
      backdropFilter: 'blur(12px)',
      backgroundColor: `rgba(121, 156, 213, ${
        typeModal === (ModalWindowTypes.Feedback || ModalWindowTypes.ServerErrorTrainingList)
          ? '0.1'
          : '0.5'
      })`,
    },
  };

  const [dataTestId, setDataTestId] = useState('');
  useEffect(() => {
    if (typeModal === ModalWindowTypes.ChangeTariff) {
      setDataTestId(settingsTestId.modalSuccess);
    }
  }, [typeModal]);

  return (
    <Modal
      open={isOpen}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      closable={
        typeModal === ModalWindowTypes.Feedback || typeModal === ModalWindowTypes.ChangeTariff
          ? true
          : false
      }
      title={typeModal === ModalWindowTypes.Feedback ? <h6>{FeedbackFormText.title}</h6> : null}
      footer={
        typeModal === ModalWindowTypes.Feedback ? (
          <Button
            type="primary"
            data-test-id={reviewsTestId.newFeedbackModal}
            onClick={postUserFeedback}
            disabled={formValidate}>
            {FeedbackFormText.button}
          </Button>
        ) : null
      }
      styles={modalStyles}
      width={isMobile ? '' : 540}
      className={styles.modalWrapper}
      data-test-id={dataTestId}>
      {typeModal === ModalWindowTypes.Feedback ? (
        <FormFeedbackComponent submitFeedback={getValue} />
      ) : (
        <ActionResultCardComponent extraBtn={createModalButton(typeModal)} />
      )}
    </Modal>
  );
};
