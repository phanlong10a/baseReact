import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation } from 'umi';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

import { Link } from 'umi';
import styles from './index.less';

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

const Sidebar = ({
  children,
  collapsed,
  onToggle,
}: {
  children?: React.ReactNode | React.ReactNode[];
  collapsed: boolean;
  onToggle: () => void;
}) => {
  const { formatMessage } = useIntl();
  const location = useLocation();

  const renderLink: (link: string, title: string) => React.ReactNode = (
    link: string,
    title: string,
  ) => {
    return (
      <Link to={link} key={link}>
        {formatMessage({ id: title })}
      </Link>
    );
  };

  const items: MenuItem[] = [
    getItem(renderLink('/', 'navitation_home'), '/', <PieChartOutlined />),
    getItem(
      renderLink('/bike-station', 'navigation_bike_station'),
      '/bike-station',
      <DesktopOutlined />,
    ),
    getItem(renderLink('/user', 'navigation_user'), '/user', <UserOutlined />),
    getItem(
      renderLink('/kyc', 'navigation_user_kyc'),
      '/kyc',
      <UserOutlined />,
    ),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onToggle}
      className={styles.layoutSlider}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
