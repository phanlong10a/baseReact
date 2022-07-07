import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select, message } from 'antd';
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
      let url: string = '/ticket';
      if (!!params?.id) {
        url = `${url}/${params.id}`;
      }
      return privateRequest(request.put, url, {
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: (r) => {
        message.success(t('manager_ticket_message_edit'));
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
      return privateRequest(request.get, `/ticket/${id}`, {});
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
        !!id ? t('manager_ticket_title_edit') : t('manager_lock_form_title_add')
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
          label={t('manager_ticket_form_name')}
          name="name"
          rules={[
            {
              required: true,
              message: t('error_require_message'),
            },
          ]}
          // normalize={(value) => value.trim()}
          className={styles.formItem}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label={t('manager_ticket_form_price')}
          name="price"
          className={styles.formItem}
          // normalize={(value) => {
          //   return value.replace(/[^\d.,-]/g, '');
          // }}
        >
          <InputNumber
            style={{ width: '100%' }}
            precision={2}
            step={0.1}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            // type="number"
            // min={0}
          />
        </Form.Item>

        <Form.Item
          label={t('manager_ticket_form_minutesForOriginalPrice')}
          name="minutesForOriginalPrice"
          className={styles.formItem}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item
          label={t('manager_ticket_form_overTimePrice')}
          name="overTimePrice"
          className={styles.formItem}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item
          label={t('manager_ticket_form_minutesForOverTimePrice')}
          name="minutesForOverTimePrice"
          className={styles.formItem}
        >
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <div className={styles.addGroupButton}>
          <Button danger className={styles.button} onClick={() => onCancel()}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            {t('manager_bike_stattion_button_edit')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
