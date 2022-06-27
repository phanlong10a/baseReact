import { EyeOutlined } from '@ant-design/icons';
import { useAntdTable, useToggle, useRequest } from 'ahooks';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Switch,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { setLocale, useIntl } from 'umi';
import Dialog from './Dialog';
import styles from './index.less';
import { getTableData, switchStatusUser } from './service';
import { getLocale } from 'umi';
import { STATUS_ACCOUNT, STATUS_ACTIVE } from '@/utils/constant';

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

  const { tableProps, search, params, refresh } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });

  const requestSwitchStatus = useRequest(switchStatusUser, {
    manual: true,
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
      align: 'center',
      key: 'active',
      width: 250,
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            <Switch
              style={{ width: 150 }}
              checkedChildren={formatMessage({ id: 'status_active' })}
              unCheckedChildren={formatMessage({ id: 'status_inactive' })}
              defaultChecked={record.isActive}
              onChange={(checked: boolean, event: MouseEvent) => {
                requestSwitchStatus.run(record, checked);
              }}
            />
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
          <Tooltip
            title={formatMessage({ id: 'general_tooltip_show_infomation' })}
          >
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
    <div className={styles.searchContainer}>
      <Form form={form} className={styles.searchForm}>
        <Form.Item name="fullName" className={styles.searchItem}>
          <Input.Search
            placeholder={formatMessage({ id: 'form_search_text' })}
            allowClear
            onSearch={submit}
          />
        </Form.Item>
        <Form.Item name="status" initialValue="" className={styles.searchItem}>
          <Select onChange={submit}>
            {STATUS_ACCOUNT.map((item) => (
              <Option value={item.value}>
                {formatMessage({ id: item.name })}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="isActive"
          initialValue=""
          className={styles.searchItem}
        >
          <Select onChange={submit}>
            {STATUS_ACTIVE.map((item) => (
              <Option value={item.value}>
                {formatMessage({ id: item.name })}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          {formatMessage({ id: 'navigation_user_wallet' })}
        </Breadcrumb.Item>
      </Breadcrumb>
      {searchForm}
      <div className={styles.tableComponent}>
        <Table
          columns={columns}
          locale={{ emptyText: formatMessage({ id: 'const_column_empty' }) }}
          scroll={{ x: 1000 }}
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