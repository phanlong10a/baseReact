import { OPTION_STATUS_ACTIVE } from '@/utils/constant';
import { KycType, StatusAccount } from '@/utils/enum';
import { useToggle } from 'ahooks';
import { Button, Col, Form, Input, Modal, Row, Select, Skeleton } from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useIntl } from 'umi';
import styles from './index.less';
const { Option } = Select;

interface Iprops {
  open: boolean;
  setOpen: (b: boolean) => void;
  itemEdit: any;
}

const Dialog: React.FC<Iprops> = ({
  open,
  setOpen,
  itemEdit,
  children,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useToggle(true);

  const { formatMessage } = useIntl();

  React.useEffect(() => {}, [itemEdit]);

  const onEdit = () => {
    setEditable.set(true);
  };

  const onFinish = (value: any) => {
    console.log(value);
  };

  return (
    <>
      <Modal
        title={
          itemEdit
            ? editable
              ? formatMessage({ id: 'general_edit_infomation' })
              : formatMessage({ id: 'general_view_infomation' })
            : formatMessage({ id: 'general_add' })
        }
        centered
        width={720}
        onCancel={() => setOpen(false)}
        visible={open}
        footer={null}
        // extra={
        //     <Space>
        //         <Button onClick={() => setOpen(false)}>Cancel</Button>
        //         <Button onClick={() => setOpen(false)} type="primary">
        //             Submit
        //         </Button>
        //     </Space>
        // }
      >
        {false ? (
          <Skeleton active />
        ) : (
          <>
            <Form
              layout="vertical"
              hideRequiredMark
              onFinish={onFinish}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="title"
                    label={formatMessage({ id: 'title' })}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'title' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'title' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="status"
                    label={formatMessage({ id: 'status' })}
                    initialValue={StatusAccount.ACTIVE}
                  >
                    <Select disabled={!editable}>
                      {OPTION_STATUS_ACTIVE.map((status, index) => (
                        <Option value={status.value} key={index}>
                          {formatMessage({ id: status.name })}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} className={styles.dialogFormItem}>
                  <Form.Item
                    name="content"
                    label={formatMessage({ id: 'content' })}
                  >
                    <ReactQuill theme="snow" />
                  </Form.Item>
                </Col>
              </Row>
              <div className={styles.addGroupButton}>
                <Button htmlType="submit" className={styles.addButton}>
                  Thêm mới
                </Button>
                <Button
                  danger
                  onClick={() => setOpen(false)}
                  className={styles.addButton}
                >
                  {formatMessage({ id: 'general_cancel' })}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default React.memo(Dialog);
