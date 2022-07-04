import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Rate } from 'antd';
import styles from '../index.less';
import { getListBicycle, getListLock } from '../service';
import { useRequest } from 'ahooks';
import { privateRequest, request } from '@/utils/apis';
import { useTranslate } from '@/utils/hooks/useTranslate';
import { formatNumber } from '@/utils/common';

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

  useEffect(() => {
    if (!!id) {
      getDetailStation.run(id);
    }
  }, [id]);

  const getDetailStation = useRequest(
    async (id) => {
      return privateRequest(request.get, `/rent/${id}`, {});
    },
    {
      manual: true,
      onSuccess: (r) => {
        let status = '';
        switch (r?.status) {
          case 'COMPLETED':
            status = t('travel_status_completed');
            break;
          case 'ACTIVE':
            status = t('travel_status_active');
            break;
          case 'TEMPORARY':
            status = t('travel_status_temporary');
            break;
          default:
            break;
        }
        let payment = '';
        switch (r.paymentStatus) {
          case 'PAID':
            payment = t('travel_status_payment_paid');
            break;
          case 'FAILED':
            payment = t('travel_status_payment_failed');
            break;
          case 'UNPAID':
            payment = t('travel_status_payment_unpaid');
            break;
          default:
            break;
        }
        form.setFieldsValue({
          ...r,
          user_name: r?.user?.username,
          user_phone: r?.user?.phone ? '+' + r?.user?.phone : '',
          bicycle_name: r?.bicycle?.name,
          bicycle_licensePlate: r?.bicycle?.licensePlate,
          station_start: r?.stationStart?.name,
          station_end: r?.stationEnd?.name,
          time_start: r?.stationStart?.name,
          time_end: r?.stationEnd?.name,

          status,
          paymentStatus: payment,
          rate: r?.rating?.rating,
          message: r?.rating?.message,
          points: formatNumber(r?.points),
          countPoint: formatNumber(r?.user?.points),
        });
      },
      onError: (err: any) => {},
    },
  );

  return (
    <Modal
      title={t('travel_detail')}
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
        form={form}
        id="form"
      >
        <Form.Item>
          <div className={styles.formItem}>
            <Form.Item
              name="user_name"
              className={styles.formLeft}
              label={t('travel_detail_user')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
            <Form.Item
              name="user_phone"
              className={styles.formRight}
              label={t('travel_detail_phone')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={styles.formItem}>
            <Form.Item
              name="bicycle_name"
              className={styles.formLeft}
              label={t('travel_detail_name_bicycle')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
            <Form.Item
              name="bicycle_licensePlate"
              className={styles.formRight}
              label={t('travel_detail_licensePlate')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={styles.formItem}>
            <Form.Item
              name="station_start"
              className={styles.formLeft}
              label={t('travel_detail_station_start')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
            <Form.Item
              name="station_end"
              className={styles.formRight}
              label={t('travel_detail_station_end')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={styles.formItem}>
            <Form.Item
              name="openTime"
              className={styles.formLeft}
              label={t('travel_detail_time_start')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
            <Form.Item
              name="closeTime"
              className={styles.formRight}
              label={t('travel_detail_time_end')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={styles.formItem}>
            <Form.Item
              name="status"
              className={styles.formLeft}
              label={t('travel_detail_rent_status')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
            <Form.Item
              name="paymentStatus"
              className={styles.formRight}
              label={t('travel_detail_pay_status')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={styles.formItem}>
            <Form.Item
              name="openTime"
              className={styles.formLeft}
              label={t('travel_detail_code')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
            <Form.Item
              name="countPoint"
              className={styles.formRight}
              label={t('travel_detail_country_point')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={styles.formItem}>
            <Form.Item
              name="points"
              className={styles.formLeft}
              label={t('travel_detail_point')}
            >
              <Input disabled className={styles.input} />
            </Form.Item>
            <Form.Item
              name="closeTime"
              className={styles.formRight}
              // label={t('travel_detail_point_owe')}
            >
              {/* <Input disabled className={styles.input} /> */}
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item label={t('travel_detail_rating')} name="rate">
          <Rate disabled defaultValue={0} />
        </Form.Item>

        <Form.Item label={t('travel_detail_message')} name="message">
          <Input.TextArea rows={6} disabled className={styles.input} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
