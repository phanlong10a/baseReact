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
      title: t('manager_bicycle_table_name'),
      width: 100,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: t('manager_bicycle_table_licensePlate'),
      width: 100,
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      align: 'center',
    },
    {
      title: t('manager_bicycle_table_code'),
      width: 100,
      dataIndex: 'locks',
      key: 'locks',
      align: 'center',
      render: (_: any, record: any, index: number) => {
        return record?.locks[0]?.code;
      },
    },
    {
      title: t('manager_bicycle_table_battery'),
      width: 100,
      dataIndex: 'battery',
      key: 'battery',
      align: 'center',
    },
    {
      title: t('manager_bicycle_table_status'),
      width: 100,
      dataIndex: 'parking',
      key: 'parking',
      align: 'center',
      render: (_: any, record: any, index: number) => {
        let text = '';
        switch (record.status) {
          case 'LOCKED':
            text = t('biclycle_locked');
            break;
          case 'RENTAL':
            text = t('biclycle_rental');
            break;
          case 'TEMPORARY':
            text = t('biclycle_temporary');
            break;
          default:
            break;
        }
        return text;
      },
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
      const url: string = `/bicycle/${id}`;
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
        <Breadcrumb.Item>{t('manager_title_bicycle')}</Breadcrumb.Item>
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
