import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Skeleton,
  Image,
} from 'antd';
import React, { useState } from 'react';
import { useRequest, useSetState } from 'ahooks';
import { getUserData } from '../service';
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
  const [userInfo, setUserInfo] = useSetState<{
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
  }>({});
  const requestUser = useRequest(getUserData, {
    manual: true,
    onSuccess: (res) => {
      setUserInfo(res);
    },
    onError: (rej) => {
      console.error(rej);
    },
    onFinally: () => {
      setLoading(false);
    },
  });
  const getUser = () => {};

  React.useEffect(() => {
    if (itemEdit) {
      requestUser.run(itemEdit);
    } else setLoading(false);
  }, [itemEdit]);

  console.log(requestUser.loading, loading, userInfo);
  return (
    <>
      <Drawer
        title="Xem thông tin tài khoản"
        width={720}
        onClose={() => setOpen(false)}
        visible={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
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
                  width={100}
                />
              </div>
            )}
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label="Tên"
                    initialValue={userInfo.fullName}
                  >
                    <Input placeholder="Tên" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    initialValue={userInfo.phone}
                  >
                    <Input placeholder="Số điện thoại" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="isActive"
                    label="Trạng thái"
                    initialValue={
                      userInfo.isActive ? 'Hoạt động' : 'Không hoạt động'
                    }
                  >
                    <Input placeholder="Trạng thái" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    initialValue={userInfo.gender == 'MALE' ? 'Nam' : 'Nữ'}
                  >
                    <Input placeholder="Giới tính" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    initialValue={userInfo.email}
                  >
                    <Input placeholder="Email" disabled />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Drawer>
    </>
  );
};

export default React.memo(Dialog);