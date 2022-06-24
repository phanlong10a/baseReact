import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'umi';
import styles from './index.less';
import '/src/global/styles.less';
import MainHeader from '../Header/main.header';
import { useToggle } from 'ahooks';
import 'react-quill/dist/quill.snow.css';

const { Header, Content, Footer, Sider } = Layout;

const App = ({ children }: any) => {
  const [collapsed, setCollapsed] = useToggle(false);

  return (
    <Layout>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed.toggle()} />
      <Layout className="site-layout">
        <MainHeader />
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const MainLayout: React.FC = ({ children }) => {
  return <App>{children}</App>;
};

export default MainLayout;
