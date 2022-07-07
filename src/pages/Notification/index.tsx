import { TYPE_TEMPLATE_NOTI } from '@/utils/constant';
import {
  DeleteOutlined,
  EyeOutlined,
  SendOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { useAntdTable, useRequest, useToggle } from 'ahooks';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
  Select,
  Skeleton,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useIntl } from 'umi';
import Dialog from './Dialog';
import styles from './index.less';
import { deleteNotiData, getTableData, sendNotiData } from './service';

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

  const { tableProps, search, params, refresh, loading, error } = useAntdTable(
    getTableData,
    {
      defaultPageSize: 10,
      form,
      onError: (error: any) => {
        message.error(
          error.errors ? error.errors[0] : formatMessage({ id: 'error' }),
        );
      },
    },
  );

  const { formatMessage } = useIntl();

  const { type, changeType, submit, reset } = search;

  const handleViewNoti = (idRate: number | string) => {
    setIdSelected(idRate);
    setOpenDialog.set(true);
  };
  const handleDeleteNoti = (idUser: number | string) => {
    requestDeleteNoti.run(idUser);
  };

  const handleSendNoti = (idUser: number | string) => {
    requestSendNoti.run(idUser);
  };

  const requestSendNoti = useRequest(sendNotiData, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_send_success' }));
    },
    onError: (rej: any) => {
      message.error(formatMessage({ id: 'error' }));
    },
    onFinally: () => {
      refresh();
    },
  });

  const requestDeleteNoti = useRequest(deleteNotiData, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_success' }));
    },
    onError: (rej: any) => {
      message.error(formatMessage({ id: 'error' }));
    },
    onFinally: () => {
      refresh();
    },
  });
  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      width: 100,
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'general_type_notification',
      dataIndex: 'general_type_notification',
      key: 'general_type_notification',
      render: (value: any, record: any, index: number) => {
        return (
          <>
            <span>
              {formatMessage({
                id: TYPE_TEMPLATE_NOTI.find(
                  (item: any) => item.value === record.type,
                )?.name,
              })}
            </span>
          </>
        );
      },
    },
    {
      title: 'const_column_action',
      dataIndex: 'custom',
      align: 'center',
      render: (value: any, record: any, index: number) => {
        return (
          <>
            <Tooltip title={formatMessage({ id: 'general_tooltip_send_noti' })}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleSendNoti(record.id)}
              >
                <SendOutlined />
              </span>
            </Tooltip>
            <Tooltip
              title={formatMessage({ id: 'general_tooltip_show_infomation' })}
              className="ml-16"
            >
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleViewNoti(record.id)}
              >
                <EyeOutlined />
              </span>
            </Tooltip>
            <Tooltip
              title={formatMessage({ id: 'general_tooltip_delete' })}
              className="ml-16"
            >
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteNoti(record.id)}
              >
                <DeleteOutlined />
              </span>
            </Tooltip>
          </>
        );
      },
    },
  ].map((item: any) => {
    return { ...item, title: formatMessage({ id: item.title }) };
  });

  const searchForm = (
    <div className={styles.searchContainer}>
      <Form form={form} className={styles.searchForm}>
        <Form.Item name="title" className={styles.searchItem}>
          <Input.Search
            placeholder={formatMessage({ id: 'form_search_text' })}
            allowClear
            onSearch={submit}
          />
        </Form.Item>
      </Form>
      <Button
        onClick={() => {
          setIdSelected(null);
          setOpenDialog.set(true);
        }}
      >
        {formatMessage({ id: 'general_add' })}
      </Button>
    </div>
  );

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          {formatMessage({ id: 'navigation_notification' })}
        </Breadcrumb.Item>
      </Breadcrumb>
      {searchForm}
      <div className={styles.tableComponent}>
        {loading || error ? (
          <Skeleton active />
        ) : (
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            locale={{ emptyText: formatMessage({ id: 'const_column_empty' }) }}
            scroll={{ x: 1000 }}
            {...tableProps}
          />
        )}
      </div>
      {openDialog && (
        <Dialog
          open={openDialog}
          setOpen={(b) => {
            setOpenDialog.set(b);
            refresh();
          }}
          itemEdit={idSelected}
        />
      )}
    </>
  );
};
