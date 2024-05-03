import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { BreadcrumbComponent, ProfileForm } from '../../components';

import styles from './profile-page.module.scss';

const ProfilePage: React.FC = () => {
  return (
    <Layout className={styles.mainContainer}>
      <header className={styles.headerContainer}>
        <BreadcrumbComponent />
      </header>
      <Content className={styles.profileContentContainer}>
        <div className={styles.profileBodyWrapper}>
          <ProfileForm />
        </div>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
