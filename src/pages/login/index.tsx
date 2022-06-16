import { Button, Checkbox, Form, Input, Col, Row } from 'antd';
import React from 'react';

const index: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col xs={24} lg={12}>
          <Row justify="center">
            <Col>
              <h2>CMS V-Bike</h2>
            </Col>
          </Row>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[
                { required: true, message: 'Tài khoản không được để trống' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Mật khẩu không được để trống' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Row justify="center">
              <Col>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default index;
