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

  const STATUS_BICYCLE: any[] = [
    { name: t('biclycle_locked'), value: 'LOCKED' },
    { name: t('biclycle_rental'), value: 'RENTAL' },
    { name: t('biclycle_temporary'), value: 'TEMPORARY' },
  ];

  const STATUS_ACTIVE: any[] = [
    { name: t('status_active'), value: true },
    { name: t('status_inactive'), value: false },
  ];

  return (
    <div className={styles.searchContainer}>
      <Form form={form} className={styles.searchForm}>
        <Form.Item name="name" className={styles.searchItem}>
          <Input.Search
            placeholder={t('bicycle_search_form_name')}
            style={{ width: 240 }}
            allowClear
            onSearch={handleChange}
          />
        </Form.Item>
        <Form.Item name="licensePlate" className={styles.searchItem}>
          <Input.Search
            placeholder={t('bicycle_search_form_licensePlate')}
            style={{ width: 240 }}
            allowClear
            onSearch={handleChange}
          />
        </Form.Item>
        <Form.Item name="code" className={styles.searchItem}>
          <Input.Search
            placeholder={t('bicycle_search_form_code')}
            style={{ width: 240 }}
            allowClear
            onSearch={handleChange}
          />
        </Form.Item>
        <Form.Item name="status" className={styles.searchItem}>
          <Select
            placeholder={t('bicycle_search_form_status')}
            onChange={submit}
          >
            {STATUS_BICYCLE.map((item) => (
              <Option value={item.value}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="isActive" className={styles.searchItem}>
          <Select
            placeholder={t('bicycle_search_form_isActive')}
            onChange={submit}
          >
            {STATUS_ACTIVE.map((item) => (
              <Option value={item.value}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Button onClick={setAddpopup}>{t('general_add')}</Button>
    </div>
  );
};

export default Search;
