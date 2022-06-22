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
import { getUserData } from '../service';
const { Option } = Select;
import styles from '../index.less';
import { GENDER } from '@/utils/constant';

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
      console.log(res);
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
      setEditable.set(true);
    }
  }, [itemEdit]);

  return (
    <>
      <Modal
        title="Xem thông tin tài khoản"
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
                  width={100}
                />
              </div>
            )}
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="fullName"
                    label="Tên"
                    initialValue={userInfo.fullName}
                  >
                    <Input placeholder="Tên" disabled={!editable} />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    initialValue={userInfo.phone}
                  >
                    <Input placeholder="Số điện thoại" disabled={!editable} />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="isActive"
                    label="Trạng thái"
                    initialValue={
                      userInfo.isActive ? 'Hoạt động' : 'Không hoạt động'
                    }
                  >
                    <Input placeholder="Trạng thái" disabled={!editable} />
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="gender"
                    label={formatMessage({ id: 'general_gender' })}
                    initialValue={userInfo.gender == 'MALE' ? 'Nam' : 'Nữ'}
                  >
                    <Select disabled={!editable}>
                      {GENDER.map((gender, index) => (
                        <Option value={gender.name}>
                          {formatMessage({ id: gender.name })}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="email"
                    label="Email"
                    initialValue={userInfo.email}
                  >
                    <Input placeholder="Email" disabled={!editable} />
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
