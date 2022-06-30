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
import styles from '../index.less';
import { getListBicycle, getListLock } from '../service';
import { useDebounceFn, useRequest } from 'ahooks';
import { privateRequest, request } from '@/utils/apis';
import { useTranslate } from '@/utils/hooks/useTranslate';

const { Option } = Select;

interface PROPS {
  status: boolean;
  onCancel: () => void;
  id: any;
  onReset: () => void;
}

type Station = {
  code: string;
  isActive: boolean;
  bicycleId: any;
  id: any;
};

const CustomerDialog = (props: PROPS): JSX.Element => {
  const { t } = useTranslate();
  const { status, onCancel, id, onReset } = props;
  const [listBicycle, setListBicycle] = useState([]);
  const [listLock, setListLock] = useState([]);
  const [dataStation, setDataStation] = useState<Station>({
    id: null,
    isActive: false,
    code: '',
    bicycleId: null,
  });

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

  const requestGetListLock = useRequest(
    async (values: string) => {
      return getListLock(values);
    },
    {
      manual: true,
      onSuccess: (r) => {
        const data = r?.list?.map((e: any) => ({
          label: e?.code,
          value: e?.id,
          bicycle: e?.bicycle?.name,
        }));

        setListLock(data);
      },
      onError: (err) => {
        console.log('err', err);
      },
    },
  );

  const reqAddStation = useRequest(
    async (params) => {
      let url: string = '/lock';
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
          !!id ? t('manager_lock_message_edit') : t('manager_lock_message_add'),
        );
        // form.resetFields();
        onReset();
        onCancel();
      },
      onError: (err: any) => {
        console.log('err', err, err.response, err.data);
        message.error(err?.errors?.[0]);
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
      bicycleId: values?.bicycleId?.value
        ? values?.bicycleId?.value
        : values?.bicycleId,
    };
    if (!!id) {
      params.id = id;
    }
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
      return privateRequest(request.get, `/lock/${id}`, {});
    },
    {
      manual: true,
      onSuccess: (r) => {
        form.setFieldsValue({
          ...r,
          bicycleId: r?.bicycle?.id,
        });
      },
      onError: (err: any) => {},
    },
  );

  return (
    <Modal
      title={
        !!id
          ? t('manager_lock_form_title_edit')
          : t('manager_lock_form_title_add')
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
          label={t('manager_lock_form_code')}
          name="code"
          rules={[
            {
              required: true,
              message: t('error_require_message'),
            },
          ]}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label={t('manager_lock_form_pass')}
          name="password"
          rules={[
            {
              required: true,
              message: t('error_require_message'),
            },
          ]}
          className={styles.formItem}
        >
          <Input allowClear type="password" />
        </Form.Item>

        <Form.Item
          label={t('manager_lock_form_bluetoothMAC')}
          name="bluetoothMAC"
          rules={[
            {
              required: true,
              message: t('error_require_message'),
            },
          ]}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label={t('manager_lock_form_IMEI')}
          name="IMEI"
          rules={[
            {
              required: true,
              message: t('error_require_message'),
            },
          ]}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label={t('manager_lock_form_phone')}
          name="phone"
          rules={[
            {
              required: true,
              message: t('error_require_message'),
            },
          ]}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label={t('manager_lock_form_bicycle')}
          name="bicycleId"
          className={styles.formItem}
        >
          <Select
            showSearch
            allowClear
            onSearch={onSearch}
            options={listBicycle}
            labelInValue
            filterOption={false}
            optionLabelProp="label"
            notFoundContent={
              requestGetListBicycle.loading ? <Spin size="small" /> : null
            }
          />
        </Form.Item>

        <Form.Item
          label={t('status')}
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
