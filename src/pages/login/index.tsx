import { Button, Form, Input } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import { useLogin } from './service';

import styles from './index.less';

const Login: React.FC = () => {
  const intl = useIntl();
  const { loading, run } = useLogin();

  const onFinish = (values: any) => {
    run(values);
  };

  return (
    <div className={styles.loginWrap}>
      <h1>CMS V-Bike</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          phone_number: '84947754271',
          password: '123',
        }}
      >
        <Form.Item
          className={styles.formItem}
          label={intl.formatMessage({ id: 'phone_number' })}
          name="phone_number"
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                {
                  id: 'error.require',
                },
                { field: intl.formatMessage({ id: 'phone_number' }) },
              ),
            },
          ]}
        >
          <Input
            type="text"
            placeholder={intl.formatMessage({ id: 'phone_number' })}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ id: 'password' })}
          name="password"
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                {
                  id: 'error.require',
                },
                { field: intl.formatMessage({ id: 'password' }) },
              ),
            },
          ]}
        >
          <Input.Password
            placeholder={intl.formatMessage({ id: 'password' })}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className={styles.btnSubmit}
        >
          {intl.formatMessage({ id: 'login' })}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
