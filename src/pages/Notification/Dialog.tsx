import { TYPE_TEMPLATE_NOTI } from '@/utils/constant';
import { TypeTemplateNoti } from '@/utils/enum';
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
  SelectProps,
  Skeleton,
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import {
  createNotiData,
  editNotiData,
  getAllTopic,
  getAllUsers,
  getNotiData,
} from './service';
const { Option } = Select;

interface Iprops {
  open: boolean;
  setOpen: (b: boolean) => void;
  itemEdit: any;
}

interface INoti {
  id?: any;
  name?: string;
  description?: string;
  userIds?: any;
}

const options: SelectProps['options'] = [];
for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    label: value,
    value,
    disabled: i === 10,
  });
}

const Dialog: React.FC<Iprops> = ({
  open,
  setOpen,
  itemEdit,
  children,
  ...rest
}) => {
  const [form] = Form.useForm();
  const typeValue = Form.useWatch('type', form);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useToggle(false);
  const [notiInfo, setNotiInfo] = useSetState<INoti>({});
  const [listUser, setListUser] = useState<any>([]);
  const [listTopic, setListTopic] = useState<any>([]);

  const { formatMessage } = useIntl();
  const requestNoti = useRequest(getNotiData, {
    manual: true,
    onSuccess: (res: any) => {
      const noti = {
        ...res,
        userIds: res.users.map((item: any) => {
          return item.id;
        }),
        topicIds: res.topics.map((item: any) => {
          return item.id;
        }),
      };
      setNotiInfo(noti);
    },
    onError: (rej: any) => {
      rej.errors
        ? message.error(rej.errors[0])
        : message.error(formatMessage({ id: 'error' }));
    },
    onFinally: (res: any) => {
      setLoading(false);
    },
  });

  const requestGetUser = useRequest(getAllUsers, {
    onSuccess: (res) => {
      const listUser = res.data.map((item: any) => {
        return {
          value: item.id,
          label: item.username,
        };
      });
      setListUser(listUser);
    },
    onError: (rej: any) => {
      rej.errors
        ? message.error(rej.errors[0])
        : message.error(formatMessage({ id: 'error' }));
    },
  });
  const requestGetTopic = useRequest(getAllTopic, {
    onSuccess: (res: any) => {
      console.log('res', res);
      const listTopic = res.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setListTopic(listTopic);
    },
    onError: (rej: any) => {
      rej.errors
        ? message.error(rej.errors[0])
        : message.error(formatMessage({ id: 'error' }));
    },
  });

  const requestCreateNoti = useRequest(createNotiData, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_success' }));
      setOpen(false);
    },
    onError: (rej: any) => {
      message.error(
        rej.errors
          ? message.error(rej.errors[0])
          : message.error(formatMessage({ id: 'error' })),
      );
    },
    onFinally: () => {
      setLoading(false);
    },
  });
  const requestEditNoti = useRequest(editNotiData, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_success' }));
      setOpen(false);
    },
    onError: (rej: any) => {
      message.error(
        rej.errors
          ? message.error(rej.errors[0])
          : message.error(formatMessage({ id: 'error' })),
      );
    },
    onFinally: () => {
      setLoading(false);
    },
  });

  React.useEffect(() => {
    const request = async () => {
      if (itemEdit) {
        requestNoti.run(itemEdit);
      } else {
        setLoading(false);
        setNotiInfo({});
        setEditable.set(true);
      }
    };
    request();
  }, [itemEdit]);

  const onEdit = (e: any) => {
    e.preventDefault();
    setEditable.set(true);
  };

  const onFinish = (value: any) => {
    if (itemEdit) {
      requestEditNoti.run(notiInfo.id, value);
      return;
    }
    requestCreateNoti.run(value);
    return;
  };

  return (
    <>
      <Modal
        title={
          editable
            ? formatMessage({ id: 'general_edit_infomation' })
            : formatMessage({ id: 'general_view_infomation' })
        }
        centered
        width={720}
        onCancel={() => setOpen(false)}
        visible={open}
        footer={null}
      >
        {requestNoti.loading ||
        loading ||
        requestGetUser.loading ||
        requestGetTopic.loading ? (
          <Skeleton active />
        ) : (
          <>
            <Form
              form={form}
              layout="vertical"
              hideRequiredMark
              onFinish={onFinish}
              autoComplete="off"
              initialValues={notiInfo}
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
                    name="type"
                    label={formatMessage({ id: 'general_type_notification' })}
                    initialValue={TypeTemplateNoti.TOPIC}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({
                              id: 'general_type_notification',
                            }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder={formatMessage({
                        id: 'general_type_notification',
                      })}
                      disabled={!editable}
                    >
                      {TYPE_TEMPLATE_NOTI.map((item) => (
                        <Option value={item.value}>
                          {formatMessage({ id: item.name })}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {typeValue === TypeTemplateNoti.USER && (
                  <Col span={24} className={styles.dialogFormItem}>
                    <Form.Item
                      name="userIds"
                      label={formatMessage({ id: 'user' })}
                      initialValue={notiInfo.userIds}
                      rules={[
                        {
                          required: true,
                          message: formatMessage(
                            { id: 'error.require' },
                            {
                              field: formatMessage({ id: 'user' }),
                            },
                          ),
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder={formatMessage({ id: 'user' })}
                        options={listUser}
                        disabled={!editable}
                      />
                    </Form.Item>
                  </Col>
                )}

                {typeValue === TypeTemplateNoti.TOPIC && (
                  <Col span={24} className={styles.dialogFormItem}>
                    <Form.Item
                      name="topicIds"
                      label={formatMessage({ id: 'topic' })}
                      // initialValue={notiInfo.userIds}
                      rules={[
                        {
                          required: true,
                          message: formatMessage(
                            { id: 'error.require' },
                            {
                              field: formatMessage({ id: 'topic' }),
                            },
                          ),
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder={formatMessage({ id: 'topic' })}
                        options={listTopic}
                        disabled={!editable}
                      />
                    </Form.Item>
                  </Col>
                )}
                <Col span={24} className={styles.dialogFormItem}>
                  <Form.Item
                    name="content"
                    label={formatMessage({ id: 'content' })}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'content' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'content' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className={styles.addGroupButton}>
                {/* <Button className={styles.addButton}>Thêm mới</Button> */}
                <Button
                  danger
                  onClick={() => setOpen(false)}
                  className={styles.addButton}
                >
                  {formatMessage({ id: 'general_cancel' })}
                </Button>
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
                    onClick={(e) => onEdit(e)}
                    className={styles.addButton}
                  >
                    {formatMessage({ id: 'general_edit' })}
                  </Button>
                )}
              </div>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default React.memo(Dialog);
