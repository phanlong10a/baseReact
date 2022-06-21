import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'umi';
import styles from './index.less';
const MainHeader = () => {
  return (
    <Row justify="space-between" align="middle" className={styles.layoutHeader}>
      <Col></Col>
      <Col>
        <Link to="/account">Account</Link>
        <Button>Logout</Button>
      </Col>
    </Row>
  );
};

export default MainHeader;
