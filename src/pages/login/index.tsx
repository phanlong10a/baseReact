import { Button, Checkbox, Form, Input, Col, Row, message } from 'antd';
import { useIntl, useHistory } from 'umi';
import { useRequest } from 'ahooks';
import { login } from './service';
import React from 'react';
import { paternPhone } from '@/utils/auth';
import { appToken } from '@/utils/apis';

const index: React.FC = () => {
  const loginRequest = useRequest(login, {
    manual: true,
  });

  const intl = useIntl();
  const history = useHistory();

  React.useEffect(() => {
    if (appToken) {
      history.push('/');
    }
  }, []);

  const onFinish = (values: { phone: string; password: string }) => {
    loginRequest
      .runAsync({
        fcmToken: '',
        phone: '84' + values.phone,
        password: values.password,
      })
      .then((res: any) => {
        message.success('Đăng nhập thành công');
        localStorage.setItem('auth', JSON.stringify(res.data));
        return true;
      })
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        message.success('Tài khoản hoặc mật khẩu không chính xác');
      });
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
              label={intl.formatMessage(
                {
                  id: 'auth_phone',
                },
                { name: 'auth_phone' },
              )}
              name="phone"
              rules={[
                { required: true, message: 'Tài khoản không được để trống' },
                {
                  pattern: paternPhone,
                  message: 'Số điện thoại không đúng định dạng',
                },
              ]}
            >
              <Input type="text" addonBefore="+84" />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: 'auth_password',
              })}
              name="password"
              rules={[
                { required: true, message: 'Mật khẩu không được để trống' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Row justify="center">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loginRequest.loading}
                >
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
