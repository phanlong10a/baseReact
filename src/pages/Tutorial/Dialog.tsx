import { OPTION_STATUS_ACTIVE } from '@/utils/constant';
import { StatusAccount } from '@/utils/enum';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { useRequest, useToggle } from 'ahooks';
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
  Upload,
} from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import {
  createGuideData,
  editGuideData,
  getGuideData,
  uploadImage,
} from './service';
const { Option } = Select;

interface Iprops {
  open: boolean;
  setOpen: (b: boolean) => void;
  itemEdit: any;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt5M;
};

const Dialog: React.FC<Iprops> = ({
  open,
  setOpen,
  itemEdit,
  children,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [fileID, setFileID] = useState<number | null>(null);
  const [editable, setEditable] = useToggle(false);
  const [initialValue, setInitialValue] = useState({});
  const [defaultFileList, setDefaultFileList] = useState<UploadFile[]>([]);

  const { formatMessage } = useIntl();

  const requestCreateGuide = useRequest(createGuideData, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_success' }));
      setOpen(false);
    },
    onError: (rej: any) => {
      rej.errors
        ? message.error(rej.errors[0])
        : message.error(formatMessage({ id: 'error' }));
    },
  });
  const requestEditGuide = useRequest(editGuideData, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_success' }));
      setOpen(false);
    },
    onError: (rej: any) => {
      message.error(formatMessage({ id: 'error' }));
    },
  });

  const requestGetGuide = useRequest(getGuideData, {
    manual: true,
    onSuccess: (res: any) => {
      setInitialValue(res);
      if (res.thumbnail) {
        setFileID(res.thumbnail?.id);
        setDefaultFileList([
          {
            uid: '-1',
            name: res.thumbnail.originalname,
            status: 'done',
            url: res.thumbnail.url,
            thumbUrl: res.thumbnail.url,
          },
        ]);
      }
    },
    onError: (rej: any) => {
      message.error(formatMessage({ id: 'error' }));
    },
    onFinally: () => {
      setLoading(false);
    },
  });

  React.useEffect(() => {
    if (itemEdit) {
      requestGetGuide.run(itemEdit);
    } else {
      setInitialValue({});
      setLoading(false);
      setEditable.set(true);
    }
  }, [itemEdit]);

  const onFinish = (value: any) => {
    if (fileID) {
      const { content, status, title } = value;
      let submitObj = {
        content,
        status,
        title,
        thumbnailId: fileID,
      };
      if (itemEdit) {
        requestEditGuide.run(itemEdit, submitObj);
        return;
      }
      requestCreateGuide.run(submitObj);
      return;
    } else {
      message.error(formatMessage({ id: 'image_empty' }));
    }
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.fileList && info.fileList.length === 0) {
      setFileID(null);
    }
  };

  const onEdit = (e: any) => {
    e.preventDefault();
    setEditable.set(true);
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
      >
        {requestGetGuide.loading || loading ? (
          <Skeleton active />
        ) : (
          <>
            <Form
              layout="vertical"
              hideRequiredMark
              onFinish={onFinish}
              initialValues={initialValue}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Row gutter={16}>
                    <Col span={24} className={styles.dialogFormItem}>
                      <Form.Item
                        name="thumbnail"
                        label={formatMessage({ id: 'thumbnail' })}
                      >
                        <Upload
                          name="avatar"
                          listType="picture"
                          maxCount={1}
                          defaultFileList={defaultFileList}
                          disabled={!editable}
                          action={(file) => {
                            setLoadingImage(true);
                            let formData = new FormData();
                            formData.append('files', file);
                            return uploadImage(formData)
                              .then((res: any) => {
                                setFileID(res[0]?.id);
                                message.success(
                                  formatMessage({ id: 'message_success' }),
                                );
                                return '';
                              })
                              .catch(() => {
                                message.error(
                                  formatMessage({ id: 'message_failure' }),
                                );
                                return '';
                              })
                              .finally(() => {
                                setLoadingImage(false);
                                return '';
                              });
                          }}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          <Button
                            icon={
                              loadingImage ? (
                                <LoadingOutlined />
                              ) : (
                                <UploadOutlined />
                              )
                            }
                          >
                            Upload
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={16}>
                    <Col span={24} className={styles.dialogFormItem}>
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
                    <Col span={24} className={styles.dialogFormItem}>
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
                        <Input.TextArea
                          rows={4}
                          placeholder={formatMessage({ id: 'content' })}
                          disabled={!editable}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className={styles.addGroupButton}>
                {/* <Button className={styles.addButton}>Thêm mới</Button> */}
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
