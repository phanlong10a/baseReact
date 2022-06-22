import Dialog from '@/components/Dialog';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { tableData } from '../interface';
import { IUpdateMethod } from '../services';
import styles from './index.less';

interface INewMethod {
  initialdata: tableData;
  handleSubmit?: (newMethod: IUpdateMethod) => typeof newMethod | void;
}
const EditMethod: React.FC<INewMethod> = ({
  handleSubmit = () => {},
  initialdata,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const initialValue = {
    description: initialdata.description,
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
          mo ta
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
              isActive: initialdata.isActive,
              display: initialdata.display,
            };
            handleSubmit(newMethod);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="description" label="Tên phương thức">
                <Input />
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
              htmlType="submit"
              type="primary"
              className={styles.addButton}
              onClick={() => {
                setVisible(false);
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
