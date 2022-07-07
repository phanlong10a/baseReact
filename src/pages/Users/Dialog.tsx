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
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { getUserData } from './service';
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

interface IUser {
  address?: string;
  avatar?: any;
  createdAt?: string;
  dateOfBirth?: string;
  email?: string;
  fullName?: string;
  gender?: string;
  id?: string;
  identificationCode?: string;
  isActive?: true;
  phone?: string;
  points?: number;
  referralCode?: string;
  roles?: Array<any>;
  status?: string;
  updatedAt?: string;
  kyc?: any;
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
  const [userInfo, setUserInfo] = useSetState<IUser>({});

  const { formatMessage } = useIntl();
  const requestUser = useRequest(getUserData, {
    manual: true,
    onSuccess: (res: any) => {
      setUserInfo(res);
    },
    onError: (rej) => {
      message.error(rej.message);
    },
    onFinally: () => {
      setLoading(false);
    },
  });
  const getUser = () => {};

  React.useEffect(() => {
    if (itemEdit) {
      requestUser.run(itemEdit);
    } else {
      setLoading(false);
      setUserInfo({});
      setEditable.set(true);
    }
  }, [itemEdit]);

  const onEdit = (e: any) => {
    e.preventDefault();
    setEditable.set(true);
  };

  const onFinish = (value: any) => {
    console.log(value);
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
            {userInfo.avatar && (
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <Image
                  src={userInfo.avatar?.url}
                  style={{ borderRadius: '100%' }}
                  placeholder={formatMessage({ id: 'general_preview_image' })}
                  preview={{
                    mask: <>{formatMessage({ id: 'general_preview_image' })}</>,
                    maskClassName: 'round-circle',
                  }}
                  width={100}
                />
              </div>
            )}
            <Form
              layout="vertical"
              hideRequiredMark
              onFinish={onFinish}
              autoComplete="off"
              // initialValues={userInfo}
            >
              <Row gutter={16}>
                <Col span={12} className={styles.dialogFormItem}>
                  {userInfo?.kyc[0]?.frontPhoto?.url ? (
                    <Form.Item
                      label={formatMessage({
                        id: 'general_kyc_photo_type_front',
                      })}
                    >
                      <Image
                        src={userInfo?.kyc[0]?.frontPhoto?.url}
                        placeholder={formatMessage({
                          id: 'general_preview_image',
                        })}
                        preview={{
                          mask: (
                            <>
                              {formatMessage({ id: 'general_preview_image' })}
                            </>
                          ),
                        }}
                        width={'100%'}
                        className={styles.kycImage}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item
                      label={formatMessage({
                        id: 'general_kyc_photo_type_front',
                      })}
                    >
                      <div className={styles.kycImagePlaceholder}></div>
                    </Form.Item>
                  )}
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  {userInfo?.kyc[0]?.backPhoto?.url ? (
                    <Form.Item
                      label={formatMessage({
                        id: 'general_kyc_photo_type_back',
                      })}
                    >
                      <Image
                        src={userInfo?.kyc[0]?.backPhoto?.url}
                        placeholder={formatMessage({
                          id: 'general_preview_image',
                        })}
                        preview={{
                          mask: (
                            <>
                              {formatMessage({ id: 'general_preview_image' })}
                            </>
                          ),
                        }}
                        width={'100%'}
                        className={styles.kycImage}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item
                      label={formatMessage({
                        id: 'general_kyc_photo_type_back',
                      })}
                    >
                      <div className={styles.kycImagePlaceholder}></div>
                    </Form.Item>
                  )}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="fullName"
                    label={formatMessage({ id: 'fullname' })}
                    initialValue={userInfo.fullName}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'fullname' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'fullname' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="phone"
                    label={formatMessage({ id: 'phone_number' })}
                    initialValue={userInfo.phone}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'phone_number' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'phone_number' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="address"
                    label={formatMessage({ id: 'address' })}
                    initialValue={userInfo.phone}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'address' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'address' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="dateOfBirth"
                    label={formatMessage({ id: 'date_of_birth' })}
                    initialValue={
                      userInfo?.kyc ? userInfo?.kyc[0]?.dateOfBirth : ''
                    }
                  >
                    <Input
                      placeholder={formatMessage({ id: 'date_of_birth' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="identificationCode"
                    label={formatMessage({ id: 'identification_code' })}
                    initialValue={
                      userInfo?.kyc ? userInfo?.kyc[0]?.identificationCode : ''
                    }
                  >
                    <Input
                      placeholder={formatMessage({ id: 'identification_code' })}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="status"
                    label={formatMessage({ id: 'status' })}
                    initialValue={userInfo.status}
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
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="kycStatus"
                    label={formatMessage({ id: 'status_verify' })}
                    initialValue={
                      userInfo?.kyc
                        ? userInfo?.kyc[0]?.status
                        : StatusKyc.NOT_VERIFIED
                    }
                  >
                    <Select disabled={!editable}>
                      {STATUS_KYC.map((status, index) => (
                        <Option value={status.value} key={index}>
                          {formatMessage({ id: status.name })}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="gender"
                    label={formatMessage({ id: 'general_gender' })}
                    initialValue={
                      userInfo.gender ? userInfo.gender : OPTION_GENDER[0].value
                    }
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'general_gender' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <Select disabled={!editable}>
                      {OPTION_GENDER.map((gender, index) => (
                        <Option value={gender.value} key={index}>
                          {formatMessage({ id: gender.name })}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="email"
                    label={formatMessage({ id: 'email' })}
                    initialValue={userInfo.email}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'email' }),
                          },
                        ),
                      },
                      {
                        type: 'email',
                        message: formatMessage({ id: 'error.email' }),
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'email' })}
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
              </div>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default React.memo(Dialog);
