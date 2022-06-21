import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'umi';

const MainHeader = () => {
  return (
    <Row justify="space-between" align="middle">
      <Col></Col>
      <Col>
        <Link to="/account">Account</Link>
        <Button>Logout</Button>
      </Col>
    </Row>
  );
};

export default MainHeader;
