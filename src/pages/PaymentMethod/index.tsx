import { PAYMENT_TYPE } from '@/utils/constant';
import { StatusAccount } from '@/utils/enum';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAntdTable, useRequest, useToggle } from 'ahooks';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
  Modal,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useIntl } from 'umi';
import Dialog from './Dialog';
import styles from './index.less';
import { deletePaymentData, getTableData } from './service';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}
interface DataType {
  id: number;
  title: string;
  isActive: boolean;
  content: string;
}

export default () => {
  const [openDialog, setOpenDialog] = useToggle(false);
  const [modal, contextHolder] = Modal.useModal();
  const [idSelected, setIdSelected] = React.useState<number | string | null>(
    null,
  );
  const [form] = Form.useForm();

  const { tableProps, search, params, refresh } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });
  const { formatMessage } = useIntl();

  const { type, changeType, submit, reset } = search;

  const handleViewUser = (idUser: number | string) => {
    setIdSelected(idUser);
    setOpenDialog.set(true);
  };
  const handleDeleteUser = (idUser: number | string) => {
    modal.confirm({
      title: formatMessage({ id: 'should_delete' }),
      okText: formatMessage({ id: 'ok_text' }),
      cancelText: formatMessage({ id: 'cancel_text' }),
      onOk: () => {
        requestDeleteGuide.run(idUser);
      },
    });
  };

  const requestDeleteGuide = useRequest(deletePaymentData, {
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
      title: 'method_name',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'payment_type',
      dataIndex: 'paymentType',
      key: 'paymentType',
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {formatMessage(
              {
                id: PAYMENT_TYPE.find((item) => {
                  return item.value == record.paymentType;
                })?.name,
              } || '',
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: 'const_column_status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {record.status === StatusAccount.ACTIVE
              ? formatMessage({ id: 'status_active' })
              : formatMessage({ id: 'status_inactive' })}
          </React.Fragment>
        );
      },
    },
    {
      title: 'const_column_description_image',
      dataIndex: 'description',
      key: 'description',
      render: (value: any, record: any, index: number) => {
        return (
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <span>
              {record.image ? (
                <a
                  href={record.image.url}
                  title="description"
                  target="_blank"
                  className={styles.tableImageContent}
                >
                  {formatMessage({ id: 'image' })}
                </a>
              ) : (
                ''
              )}
              {record.description}
            </span>
          </div>
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
            <Tooltip
              title={formatMessage({ id: 'general_tooltip_show_infomation' })}
            >
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleViewUser(record.id)}
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
                onClick={() => handleDeleteUser(record.id)}
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
        <Form.Item name="method" className={styles.searchItem}>
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
          {formatMessage({ id: 'navigation_method' })}
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
      {contextHolder}
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
