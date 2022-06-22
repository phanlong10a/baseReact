import { Col, Row } from 'antd';
import React from 'react';
import { Link, useLocation, useIntl } from 'umi';

import styles from './index.less';

const AuthHeader = () => {
  const location = useLocation();
  const { formatMessage } = useIntl();

  return (
    <Row justify="space-between" align="middle" className={styles.authHeader}>
      <Col className={styles.logo}>LOGO</Col>
      <Col className={styles.links}>
        {location.pathname !== '/login' && <Link to="/login">Login</Link>}
        {location.pathname !== '/register' && (
          <Link to="/register">{formatMessage({ id: 'register' })}</Link>
        )}
      </Col>
    </Row>
  );
};

export default AuthHeader;
