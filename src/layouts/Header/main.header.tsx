import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Col, Row, Dropdown, Space, Menu } from 'antd';
import { useIntl, formatMessage } from 'umi';
import React from 'react';
import { Link, setLocale } from 'umi';
import styles from './index.less';

const MainHeader = () => {
  const { formatMessage } = useIntl();
  const menu = () => (
    <Menu
      items={[
        {
          label: <Link to="/">{formatMessage({ id: 'account' })}</Link>,
          key: '0',
        },
        {
          label: <Link to="/">{formatMessage({ id: 'logout' })}</Link>,
          key: '1',
        },
      ]}
    />
  );

  return (
    <Row justify="space-between" align="middle" className={styles.layoutHeader}>
      <Col></Col>
      <Col>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button
            type="text"
            shape="circle"
            icon={
              <SettingOutlined color="white" className={styles.buttonSetting} />
            }
          />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default MainHeader;
