import { OPTION_STATUS_ACTIVE } from '@/utils/constant';
import { KycType, StatusAccount } from '@/utils/enum';
import { useRequest, useSetState, useToggle } from 'ahooks';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Skeleton,
} from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useIntl } from 'umi';
import { createNewsData, editNewsData, getNewsData } from './service';
import styles from './index.less';
const { Option } = Select;

interface Iprops {
  open: boolean;
  setOpen: (b: boolean) => void;
  itemEdit: any;
}

interface Inews {
  id?: any;
  title?: string;
  content?: string;
  status?: StatusAccount;
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
  const [newsInfo, setNewsInfo] = useSetState<Inews>({});

  const { formatMessage } = useIntl();
  const requestUser = useRequest(getNewsData, {
    manual: true,
    onSuccess: (res: any) => {
      setNewsInfo(res);
    },
    onError: (rej) => {
      message.error(rej.message);
    },
    onFinally: () => {
      setLoading(false);
    },
  });

  React.useEffect(() => {
    if (itemEdit) {
      requestUser.run(itemEdit);
    } else {
      setNewsInfo({});
      setLoading(false);
      setEditable.set(true);
    }
  }, [itemEdit]);

  const requestCreateUser = useRequest(createNewsData, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_add_user_success' }));
      setNewsInfo(res);
      setOpen(false);
    },
    onError: (rej: any) => {
      message.error(formatMessage({ id: 'message_add_user_failure' }));
    },
    onFinally: () => {
      setLoading(false);
    },
  });
  const requestEditUser = useRequest(editNewsData, {
    manual: true,
    onSuccess: (res: any) => {
      message.error(formatMessage({ id: 'message_user_success' }));
      setNewsInfo(res);
      setOpen(false);
    },
    onError: (rej: any) => {
      message.error(formatMessage({ id: 'message_user_failure' }));
    },
    onFinally: () => {
      setLoading(false);
    },
  });

  const onEdit = () => {
    setEditable.set(true);
  };

  const onFinish = (value: any) => {
    if (itemEdit) {
      requestEditUser.run(newsInfo.id, value);
      return;
    }
    requestCreateUser.run(value);
    return;
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
        {requestUser.loading || loading ? (
          <Skeleton active />
        ) : (
          <>
            <Form
              layout="vertical"
              hideRequiredMark
              onFinish={onFinish}
              initialValues={newsInfo}
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
                {editable ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.addButton}
                  >
                    {formatMessage({ id: 'general_save' })}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => onEdit()}
                    className={styles.addButton}
                  >
                    {formatMessage({ id: 'general_edit' })}
                  </Button>
                )}
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
