import { EyeOutlined } from '@ant-design/icons';
import { useAntdTable, useToggle } from 'ahooks';
import { Breadcrumb, Form, Input, Select, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useIntl } from 'umi';
import Dialog from './Components/dialog';
import { STATUS_ACCOUNT, STATUS_ACTIVE } from './constant';
import './index.less';
import { getTableData } from './service';

const { Option } = Select;

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default () => {
  const [openDialog, setOpenDialog] = useToggle(false);
  const [idSelected, setIdSelected] = React.useState<number | string | null>(
    null,
  );
  const [form] = Form.useForm();

  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });
  const { formatMessage } = useIntl();

  const { type, changeType, submit, reset } = search;

  const handleViewUser = (idUser: number | string) => {
    setIdSelected(idUser);
    setOpenDialog.set(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'const_column_full_name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'const_column_phone_number',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {record.phone ? '+' + record.phone : ''}
          </React.Fragment>
        );
      },
    },
    {
      title: 'const_column_email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'const_column_date_of_birth',
      dataIndex: 'dateOfBirth',
      key: 'email',
    },
    {
      title: 'const_column_status',
      dataIndex: 'active',
      key: 'active',
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {record.isActive
              ? formatMessage({ id: 'status_active' })
              : formatMessage({ id: 'status_inactive' })}
          </React.Fragment>
        );
      },
    },
    {
      title: 'const_column_action',
      dataIndex: 'custom',
      align: 'center',
      render: (value: any, record: any, index: number) => {
        return (
          <Tooltip title="Xem thông tin">
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => handleViewUser(record.id)}
            >
              <EyeOutlined />
            </div>
          </Tooltip>
        );
      },
    },
  ].map((item: any) => {
    return { ...item, title: formatMessage({ id: item.title }) };
  });

  const searchForm = (
    <div className="search-container">
      <Form form={form} className="search-form w-100">
        <Form.Item name="status" initialValue="" className="search-item">
          <Select onChange={submit}>
            {STATUS_ACCOUNT.map((item) => (
              <Option value={item.value}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="isActive" initialValue="" className="search-item">
          <Select onChange={submit}>
            {STATUS_ACTIVE.map((item) => (
              <Option value={item.value}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="fullName">
          <Input.Search
            placeholder={formatMessage({ id: 'form_search_text' })}
            style={{ width: 240 }}
            allowClear
            onSearch={submit}
          />
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          {formatMessage({ id: 'user_management' })}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {formatMessage({ id: 'user_management_list_user' })}
        </Breadcrumb.Item>
      </Breadcrumb>
      {searchForm}
      <div style={{ padding: 24, minHeight: '240px' }}>
        <Table
          columns={columns}
          locale={{ emptyText: formatMessage({ id: 'const_column_empty' }) }}
          {...tableProps}
        />
      </div>
      {openDialog && (
        <Dialog
          open={openDialog}
          setOpen={(b) => setOpenDialog.set(b)}
          itemEdit={idSelected}
        />
      )}
    </>
  );
};