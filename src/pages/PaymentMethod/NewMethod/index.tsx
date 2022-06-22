import Dialog from '@/components/Dialog';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useState } from 'react';
import { IMethod } from '../services';
import styles from './index.less';

interface INewMethod {
  handleSubmit?: (newMethod: IMethod) => typeof newMethod | void;
}
const NewMethod: React.FC<INewMethod> = ({ handleSubmit = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const initialValue = {
    imageId: '',
    method: '',
    description: '',
  };
  return (
    <div>
      <header className={styles.header}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.button}
          onClick={() => {
            setVisible(true);
          }}
        >
          Thêm phương thức
        </Button>
      </header>
      <Dialog
        title="Thêm phương thức"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          initialValues={initialValue}
          onFinish={(values) => {
            const newMethod = {
              ...values,
              isActive: true,
              display: 'ON',
            };
            handleSubmit(newMethod);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="imageId" label="Hình ảnh">
                <Input placeholder="Tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="method" label="Phương thức">
                <Input placeholder="Tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="description" label="Mô tả">
                <Input placeholder="Tên" />
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.addGroupButton}>
            <Button
              danger
              onClick={() => {
                setVisible(false);
                form.resetFields();
              }}
              className={styles.addButton}
            >
              huỷ
            </Button>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => {
                form.submit();
              }}
            >
              tạo mới
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default NewMethod;
