import React from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import styles from './index.less';

interface PROPS {
  status: boolean;
  onCancel: () => void;
}

const CustomerDialog = (props: PROPS): JSX.Element => {
  const { status, onCancel } = props;
  const intl = useIntl();

  return (
    <Modal
      title="Thêm mới trạm xe"
      centered
      visible={status}
      width={1000}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        // onFinish={}
      >
        <Form.Item
          label={<FormattedMessage id="in" defaultMessage="Tên trạm xe" />}
          name="name"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'i',
                defaultMessage: 'Không được để trống trường này',
              }),
            },
          ]}
          normalize={(value) => value.trim()}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="in" defaultMessage="Vị trí" />}
          name="location"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'i',
                defaultMessage: 'Không được để trống trường này',
              }),
            },
          ]}
          normalize={(value) => value.trim()}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="in" defaultMessage="Số xe có trong trạm" />
          }
          name="bike_number"
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="in" defaultMessage="Số lượng chỗ đỗ xe" />
          }
          name="parking_number"
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <div className={styles.addGroupButton}>
          <Button>Thêm mới</Button>
          <Button>Hủy</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
