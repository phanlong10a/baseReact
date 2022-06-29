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
import dayjs from 'dayjs';

export default () => {
  const [dialog, setDiolog] = useState({
    status: false,
    id: null,
  });
  const [modalDelete, setModalDelete] = useState({
    status: false,
    id: null,
  });
  const { t } = useTranslate();

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
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
    },
    {
      title: t('travel_table_start_time'),
      width: 100,
      dataIndex: 'start',
      key: 'start',
      align: 'center',
      render: (_: any, record: any, index: any) => {
        return dayjs(record?.createdAt).format('DD/MM/YYYY HH:mm:ss');
      },
    },
    {
      title: t('travel_table_end_time'),
      width: 100,
      dataIndex: 'bicycle',
      key: 'bicycle',
      align: 'center',
      render: (_: any, record: any, index: number) => {
        return record?.returnTime
          ? dayjs(record?.returnTime).format('DD/MM/YYYY HH:mm:ss')
          : '';
      },
    },
    {
      title: t('travel_table_status_payment'),
      width: 100,
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      align: 'center',
      render: (_: any, record: any, index: number) => {
        let text = '';
        switch (record.paymentStatus) {
          case 'PAID':
            text = t('travel_status_payment_paid');
            break;
          case 'FAILED':
            text = t('travel_status_payment_failed');
            break;
          case 'UNPAID':
            text = t('travel_status_payment_unpaid');
            break;
          default:
            break;
        }
        return text;
      },
    },

    {
      title: t('travel_table_points'),
      width: 100,
      dataIndex: 'points',
      key: 'points',
      align: 'center',
    },
    {
      title: t('travel_table_status'),
      width: 100,
      dataIndex: 'ready',
      key: 'ready',
      align: 'center',
      render: (_: any, record: any, index: number) => {
        let text = '';
        switch (record.status) {
          case 'COMPLETED':
            text = t('travel_status_completed');
            break;
          case 'ACTIVE':
            text = t('travel_status_active');
            break;
          default:
            break;
        }
        return text;
      },
    },
    {
      title: t('manager_bicycle_table_action'),
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
            {/* <Tooltip title="Xóa tram xe">
              <span
                onClick={() => setModalDelete({ status: true, id: record.id })}
              >
                <DeleteFilled />
              </span>
            </Tooltip> */}
          </>
        );
      },
    },
  ];

  const setAddpopup = () => {
    setDiolog({
      status: true,
      id: null,
    });
  };

  const deleteStation = useRequest(
    async (id) => {
      const url: string = `/lock/${id}`;
      return privateRequest(request.delete, url, {});
    },
    {
      manual: true,
      onSuccess: (r) => {
        message.success(t('message_delete_item_success'));
        reset();
        setModalDelete({ status: false, id: null });
      },
      onError: (err: any) => {
        // console.log('err', err, err.response, err.data);
        message.error(err?.data?.message);
      },
    },
  );

  const handDelete = (id: any) => {
    deleteStation.run(id);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{t('travel')}</Breadcrumb.Item>
      </Breadcrumb>
      <Search submit={submit} form={form} setAddpopup={setAddpopup} />
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
      {modalDelete.status && (
        <ModalDialog
          status={modalDelete.status}
          onCancel={() => setModalDelete({ status: false, id: null })}
          onOk={(id) => handDelete(id)}
          id={modalDelete.id}
        />
      )}
    </>
  );
};
