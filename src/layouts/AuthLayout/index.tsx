import React from 'react';

import '@/global/styles.less';
import { Layout } from 'antd';
import AuthHeader from '../Header/auth.header';

import '@/global/styles.less';

import styles from './index.less';

const { Content } = Layout;

const AuthLayout = ({ children }: any) => {
  return (
    <Layout>
      <AuthHeader />
      <Content className={styles.authContent}>
        <div>{children}</div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
