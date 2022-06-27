import React from 'react';
import { useIntl } from 'umi';
import { Button, Form, Input, Select } from 'antd';
import styles from './index.less';
import { useTranslate } from '@/utils/hooks/useTranslate';

const { Option } = Select;

interface PROPS {
  submit: (e: any) => void;
  form: any;
  setAddpopup: () => void;
}

const Search = (props: PROPS) => {
  const { submit, form, setAddpopup } = props;
  const intl = useIntl();
  const { t } = useTranslate();

  const handleChange = (value: string) => {
    submit({ name: value });
  };

  const STATUS_ACCOUNT: any[] = [
    { name: 'Hoạt động', value: true },
    { name: 'Không hoạt động', value: false },
  ];

  return (
    <div className={styles.searchContainer}>
      <Form form={form} className={styles.searchForm}>
        <Form.Item name="name" className={styles.searchItem}>
          <Input.Search
            placeholder={intl.formatMessage({ id: 'form_search_text' })}
            style={{ width: 240 }}
            allowClear
            onSearch={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="isActive"
          // initialValue={true}
          className={styles.searchItem}
        >
          <Select
            onChange={submit}
            placeholder={t('bicycle_search_form_isActive')}
            allowClear
          >
            {STATUS_ACCOUNT.map((item) => (
              <Option value={item.value}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Button onClick={setAddpopup}>
        {intl.formatMessage({ id: 'general_add' })}
      </Button>
    </div>
  );
};

export default Search;
