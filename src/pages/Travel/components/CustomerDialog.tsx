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
        // onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        id="form"
      >
        <Form.Item className={styles.formItem}></Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
