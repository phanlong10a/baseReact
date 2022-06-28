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
  DatePicker,
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { getUserData } from './service';
const { Option } = Select;
import styles from './index.less';
import {
  OPTION_GENDER,
  OPTION_STATUS_ACTIVE,
  STATUS_ACTIVE,
} from '@/utils/constant';
import { StatusKyc } from '@/utils/enum';
import { STATUS_KYC } from '../../utils/constant/index';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
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

  React.useEffect(() => {
    if (itemEdit) {
      requestUser.run(itemEdit);
    } else {
      setLoading(false);
      setUserInfo({});
      setEditable.set(true);
    }
  }, [itemEdit]);

  const onEdit = () => {
    setEditable.set(true);
  };

  const onFinish = (value: any) => {
    console.log(value);
    console.log(dayjs(value.promotionTime[0]).format('DD/MM/YYYY'));
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
        {
          // requestUser.loading || loading
          false ? (
            <Skeleton active />
          ) : (
            <>
              <Form
                layout="vertical"
                hideRequiredMark
                onFinish={onFinish}
                autoComplete="off"
                // initialValues={userInfo}
              >
                <Row gutter={16}>
                  <Col span={12} className={styles.dialogFormItem}>
                    <Form.Item
                      name="promotionCode"
                      label={formatMessage({ id: 'promotion_code' })}
                    >
                      <Input
                        placeholder={formatMessage({ id: 'promotion_code' })}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} className={styles.dialogFormItem}>
                    <Form.Item
                      name="promotionName"
                      label={formatMessage({ id: 'promotion_name' })}
                    >
                      <Input
                        placeholder={formatMessage({ id: 'promotion_name' })}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} className={styles.dialogFormItem}>
                    <Form.Item
                      name="promotionTime"
                      label={formatMessage({ id: 'promotion_time' })}
                      rules={[
                        {
                          required: true,
                          message: formatMessage(
                            { id: 'error.require' },
                            {
                              field: formatMessage({ id: 'promotion_time' }),
                            },
                          ),
                        },
                      ]}
                    >
                      <RangePicker
                        className={styles.RangePicker}
                        format={'YYYY/MM/DD'}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} className={styles.dialogFormItem}>
                    <Form.Item label={formatMessage({ id: 'promotion_type' })}>
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
                    <Form.Item label={formatMessage({ id: 'promotion_range' })}>
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
                    <Form.Item label={formatMessage({ id: 'status' })}>
                      <Select disabled={!editable}>
                        {OPTION_STATUS_ACTIVE.map((status, index) => (
                          <Option value={status.value} key={index}>
                            {formatMessage({ id: status.name })}
                          </Option>
                        ))}
                      </Select>
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
          )
        }
      </Modal>
    </>
  );
};

export default React.memo(Dialog);
