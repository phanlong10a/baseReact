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
import { getListBicycle } from '../service';
import { useDebounceFn, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { privateRequest, request } from '@/utils/apis';

const { Option } = Select;

interface PROPS {
  status: boolean;
  onCancel: () => void;
  id: any;
}

const CustomerDialog = (props: PROPS): JSX.Element => {
  const { status, onCancel, id } = props;
  const [listBicycle, setListBicycle] = useState([]);
  const [dataStation, setDataStation] = useState(undefined);

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
    },
    {
      manual: true,
      onSuccess: (r) => {
        message.success('Thêm mới trạm xe thành công');
        form.resetFields();
        onCancel();
      },
      onError: (err: any) => {
        console.log('err', err, err.response, err.data);
        message.error(err?.data?.message);
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
      openTime: values.openTime ? dayjs(values.openTime).format('HH:mm') : null,
      closeTime: values.closeTime
        ? dayjs(values.closeTime).format('HH:mm')
        : null,

      lat: 21.00214,
      long: 105.80842,
      bicyleIds: values?.bike_number?.map((e: any) => e.value),
    };
    reqAddStation.run(params);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (!!id) {
      getDetailStation.run(id);
    }
  }, [id]);

  console.log(dataStation);

  const getDetailStation = useRequest(
    async (id) => {
      return privateRequest(request.get, `/station/${id}`, {});
    },
    {
      manual: true,
      onSuccess: (r) => {
        setDataStation(r);
        // form.setFieldsValue({
        //   openTime: dayjs(r.openTime),
        // });
      },
      onError: (err: any) => {},
    },
  );

  return (
    <Modal
      title={!!id ? 'Sửa trạm xe' : 'Thêm mới trạm xe'}
      centered
      visible={status}
      width={720}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        name="basic"
        initialValues={dataStation}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        id="form"
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
            {!!id ? 'Cập nhật trạng thái' : 'Thêm mới'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
