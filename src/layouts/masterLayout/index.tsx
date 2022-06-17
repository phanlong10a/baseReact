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
import { useLocation, Link } from 'umi';
import { authRoutes } from '../../../config/routes/index';
import { useHistory } from 'umi';

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
    getItem('Xác thực người dùng', '4'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = ({ children, ...rest }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    if (
      !authRoutes.find((item) => {
        return item.path === location.pathname;
      })
    ) {
      history.push('/404');
    }
  }, [location]);

  console.log('const location = useLocation();', location);
  return (
    <Layout style={{ minHeight: '100vh' }}>
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
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>{children}</Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default React.memo(App);
