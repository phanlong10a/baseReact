import React, { useState } from 'react';
import { useIntl } from 'umi';
import { Breadcrumb, Table, Tooltip, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Search from './Search';
import CustomerDialog from './CustomerDialog';

export default () => {
  const [dialog, setDiolog] = useState({
    status: true,
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
          <Tooltip
            title={formatMessage({ id: 'general_tooltip_show_infomation' })}
          >
            <div style={{ cursor: 'pointer' }}>
              <EyeOutlined />
            </div>
          </Tooltip>
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
        {/* <Breadcrumb.Item>
          {intl.formatMessage({
            id: 'demo',
            defaultMessage: 'Danh sách trạm xe',
          })}
        </Breadcrumb.Item> */}
      </Breadcrumb>
      <Search />
      <div style={{ padding: 24, minHeight: '240px' }}>
        <Table
          columns={columns}
          dataSource={demo}
          rowKey={(record) => record.id}
          locale={{
            emptyText: intl.formatMessage({ id: 'const_column_empty' }),
          }}
          // {...tableProps}
        />
      </div>
      <CustomerDialog
        status={dialog.status}
        onCancel={() => setDiolog({ status: false, id: null })}
      />
    </>
  );
};
