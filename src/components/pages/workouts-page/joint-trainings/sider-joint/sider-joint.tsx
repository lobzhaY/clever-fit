import { useState } from 'react';

import { Button, Layout } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { useAppSelector } from '../../../../../hooks';

import { MessageCardComponent } from '../message-card/message-card';

import { GetInvite } from '../../../../../constants';

import styles from './sider-layout.module.scss';

export const SiderJointComponent: React.FC = () => {
  const { Sider } = Layout;

  const { countInvites, newInvites } = useAppSelector((state) => state.invite);

  const [showAllMessages, setShowAllMessages] = useState(false);

  return (
    <Layout className={styles.siderWrapper}>
      <Sider
        className={styles.newInvitesContainer}
        style={{
          backgroundColor: '#FAFAFA',
        }}
        width={'100%'}>
        <div className={styles.newInvitesContent}>
          <p className={styles.title}>
            Новое сообщение <span>({countInvites})</span>
          </p>
          <MessageCardComponent key={(newInvites[0] as GetInvite)._id} item={newInvites[0]} />
          {showAllMessages &&
            newInvites
              .slice(1)
              .map((message: GetInvite) => (
                <MessageCardComponent key={message._id} item={message} />
              ))}

          {countInvites > 1 && (
            <Button
              type="link"
              onClick={() => setShowAllMessages(!showAllMessages)}
              className={styles.actionBtn}>
              {showAllMessages ? (
                <span className={styles.actionWrapper}>
                  <UpOutlined className={styles.actionLink} /> Скрыть сообщения
                </span>
              ) : (
                <span className={styles.actionWrapper}>
                  <DownOutlined className={styles.actionLink} /> Показать новые сообщения
                </span>
              )}
            </Button>
          )}
        </div>
      </Sider>
    </Layout>
  );
};
