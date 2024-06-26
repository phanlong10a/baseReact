import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Spin,
  Switch,
  message,
} from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import styles from '../index.less';
import { getListBicycle } from '../service';
import { useDebounceFn, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { privateRequest, request } from '@/utils/apis';
import TimePicker from '../../../components/CustomPicker/TimePicker';
import { useTranslate } from '@/utils/hooks/useTranslate';

const { Option } = Select;

interface PROPS {
  status: boolean;
  onCancel: () => void;
  id: any;
  onReset: () => void;
}

type Station = {
  id: number;
  name: string;
  address: string;
  bicycles: any[];
  parking: number;
  openTime: string;
  closeTime: string;
  isActive: boolean;
};

const CustomerDialog = (props: PROPS): JSX.Element => {
  const { t } = useTranslate();
  const { status, onCancel, id, onReset } = props;
  const [listBicycle, setListBicycle] = useState([]);
  const [dataStation, setDataStation] = useState<Station>();

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
      let url: string = '/station';
      if (!!params?.id) {
        url = `${url}/${params.id}`;
      }
      return privateRequest(!!params?.id ? request.put : request.post, url, {
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: (r) => {
        message.success(
          !!id
            ? t('manager_bike_stattion_message_edit')
            : t('manager_bike_stattion_message_add'),
        );
        // form.resetFields();
        onReset();
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
    if (!!id) {
      params.id = id;
    }
    // console.log(params);
    // return;
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

  const getDetailStation = useRequest(
    async (id) => {
      return privateRequest(request.get, `/station/${id}`, {});
    },
    {
      manual: true,
      onSuccess: (r) => {
        setDataStation(r);
        const nowFormat = dayjs().format('MM/DD/YYYY');
        form.setFieldsValue({
          ...r,
          bike_number: r?.bicycles?.map((e: any) => ({
            label: e.name,
            value: e.id,
          })),
          openTime: dayjs(`${nowFormat} ,${r?.openTime}`),
          closeTime: dayjs(`${nowFormat} ,${r?.closeTime}`),
        });
      },
      onError: (err: any) => {},
    },
  );

  return (
    <Modal
      title={
        !!id
          ? t('manager_bike_stattion_form_title_edit')
          : t('manager_bike_stattion_form_title_add')
      }
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
          label={t('manager_bike_stattion_form_name')}
          name="name"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'error_require_message',
                defaultMessage: 'Không được để trống trường này',
              }),
            },
          ]}
          // normalize={(value) => value.trim()}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label={t('manager_bike_stattion_form_address')}
          name="address"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'error_require_message',
                defaultMessage: 'Không được để trống trường này',
              }),
            },
          ]}
          // normalize={(value) => value.trim()}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label={t('manager_bike_stattion_form_bicycle')}
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
            // optionLabelProp="label"
            notFoundContent={
              requestGetListBicycle.loading ? <Spin size="small" /> : null
            }
          />
        </Form.Item>

        <Form.Item
          label={t('manager_bike_stattion_form_parking')}
          name="parking"
          className={styles.formItem}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label={t('manager_bike_stattion_form_time')}>
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
          label={t('manager_bike_stattion_form_status')}
          name="isActive"
          className={styles.formItem}
          valuePropName="checked"
        >
          <Switch
            checkedChildren={t('status_active')}
            unCheckedChildren={t('status_inactive')}
          />
        </Form.Item>
        <div className={styles.addGroupButton}>
          <Button danger className={styles.button} onClick={() => onCancel()}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            {!!id
              ? t('manager_bike_stattion_button_edit')
              : t('manager_bike_stattion_button_add')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
