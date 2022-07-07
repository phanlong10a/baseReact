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
import { getRateData } from './service';
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

interface IRate {
  address?: string;
  avatar?: any;
  message?: string;
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
  const [userInfo, setRateInfo] = useSetState<IRate>({});

  const { formatMessage } = useIntl();
  const requestRate = useRequest(getRateData, {
    manual: true,
    onSuccess: (res: any) => {
      setRateInfo(res);
    },
    onError: (rej) => {
      message.error(rej.message);
    },
    onFinally: () => {
      setLoading(false);
    },
  });
  const getRate = () => {};

  React.useEffect(() => {
    if (itemEdit) {
      requestRate.run(itemEdit);
    } else {
      setLoading(false);
      setRateInfo({});
      setEditable.set(true);
    }
  }, [itemEdit]);

  const onEdit = () => {
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
        {requestRate.loading || loading ? (
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
                <Col span={24} className={styles.dialogFormItem}>
                  <Form.Item
                    name="message"
                    label={formatMessage({ id: 'const_column_message' })}
                    initialValue={userInfo.message}
                  >
                    <Input.TextArea
                      placeholder={formatMessage({
                        id: 'const_column_message',
                      })}
                      disabled
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
