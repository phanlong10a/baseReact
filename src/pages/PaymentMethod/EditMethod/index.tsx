import Dialog from '@/components/Dialog';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useState } from 'react';
import { tableData } from '../interface';
import { IMethod } from '../services';
import styles from './index.less';

interface INewMethod {
  initialdata: tableData;
  handleSubmit?: (newMethod: IMethod) => typeof newMethod | void;
}
const EditMethod: React.FC<INewMethod> = ({
  handleSubmit = () => {},
  initialdata,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const initialValue = {
    imageId: initialdata.image.id,
    method: initialdata.method,
  };
  return (
    <div>
      <header className={styles.header}>
        <Button
          type="primary"
          icon={<EditOutlined />}
          className={styles.button}
          onClick={() => {
            setVisible(true);
          }}
        >
          Sua
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
              <Form.Item name="method" label="Tên phương thức">
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
              cap nhat
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default EditMethod;
