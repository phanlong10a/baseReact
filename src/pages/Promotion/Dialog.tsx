import { useRequest, useSetState, useToggle } from 'ahooks';
import moment from 'moment';
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
  InputNumber,
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { createCoupon, editCoupon, getCouponData } from './service';
const { Option } = Select;
import styles from './index.less';
import {
  APPLICABLE,
  OPTION_GENDER,
  OPTION_STATUS_ACTIVE,
  STATUS_ACTIVE,
} from '@/utils/constant';
import { Applicable, StatusAccount, StatusKyc } from '@/utils/enum';
import { STATUS_KYC } from '../../utils/constant/index';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
interface Iprops {
  open: boolean;
  setOpen: (b: boolean) => void;
  itemEdit: any;
}

interface ICoupon {
  id?: any;
  title?: string;
  description?: string;
  code?: string;
  discount?: number;
  startTime?: any;
  endTime?: any;
  applicable?: Applicable;
  userIds?: number[];
  status?: string;
  promotionTime?: Array<any>;
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
  const [couponInfo, setCouponInfo] = useSetState<ICoupon>({});

  const { formatMessage } = useIntl();
  const requestCoupon = useRequest(getCouponData, {
    manual: true,
    onSuccess: (res: any) => {
      setCouponInfo({
        ...res,
        status: res.status ? res.status : StatusAccount.ACTIVE,
        applicable: res.applicable ? res.applicable : Applicable.ALL,
        startTime: moment(res.startTime),
        endTime: moment(res.endTime),
        promotionTime: [moment(res.startTime), moment(res.endTime)],
      });
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

  const requestCreateCoupon = useRequest(createCoupon, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_add_coupon_success' }));
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
  const requestEditCoupon = useRequest(editCoupon, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_coupon_success' }));
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
    if (itemEdit) {
      requestCoupon.run(itemEdit);
    } else {
      setLoading(false);
      setCouponInfo({});
      setEditable.set(true);
    }
  }, [itemEdit]);

  const onEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>): any => {
    e.preventDefault();
    setEditable.set(true);
  };

  const onFinish = (value: any) => {
    const sendObj: ICoupon = {
      ...value,
      startTime: dayjs(value.promotionTime[0]).format(),
      endTime: dayjs(value.promotionTime[1]).format(),
    };
    if (itemEdit) {
      requestEditCoupon.run(couponInfo.id, sendObj);
      return;
    }
    requestCreateCoupon.run(sendObj);
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
        // extra={
        //     <Space>
        //         <Button onClick={() => setOpen(false)}>Cancel</Button>
        //         <Button onClick={() => setOpen(false)} type="primary">
        //             Submit
        //         </Button>
        //     </Space>
        // }
      >
        {requestCoupon.loading || loading ? (
          <Skeleton active />
        ) : (
          <>
            <Form
              layout="vertical"
              hideRequiredMark
              onFinish={onFinish}
              autoComplete="off"
              initialValues={couponInfo}
            >
              <Row gutter={16}>
                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="code"
                    label={formatMessage({ id: 'promotion_code' })}
                    initialValue={couponInfo.code}
                  >
                    <Input
                      placeholder={formatMessage({ id: 'promotion_code' })}
                      disabled
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
                    initialValue={[couponInfo.startTime, couponInfo.endTime]}
                  >
                    <RangePicker
                      disabled={!editable}
                      className={styles.RangePicker}
                      format="YYYY/MM/DD HH:mm:ss"
                      showTime
                    />
                  </Form.Item>
                </Col>
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
                      disabled={!editable}
                      placeholder={formatMessage({ id: 'title' })}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} className={styles.dialogFormItem}>
                  <Form.Item
                    name="description"
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
                      disabled={!editable}
                      placeholder={formatMessage({ id: 'content' })}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} className={styles.dialogFormItem}>
                  <Form.Item
                    name="discount"
                    label={formatMessage({ id: 'discount' })}
                    rules={[
                      {
                        required: true,
                        message: formatMessage(
                          { id: 'error.require' },
                          {
                            field: formatMessage({ id: 'discount' }),
                          },
                        ),
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      max={100}
                      addonAfter={'%'}
                      disabled={!editable}
                    />
                  </Form.Item>
                </Col>

                <Col span={12} className={styles.dialogFormItem}>
                  <Form.Item
                    name="applicable"
                    label={formatMessage({ id: 'promotion_type' })}
                    initialValue={Applicable.ALL}
                  >
                    <Select disabled={!editable}>
                      {APPLICABLE.map((status, index) => (
                        <Option value={status.value} key={index}>
                          {formatMessage({ id: status.name })}
                        </Option>
                      ))}
                    </Select>
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
              </Row>
              <div className={styles.addGroupButton}>
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
                    onClick={(e): React.MouseEventHandler<HTMLElement> =>
                      onEdit(e)
                    }
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
