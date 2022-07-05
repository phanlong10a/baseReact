import React from 'react';
import { useTranslate } from '@/utils/hooks/useTranslate';
import { Button, Form, Input, Select, Table, Tooltip } from 'antd';
import styles from './index.less';

const { Option } = Select;

interface PROPS {
  submit: (e: any) => void;
  form: any;
  setAddpopup: () => void;
}

const Search = (props: PROPS) => {
  const { submit, form, setAddpopup } = props;
  const { t } = useTranslate();

  const handleChange = (value: string) => {
    submit({ name: value });
  };

  const STATUS_PAYMENT: any[] = [
    { name: t('travel_status_payment_paid'), value: 'PAID' },
    { name: t('travel_status_payment_unpaid'), value: 'UNPAID' },
    { name: t('travel_status_payment_failed'), value: 'FAILED' },
  ];

  const STATUS_ACTIVE: any[] = [
    { name: t('travel_status_completed'), value: 'COMPLETED' },
    { name: t('travel_status_active'), value: 'ACTIVE' },
    { name: t('travel_status_temporary'), value: 'TEMPORARY ' },
  ];

  return (
    <div className={styles.searchContainer}>
      <Form form={form} className={styles.searchForm}>
        <Form.Item name="status" className={styles.searchItem}>
          <Select
            placeholder={t('travel_search_status')}
            onChange={submit}
            allowClear
          >
            {STATUS_ACTIVE.map((item) => (
              <Option value={item.value}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="paymentStatus" className={styles.searchItem}>
          <Select
            placeholder={t('travel_search_status_payment')}
            onChange={submit}
            allowClear
          >
            {STATUS_PAYMENT.map((item) => (
              <Option value={item.value}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      {/* <Button onClick={setAddpopup}>{t('general_add')}</Button> */}
    </div>
  );
};

export default Search;
