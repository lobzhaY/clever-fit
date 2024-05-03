import { GetProp, Modal, UploadProps } from 'antd';
import { CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { uploadText, errorModalProfile, profileTestId } from '../../../../../constants';

import styles from '../upload-img.module.scss';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type="button">
    <PlusOutlined />
    {uploadText}
  </button>
);

export const uploadMobileButton = (
  <div className={styles.mobileUploadButton}>
    <span>{uploadText}</span>
    <button type="button">
      <UploadOutlined />
      Загрузить
    </button>
  </div>
);

export const showErrorModal = () => {
  Modal.error({
    title: <h6>{errorModalProfile.title}</h6>,
    content: <p>{errorModalProfile.subtitle}</p>,
    okText: <span>{errorModalProfile.btnText}</span>,
    okButtonProps: { 'data-test-id': profileTestId.buttonErrorClose },
    className: 'error-modal',
    icon: <CloseCircleOutlined />,
  });
};

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
