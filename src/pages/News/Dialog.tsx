import { OPTION_STATUS_ACTIVE } from '@/utils/constant';
import { StatusAccount } from '@/utils/enum';
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
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useIntl } from 'umi';
import styles from './index.less';
import {
  createNewsData,
  editNewsData,
  getNewsData,
  uploadImage,
} from './service';
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

  let quillObj = useRef();
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
      message.success(formatMessage({ id: 'message_success' }));
      setNewsInfo(res);
      setOpen(false);
    },
    onError: (rej: any) => {
      message.error(
        rej.errors ? rej.errors[0] : formatMessage({ id: 'error' }),
      );
    },
    onFinally: () => {
      setLoading(false);
    },
  });

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      let file: any = input.files[0];
      let formData = new FormData();

      formData.append('files', file);

      let fileName = file.name;
      debugger;

      const res = await uploadFiles(formData, fileName, quillObj);
    };
  };
  const uploadFiles = (formData: FormData, filename: any, quillObj: any) => {
    uploadImage(formData)
      .then((res: any) => {
        console.log(res);
        const range = quillObj.getEditorSelection();
        quillObj.getEditor().insertEmbed(range.index, 'image', res[0].url);
        return '';
      })
      .finally(() => {
        return '';
      });
  };
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
                    <ReactQuill
                      ref={(el) => {
                        quillObj = el;
                      }}
                      theme="snow"
                      modules={{
                        toolbar: {
                          container: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ align: [] }],
                            ['link', 'image'],
                            ['clean'],
                            [{ color: [] }],
                          ],
                          handlers: {
                            image: () => imageHandler(),
                          },
                        },
                      }}
                    />
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
