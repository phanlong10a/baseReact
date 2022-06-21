import { useAuth } from '@/utils/hooks/useAuth';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'umi';

const MainHeader = () => {
  const { onLogout } = useAuth();

  return (
    <Row justify="space-between" align="middle">
      <Col></Col>
      <Col>
        <Link to="/account">Account</Link>
        <Button onClick={onLogout}>Logout</Button>
      </Col>
    </Row>
  );
};

export default MainHeader;
