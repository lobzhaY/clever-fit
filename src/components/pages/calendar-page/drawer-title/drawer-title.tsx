import { Avatar, Badge, BadgeProps } from 'antd';
import { EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';

import { useAppSelector } from '../../../../hooks';

import { DrawerType } from '../../../../constants';

export const DrawerTitleComponent: React.FC = () => {
  const { activeTraining, typeDrawer } = useAppSelector((state) => state.userExercises.drawer);
  const { activeDate: selectedDate, userInviteId } = useAppSelector((state) => state.userExercises);

  const getTitle = (typeDrawer: DrawerType) => {
    let icon;
    let text;

    switch (typeDrawer) {
      case DrawerType.ModalUpdate:
        icon = <EditOutlined />;
        text = 'Редактирование';
        break;
      case DrawerType.UpdateFuture:
        icon = <EditOutlined />;
        text = 'Редактировать тренировку';
        break;
      case DrawerType.Create:
        icon = <PlusOutlined />;
        text = 'Новая тренировка';
        break;
      case DrawerType.ModalCreate:
        icon = <PlusOutlined />;
        text = 'Добавление упражнений';
        break;
      case DrawerType.InviteCreate:
        icon = <PlusOutlined />;
        text = 'Совместная тренировка';
        break;

      default:
        break;
    }

    return (
      <div className="drawer-title-content">
        {icon}
        <h6>{text}</h6>
      </div>
    );
  };

  return (
    <>
      {getTitle(typeDrawer)}

      {typeDrawer !== DrawerType.ModalCreate && typeDrawer !== DrawerType.ModalUpdate && (
        <div className="drawer-title-badge">
          {typeDrawer === DrawerType.InviteCreate && (
            <div>
              <Avatar
                size={42}
                src={userInviteId?.imageSrc || null}
                icon={userInviteId?.imageSrc ? null : <UserOutlined />}
              />
              <h6>{userInviteId?.name}</h6>
            </div>
          )}
          <Badge
            color={activeTraining.color as BadgeProps['color']}
            text={activeTraining.content}
          />
          {typeDrawer !== DrawerType.InviteCreate && (
            <span className="drawer-title-date">
              {(dayjs(selectedDate) as unknown as dayjs.Dayjs)?.format('DD.MM.YYYY')}
            </span>
          )}
        </div>
      )}
    </>
  );
};
