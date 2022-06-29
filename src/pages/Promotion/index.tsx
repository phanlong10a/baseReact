import { APPLICABLE, STATUS_ACCOUNT, STATUS_ACTIVE } from '@/utils/constant';
import { Applicable, StatusAccount } from '@/utils/enum';
import { EyeOutlined } from '@ant-design/icons';
import { useAntdTable, useRequest, useToggle } from 'ahooks';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
  Select,
  Skeleton,
  Switch,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'umi';
import Dialog from './Dialog';
import styles from './index.less';
import { getTableData } from './service';

const { Option } = Select;

interface ICoupon {
  id?: any;
  title?: string;
  description?: string;
  code?: string;
  discount?: number;
  startTime?: any;
  endTime?: any;
  applicable?: Applicable;
  userIds?: number[];
  status?: string;
  promotionTime?: Array<any>;
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
          error.errors[0] ? error.errors[0] : formatMessage({ id: 'error' }),
        );
      },
    },
  );

  const { formatMessage } = useIntl();

  const { type, changeType, submit, reset } = search;

  const handleViewUser = (idUser: number | string) => {
    setIdSelected(idUser);
    setOpenDialog.set(true);
  };

  const columns: ColumnsType<ICoupon> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'STT',
    },
    {
      title: 'const_column_title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'const_column_status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value: any, record: ICoupon, index: number) => {
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
      title: 'promotion_type',
      dataIndex: 'applicable',
      key: 'applicable',
      render: (value: any, record: ICoupon, index: number) => {
        return (
          <React.Fragment key={index}>
            {formatMessage(
              {
                id: APPLICABLE.find((item) => {
                  return item.value == record.applicable;
                })?.name,
              } || '',
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: 'promotion_time',
      key: 'applicable',
      render: (value: any, record: ICoupon, index: number) => {
        return (
          <React.Fragment key={index}>
            {formatMessage({
              id: 'from_date',
            }) +
              ' ' +
              dayjs(record.startTime).format('DD/MM/YYYY') +
              ' ' +
              formatMessage({
                id: 'to_date',
              }) +
              ' ' +
              dayjs(record.endTime).format('DD/MM/YYYY')}
          </React.Fragment>
        );
      },
    },
    {
      title: 'const_column_action',
      dataIndex: 'custom',
      align: 'center',
      render: (value: any, record: ICoupon, index: number) => {
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
  ].map((item: any): ColumnsType<ICoupon> => {
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
          {formatMessage({ id: 'navigation_promotion' })}
        </Breadcrumb.Item>
      </Breadcrumb>
      {searchForm}
      <div className={styles.tableComponent}>
        {loading || error ? (
          <Skeleton active />
        ) : (
          <Table
            columns={columns}
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
