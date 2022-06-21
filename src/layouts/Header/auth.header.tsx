import { Col, Row } from 'antd';
import React from 'react';
import { Link, useLocation } from 'umi';

import styles from './index.less';

const AuthHeader = () => {
  const location = useLocation();

  return (
    <Row justify="space-between" align="middle" className={styles.authHeader}>
      <Col className={styles.logo}>LOGO</Col>
      <Col className={styles.links}>
        {location.pathname !== '/login' && <Link to="/login">Login</Link>}
        {location.pathname !== '/register' && (
          <Link to="/register">Register</Link>
        )}
      </Col>
    </Row>
  );
};

export default AuthHeader;
