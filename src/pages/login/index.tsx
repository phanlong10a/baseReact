import { Button, Checkbox, Form, Input, Col, Row } from 'antd';
import { useRequest } from 'ahooks';
import { login } from './service';
import React from 'react';

const index: React.FC = () => {
  const loginRequest = useRequest(login, {
    manual: true,
  });

  const onFinish = (values: any) => {
    console.log(values);
    // loginRequest.runAsync({
    //   fcmToken: "",
    //   phone: "84357917750",
    //   password: "123456"
    // }).then((res : any) => {
    //   console.log(res)
    // })
  };

  console.log(process.env.APP__END_POINT);

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
            autoComplete="off"
          >
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: 'Tài khoản không được để trống' },
              ]}
            >
              <Input type="text" />
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
