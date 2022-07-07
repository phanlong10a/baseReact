import { useRequest, useSetState, useToggle } from 'ahooks';
import {
  Col,
  Modal,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Skeleton,
  Button,
  SelectProps,
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import {
  createTemplateData,
  editTemplateData,
  getAllUsers,
  getTemplateData,
} from './service';
const { Option } = Select;
import styles from './index.less';
import { OPTION_GENDER, OPTION_STATUS_ACTIVE } from '@/utils/constant';
import { StatusKyc } from '@/utils/enum';
import { STATUS_KYC } from '../../utils/constant/index';

interface Iprops {
  open: boolean;
  setOpen: (b: boolean) => void;
  itemEdit: any;
}

interface ITemplate {
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
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useToggle(false);
  const [templateInfo, setTemplateInfo] = useSetState<ITemplate>({});
  const [listUser, setListUser] = useState<any>([]);

  const { formatMessage } = useIntl();
  const requestTemplate = useRequest(getTemplateData, {
    manual: true,
    onSuccess: (res: any) => {
      const template = {
        ...res,
        userIds: res.users.map((item: any) => {
          return item.id;
        }),
      };
      console.log(template);
      setTemplateInfo(template);
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
      console.log(res);
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

  const requestCreateTemplate = useRequest(createTemplateData, {
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
  const requestEditTemplate = useRequest(editTemplateData, {
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
        requestTemplate.run(itemEdit);
      } else {
        setLoading(false);
        setTemplateInfo({});
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
      requestEditTemplate.run(templateInfo.id, value);
      return;
    }
    requestCreateTemplate.run(value);
    return;
  };

  console.log(templateInfo);

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
        {requestTemplate.loading || loading || requestGetUser.loading ? (
          <Skeleton active />
        ) : (
          <>
            <Form
              layout="vertical"
              hideRequiredMark
              onFinish={onFinish}
              autoComplete="off"
              initialValues={templateInfo}
            >
              <Row gutter={16}>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="name"
                    label={formatMessage({ id: 'name' })}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'name' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'name' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="description"
                    label={formatMessage({ id: 'description' })}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'description' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'description' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>

                <Col span={24} className={styles.dialogFormItem}>
                  <Form.Item
                    name="userIds"
                    label={formatMessage({ id: 'user' })}
                    initialValue={templateInfo.userIds}
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
