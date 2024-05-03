import { useEffect, useState } from 'react';

import { Grid, Modal, Upload, UploadFile } from 'antd';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { RcFile, UploadProps } from 'antd/es/upload';

import { useAppSelector } from '../../../../hooks';
import { usePostUploadImageMutation } from '../../../../redux';

import { profileTestId } from '../../../../constants';

import {
  FileType,
  getBase64,
  showErrorModal,
  uploadButton,
  uploadMobileButton,
} from './utils/upload-image-utils';

import styles from './upload-img.module.scss';

type UploadImageType = {
  changeIsValidate: (isValidate: boolean) => void;
};

export const UploadImage: React.FC<UploadImageType> = ({ changeIsValidate }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { imgSrc } = useAppSelector((state) => state.user);

  const [postUploadImage] = usePostUploadImageMutation();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ((screens.sm && !screens.md) || screens.xs) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screens]);

  useEffect(() => {
    if (imgSrc) {
      setFileList([
        {
          uid: '1',
          name: isMobile ? '' : 'image.png',
          url: imgSrc,
          thumbUrl: imgSrc,
        },
      ]);
    }
  }, [imgSrc, isMobile]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadImage = async (options: RcCustomRequestOptions) => {
    const { file } = options;

    const formData = new FormData();
    formData.append('file', file);

    await postUploadImage(formData)
      .unwrap()
      .then((data) => {
        const dataImageUrl = `https://training-api.clevertec.ru${data.url}`;
        setFileList([
          {
            uid: (file as RcFile).uid,
            name: isMobile ? '' : (file as RcFile).name,
            url: dataImageUrl,
            thumbUrl: dataImageUrl,
          },
        ]);
        changeIsValidate(true);
      })
      .catch((err) => {
        if (err.status === 409) {
          showErrorModal();
        }
        setFileList([
          {
            uid: '-2',
            name: isMobile ? '' : 'image.png',
            status: 'error',
          },
        ]);
        changeIsValidate(false);
      });
  };

  return (
    <>
      <div
        className={styles.uploadImage}
        data-test-id={profileTestId.fieldAvatar}
        style={{ height: isMobile && fileList.length < 1 ? '40px' : '66px' }}>
        <Upload
          accept="image/*"
          listType={isMobile ? 'picture' : 'picture-card'}
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          customRequest={uploadImage}
          maxCount={1}
          progress={{
            strokeColor: {
              '0%': '#f5f5f5',
              '100%': '#2f54eb',
            },
            size: 4,
            showInfo: false,
            trailColor: '#2f54eb',
          }}>
          {fileList.length < 1 && (!isMobile ? uploadButton : uploadMobileButton)}
        </Upload>
      </div>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
