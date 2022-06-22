import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Spin,
  TimePicker,
  Switch,
  message,
} from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import styles from '../index.less';
import { addStation, getListBicycle } from '../service';
import { useDebounceFn, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { privateRequest, request } from '@/utils/apis';

const { Option } = Select;

interface PROPS {
  status: boolean;
  onCancel: () => void;
}

const CustomerDialog = (props: PROPS): JSX.Element => {
  const { status, onCancel } = props;
  const [listBicycle, setListBicycle] = useState([]);
  const intl = useIntl();
  const [form] = Form.useForm();

  const requestGetListBicycle = useRequest(
    async (values: string) => {
      return getListBicycle(values);
    },
    {
      manual: true,
      onSuccess: (r) => {
        const data = r?.list?.map((e: any) => ({ label: e.name, value: e.id }));
        setListBicycle(data);
      },
      onError: (err) => {
        console.log('err', err);
      },
    },
  );

  const reqAddStation = useRequest(
    async (params) => {
      return privateRequest(request.post, '/station', {
        data: params,
      });
      // return addStation(params);
    },
    {
      manual: true,
      onSuccess: (r) => {},
      onError: (err) => {
        console.log('err', err, err.response, err.data);

        // if (err?.statusCode === 400) {
        //   message.error(err.message);
        // } else {
        //   message.success('Thêm mới trạm xe thành công');
        //   form.resetFields(['first_name', 'second_name', 'email']);
        // }
      },
    },
  );

  useEffect(() => {
    requestGetListBicycle.run('');
  }, []);

  const onFiltersChangeDebounce = useDebounceFn(
    async (values: string) => {
      requestGetListBicycle.run(values);
    },
    {
      wait: 500,
    },
  );

  const onSearch = useCallback((values: string) => {
    onFiltersChangeDebounce.run(values);
  }, []);

  const onFinish = async (values: any) => {
    const params = {
      ...values,
      // openTime: values.openTime ? dayjs(values.openTime).format('HH:mm') : null,
      closeTime: values.closeTime
        ? dayjs(values.closeTime).format('HH:mm')
        : null,

      lat: 21.00214,
      long: 105.80842,
      bicyleIds: values?.bike_number?.map((e: any) => e.value),
    };
    reqAddStation.run(params);
    // const req: any = await addStation(params);
    // console.log(req);

    // if (req?.statusCode === 400) {
    //   message.error(req.message);
    // } else {
    //   message.success('Thêm mới trạm xe thành công');
    //   form.resetFields(['first_name', 'second_name', 'email']);
    // }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Thêm mới trạm xe"
      centered
      visible={status}
      width={720}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        name="basic"
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label={<FormattedMessage id="in" defaultMessage="Tên trạm xe" />}
          name="name"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'i',
                defaultMessage: 'Không được để trống trường này',
              }),
            },
          ]}
          normalize={(value) => value.trim()}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="in" defaultMessage="Vị trí" />}
          name="address"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'i',
                defaultMessage: 'Không được để trống trường này',
              }),
            },
          ]}
          normalize={(value) => value.trim()}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="in" defaultMessage="Số xe có trong trạm" />
          }
          name="bike_number"
          className={styles.formItem}
        >
          <Select
            mode="multiple"
            allowClear
            onSearch={onSearch}
            options={listBicycle}
            labelInValue
            filterOption={false}
            notFoundContent={
              requestGetListBicycle.loading ? <Spin size="small" /> : null
            }
          />
        </Form.Item>

        <Form.Item
          label={
            <FormattedMessage id="in" defaultMessage="Số lượng chỗ đỗ xe" />
          }
          name="parking"
          className={styles.formItem}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Giờ mở cửa - Giờ đóng cửa">
          <div style={{ display: 'flex' }}>
            <Form.Item name="openTime" className={styles.button}>
              <TimePicker format={'HH:mm'} />
            </Form.Item>
            <Form.Item name="closeTime">
              <TimePicker format={'HH:mm'} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          label="Trạng thái trạm xe"
          name="isActive"
          className={styles.formItem}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <div className={styles.addGroupButton}>
          <Button danger className={styles.button} onClick={() => onCancel()}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
