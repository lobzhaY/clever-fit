import { Button, Popover } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import {
  PostPutExerciseType,
  TrainingListKeys,
  getColorStatusBadge,
} from '../../../../../constants';

import styles from './popover-component.module.scss';

type popoverInviteType = {
  open: boolean;
  isOpenCeil: string;
  text: PostPutExerciseType;
  setOpen: (open: (prevState: boolean) => boolean | boolean) => void;
  setIsOpenCeil: (isOpenCeil: string) => void;
};

export const PopoverInviteComponent: React.FC<popoverInviteType> = ({
  open,
  isOpenCeil,
  setOpen,
  setIsOpenCeil,
  text,
}) => {
  const handleTogglePopover = (id: string) => {
    setOpen((prevState: boolean) => !prevState);
    setIsOpenCeil(id);
  };
  return (
    <Popover
      placement="bottomLeft"
      arrow={false}
      trigger="click"
      open={open && isOpenCeil === text._id}
      onOpenChange={() => handleTogglePopover(text._id as string)}
      overlayInnerStyle={{
        display: 'flex',
        flexDirection: 'column',
        width: '312px',
        minHeight: '134px',
      }}
      title={
        <div
          className={styles.popoverTitle}
          style={{
            borderBottom: `1px solid ${getColorStatusBadge(text.name as TrainingListKeys).color}`,
          }}>
          <Button onClick={() => handleTogglePopover(text._id as string)}>
            <ArrowLeftOutlined />
          </Button>{' '}
          <p>{text.name}</p>
        </div>
      }
      content={
        <div>
          <div className={styles.popoverContent}>
            {text.exercises.map((elem) => (
              <span>{elem.name}</span>
            ))}
          </div>
          <div className={styles.popoverAction}>
            <Button>Добавить упражнение</Button>
          </div>
        </div>
      }></Popover>
  );
};
