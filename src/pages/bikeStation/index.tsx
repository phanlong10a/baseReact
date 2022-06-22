import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Breadcrumb, Table, Tooltip, Form } from 'antd';
import { EyeOutlined, DeleteFilled } from '@ant-design/icons';
import Search from './Search';
import CustomerDialog from './CustomerDialog';
import { getTableData } from './service';
import { useAntdTable, useToggle, useSetState } from 'ahooks';

export default () => {
  const [dialog, setDiolog] = useState({
    status: false,
    id: null,
  });
  const intl = useIntl();

  const demo = [
    {
      id: 1,
      name: 'trạm 1',
      location: 'Cầu giây',
      bike_number: 4,
      parking_number: 5,
    },
    {
      id: 2,
      name: 'trạm 2',
      location: 'Cầu giây q',
      bike_number: 10,
      parking_number: 5,
    },
  ];

  const [query, setQuery] = useSetState({ name: 'huy' });
  const [form] = Form.useForm();
  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { type, changeType, submit, reset } = search;

  const columns: any[] = [
    {
      title: 'STT',
      width: 100,
      dataIndex: 'id',
      key: 'stt',
      align: 'center',
    },
    {
      title: intl.formatMessage({
        id: 'manager_bike_stattion_table_name',
      }),
      width: 100,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: intl.formatMessage({
        id: 'manager_bike_stattion_table_location',
      }),
      width: 100,
      dataIndex: 'location',
      key: 'location',
      align: 'center',
    },
    {
      title: intl.formatMessage({
        id: 'manager_bike_stattion_table_number',
      }),
      width: 100,
      dataIndex: 'bike_number',
      key: 'bike_number',
      align: 'center',
    },
    {
      title: intl.formatMessage({
        id: 'manager_bike_stattion_table_parking',
      }),
      width: 100,
      dataIndex: 'parking_number',
      key: 'parking_number',
      align: 'center',
    },
    {
      title: intl.formatMessage({
        id: 'manager_bike_stattion_table_actionr',
      }),
      width: 100,
      align: 'center',
      render: (value: any, record: any, index: number) => {
        return (
          <>
            <Tooltip title="Xem thông tin">
              <span>
                <EyeOutlined />
              </span>
            </Tooltip>
            <Tooltip title="Xem thông tin">
              <span>
                <DeleteFilled />
              </span>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          {intl.formatMessage({
            id: 'manager_bike_stattion',
            defaultMessage: 'Quản lý trạm xe',
          })}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Search submit={submit} form={form} />
      <div style={{ padding: 24, minHeight: '240px' }}>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          locale={{
            emptyText: intl.formatMessage({ id: 'const_column_empty' }),
          }}
          {...tableProps}
        />
      </div>
      <CustomerDialog
        status={dialog.status}
        onCancel={() => setDiolog({ status: false, id: null })}
      />
    </>
  );
};
