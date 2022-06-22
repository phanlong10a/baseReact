import React from 'react';
import { useIntl } from 'umi';
import { Button, Form, Input, Select, Table, Tooltip } from 'antd';

interface PROPS {
  submit: (e: any) => void;
  form: any;
}

const Search = (props: PROPS) => {
  const { submit, form } = props;
  const intl = useIntl();
  // const [form] = Form.useForm();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    submit({ name: value });
  };

  return (
    <div className="search-container">
      <Form form={form} className="search-form">
        <Form.Item name="name">
          <Input.Search
            placeholder={intl.formatMessage({ id: 'form_search_text' })}
            style={{ width: 240 }}
            allowClear
            onSearch={handleChange}
          />
        </Form.Item>
      </Form>
      <Button>{intl.formatMessage({ id: 'general_add' })}</Button>
    </div>
  );
};

export default Search;
