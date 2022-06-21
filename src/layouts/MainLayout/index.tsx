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

import '@/global/styles.less';
import { RecoilRoot } from 'recoil';
import MainHeader from '../Header/main.header';
import { Link } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/">Trang chủ</Link>, '1', <PieChartOutlined />),
  getItem(
    <Link to="/bike-station">Quản lý trạm xe</Link>,
    '2',
    <DesktopOutlined />,
  ),
  getItem('Người dùng', 'sub1', <UserOutlined />, [
    getItem(<Link to="/user">Quản lý người dùng</Link>, '3'),
    getItem(<Link to="/kyc">Xác thực người dùng</Link>, '4'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

const App = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['2']}
          activeKey="4"
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <MainHeader />

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
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
  return (
    <RecoilRoot>
      <App>{children}</App>
    </RecoilRoot>
  );
};

export default MainLayout;
