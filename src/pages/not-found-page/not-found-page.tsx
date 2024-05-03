import { Button, Layout, Result } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { NotFoundText } from '../../constants';

import styles from './not-found-page.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <Layout className={styles.mainContainer}>
      <Content className={styles.errorContentContainer}>
        <div className={styles.errorBodyWrapper}>
          <Result
            status="404"
            title={NotFoundText.title}
            subTitle={NotFoundText.subtitle}
            extra={
              <Button type="primary" className={styles.btnText}>
                {NotFoundText.btnText}
              </Button>
            }
            className={styles.errorResult}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default NotFoundPage;
