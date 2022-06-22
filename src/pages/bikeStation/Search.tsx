import React from 'react';
import { useIntl } from 'umi';
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
  const intl = useIntl();

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
          name="status"
          initialValue={true}
          className={styles.searchItem}
        >
          <Select onChange={submit}>
            {STATUS_ACCOUNT.map((item) => (
              <Option value={item.value}>
                {/* {formatMessage({ id: item.name })} */}
                {item.name}
              </Option>
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
