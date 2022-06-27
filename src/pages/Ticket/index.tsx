import React, { useState } from 'react';
import { useTranslate } from '@/utils/hooks/useTranslate';
import { Breadcrumb, Table, Tooltip, Form, message } from 'antd';
import { EyeOutlined, DeleteFilled } from '@ant-design/icons';
import Search from './Search';
import CustomerDialog from './components/CustomerDialog';
import ModalDialog from './components/ModalDelete';
import { getTableData } from './service';
import { useAntdTable, useToggle, useSetState, useRequest } from 'ahooks';
import { privateRequest, request } from '@/utils/apis';

export default () => {
  const [dialog, setDiolog] = useState({
    status: false,
    id: null,
  });
  const { t } = useTranslate();

  const [query, setQuery] = useSetState({ name: 'huy' });
  // const [form] = Form.useForm();
  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    // form,
  });

  const { type, changeType, submit, reset } = search;

  const columns: any[] = [
    {
      title: 'STT',
      width: 100,
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
    },
    {
      title: t('manager_ticket_table_name'),
      width: 100,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: t('manager_ticket_table_price'),
      width: 100,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: t('manager_ticket_table_type'),
      width: 100,
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: t('manager_bicycle_table_isActive'),
      width: 100,
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      render: (_: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {record.isActive ? t('status_active') : t('status_inactive')}
          </React.Fragment>
        );
      },
    },
    {
      title: t('manager_bicycle_table_actionr'),
      width: 100,
      align: 'center',
      render: (value: any, record: any, index: number) => {
        return (
          <>
            <Tooltip title="Xem thông tin">
              <span onClick={() => setDiolog({ status: true, id: record.id })}>
                <EyeOutlined />
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
        <Breadcrumb.Item>{t('manager_ticker')}</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Search submit={submit} form={form} setAddpopup={setAddpopup} /> */}
      <div style={{ padding: 24, minHeight: '240px' }}>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          locale={{
            emptyText: t('const_column_empty'),
          }}
          {...tableProps}
        />
      </div>
      {dialog.status && (
        <CustomerDialog
          status={dialog.status}
          onCancel={() => setDiolog({ status: false, id: null })}
          id={dialog.id}
          onReset={() => reset()}
        />
      )}
    </>
  );
};
