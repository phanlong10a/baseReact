import React, { useState } from 'react';
import { useIntl } from 'umi';
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
  const [modalDelete, setModalDelete] = useState({
    status: false,
    id: null,
  });
  const intl = useIntl();

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
      dataIndex: 'address',
      key: 'address',
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
      dataIndex: 'parking',
      key: 'parking',
      align: 'center',
      render: (_: any, record: any, index: number) => {
        return record?.bicycles?.length;
      },
    },
    {
      title: intl.formatMessage({
        id: 'manager_bike_stattion_table_status',
      }),
      width: 100,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (_: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {record.isActive
              ? intl.formatMessage({ id: 'status_active' })
              : intl.formatMessage({ id: 'status_inactive' })}
          </React.Fragment>
        );
      },
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
              <span onClick={() => setDiolog({ status: true, id: record.id })}>
                <EyeOutlined />
              </span>
            </Tooltip>
            <Tooltip title="Xóa tram xe">
              <span
                onClick={() => setModalDelete({ status: true, id: record.id })}
              >
                <DeleteFilled />
              </span>
            </Tooltip>
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
      const url: string = `/station/${id}`;
      return privateRequest(request.delete, url, {});
    },
    {
      manual: true,
      onSuccess: (r) => {
        message.success('Xóa thành công');
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
        <Breadcrumb.Item>
          {intl.formatMessage({
            id: 'manager_bike_stattion',
            defaultMessage: 'Quản lý trạm xe',
          })}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Search submit={submit} form={form} setAddpopup={setAddpopup} />
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
      {dialog.status && (
        <CustomerDialog
          status={dialog.status}
          onCancel={() => setDiolog({ status: false, id: null })}
          id={dialog.id}
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
