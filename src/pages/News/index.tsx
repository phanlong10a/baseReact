import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useAntdTable, useRequest, useToggle } from 'ahooks';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
  Select,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { setLocale, useIntl } from 'umi';
import Dialog from './Dialog';
import {
  STATUS_ACTIVE,
  KYC_PHOTO_TYPES,
  STATUS_KYC,
  KYC_TYPE,
  STATUS_ACCOUNT,
  OPTION_GENDER,
} from '@/utils/constant';
import styles from './index.less';
import { deleteNewsData, getTableData } from './service';
import { getLocale } from 'umi';
import { mockupData } from './constant';
import dayjs from 'dayjs';
import { StatusAccount } from '@/utils/enum';

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
  id: number;
  title: string;
  isActive: boolean;
  content: string;
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
  const { formatMessage } = useIntl();

  const { type, changeType, submit, reset } = search;

  const handleViewNews = (idUser: number | string) => {
    setIdSelected(idUser);
    setOpenDialog.set(true);
  };
  const handleDeleteUser = (idUser: number | string) => {
    requestDeleteGuide.run(idUser);
  };
  const requestDeleteGuide = useRequest(deleteNewsData, {
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
      title: 'const_column_title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (value: any, record: any, index: number) => {
        return (
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: 300,
            }}
          >
            <span> {record.description}</span>
          </div>
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
      title: 'const_column_content',
      dataIndex: 'content',
      key: 'content',
      render: (value: any, record: any, index: number) => {
        return (
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: 700,
            }}
          >
            <span> {record.content}</span>
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
                onClick={() => handleViewNews(record.id)}
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
          {formatMessage({ id: 'navigation_news' })}
        </Breadcrumb.Item>
      </Breadcrumb>
      {searchForm}
      <div className={styles.tableComponent}>
        <Table
          columns={columns}
          locale={{ emptyText: formatMessage({ id: 'const_column_empty' }) }}
          scroll={{ x: 1000 }}
          // dataSource={mockupData}
          {...tableProps}
        />
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
