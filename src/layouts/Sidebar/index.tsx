import {
  AimOutlined,
  CheckOutlined,
  CreditCardOutlined,
  NotificationOutlined,
  PercentageOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  ShareAltOutlined,
  SolutionOutlined,
  TagOutlined,
  TagsOutlined,
  UnlockOutlined,
  UnorderedListOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useIntl, useLocation } from 'umi';

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
    getItem(
      renderLink('/bike-station', 'navigation_bike_station'),
      '/bike-station',
      <AimOutlined />,
    ),
    getItem(renderLink('/user', 'navigation_user'), '/user', <UserOutlined />),
    getItem(
      renderLink('/kyc', 'navigation_user_kyc'),
      '/kyc',
      <CheckOutlined />,
    ),
    getItem(
      renderLink('/admin', 'navigation_admin_manage'),
      '/admin',
      <UserOutlined />,
    ),
    getItem(
      renderLink('/vehicles', 'navigation_vihicle'),
      '/vehicles',
      <TagOutlined />,
    ),
    getItem(
      renderLink('/lock', 'navigation_lock'),
      '/lock',
      <UnlockOutlined />,
    ),
    getItem(
      renderLink('/travel', 'navigation_travel'),
      '/travel',
      <ShareAltOutlined />,
    ),
    getItem(
      renderLink('/user_wallet', 'navigation_user_wallet'),
      '/user_wallet',
      <WalletOutlined />,
    ),
    getItem(
      renderLink('/ticket', 'navigation_ticket'),
      '/ticket',
      <TagsOutlined />,
    ),
    getItem(
      renderLink('/payment_method', 'navigation_method'),
      '/payment_method',
      <CreditCardOutlined />,
    ),
    getItem(
      renderLink('/promotion', 'navigation_promotion'),
      '/promotion',
      <PercentageOutlined />,
    ),
    getItem(
      renderLink('/tutorial', 'navigation_tutorial'),
      '/tutorial',
      <QuestionCircleOutlined />,
    ),
    getItem(renderLink('/news', 'navigation_news'), '/news', <ReadOutlined />),
    getItem(
      renderLink('/rate', 'navigation_rate'),
      '/rate',
      <SolutionOutlined />,
    ),
    getItem(
      renderLink('/notifications', 'navigation_notification'),
      '/notifications',
      <NotificationOutlined />,
    ),
    getItem(
      renderLink('/notification-template', 'navigation_notification_template'),
      '/notification-template',
      <UnorderedListOutlined />,
    ),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onToggle}
      className={styles.layoutSlider}
      breakpoint="md"
      width={250}
    >
      <div className={styles.logoWrapper}>
        <img src="/assets/images/logo_white.svg" className={styles.logo} />
      </div>
      <Menu
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        items={items}
        className={styles.backgroundPrimary}
      />
    </Sider>
  );
};

export default Sidebar;
