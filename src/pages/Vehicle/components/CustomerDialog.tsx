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
import { getListStation, getListLock } from '../service';
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
  name: string;
  isActive: boolean;
  licensePlate: any;
  lockId: any;
  stationId: any;
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
    name: '',
    licensePlate: null,
    lockId: null,
    stationId: null,
  });

  const intl = useIntl();
  const [form] = Form.useForm();

  const requestGetListBicycle = useRequest(
    async (values: string) => {
      return getListStation(values);
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
      let url: string = '/bicycle';
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
    requestGetListLock.run('');
  }, []);

  const onFiltersChangeDebounce = useDebounceFn(
    async (values: string) => {
      requestGetListBicycle.run(values);
    },
    {
      wait: 500,
    },
  );

  const onFiltersLockChangeDebounce = useDebounceFn(
    async (values: string) => {
      requestGetListLock.run(values);
    },
    {
      wait: 500,
    },
  );

  const onSearch = useCallback((values: string) => {
    onFiltersChangeDebounce.run(values);
  }, []);

  const onSearchLock = useCallback((values: string) => {
    onFiltersLockChangeDebounce.run(values);
  }, []);

  const onFinish = async (values: any) => {
    const params = {
      ...values,
      lockId: values?.lockId?.value ? values?.lockId?.value : values?.lockId,
      stationId: values?.stationId?.value
        ? values?.stationId?.value
        : values?.stationId,
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
      return privateRequest(request.get, `/bicycle/${id}`, {});
    },
    {
      manual: true,
      onSuccess: (r) => {
        form.setFieldsValue({
          ...r,
          stationId: r?.station?.id,
          lockId: r?.locks[0]?.id,
        });
      },
      onError: (err: any) => {},
    },
  );

  return (
    <Modal
      title={!!id ? 'Sửa xe' : 'Thêm mới xe'}
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
          label={<FormattedMessage id="in" defaultMessage="Tên xe" />}
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
          label={<FormattedMessage id="in" defaultMessage="Biển số xe" />}
          name="licensePlate"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'error_require_message',
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
          label={<FormattedMessage id="in" defaultMessage="Trạm xe" />}
          name="stationId"
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
          label={<FormattedMessage id="in" defaultMessage="Mã khóa xe" />}
          name="lockId"
          className={styles.formItem}
        >
          <Select
            // mode="multiple"
            showSearch
            allowClear
            onSearch={onSearchLock}
            // options={listLock}
            labelInValue
            filterOption={false}
            // optionLabelProp="label"
            notFoundContent={
              requestGetListLock.loading ? <Spin size="small" /> : null
            }
          >
            {listLock.map((it: any) => {
              return (
                <Select.Option key={it.value} value={it.value}>
                  {`${it?.label} ${
                    it.bicycle ? `- đang gán xe ${it?.bicycle}` : ''
                  }`}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Trạng thái xe"
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
            {!!id ? 'Cập nhật trạng thái' : 'Thêm mới'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
