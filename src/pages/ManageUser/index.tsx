import { EyeOutlined } from '@ant-design/icons';
import { useAntdTable, useToggle } from 'ahooks';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Table,
  Tooltip,
  Skeleton,
  message,
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
import { getTableData } from './service';
import { getLocale } from 'umi';
import dayjs from 'dayjs';

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

  const columns: ColumnsType<DataType> = [
    {
      title: 'const_column_full_name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'general_status_account',
      dataIndex: 'status',
      key: 'status',
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {formatMessage(
              {
                id: STATUS_KYC.find(() => {
                  return record.status == record.status;
                })?.name,
              } || '',
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: 'general_kyc_type',
      dataIndex: 'kycType',
      key: 'kycType',
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {formatMessage(
              {
                id: STATUS_KYC.find(() => {
                  return record.kycType == record.kycType;
                })?.name,
              } || '',
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: 'const_column_date_of_birth',
      dataIndex: 'dateOfBirth',
      key: 'email',
      render: (_: any, record: any, index: number) => {
        return record.dateOfBirth
          ? dayjs(record.dateOfBirth).format('DD/MM/YYYY')
          : '';
      },
    },
    {
      title: 'const_column_action',
      dataIndex: 'custom',
      align: 'center',
      render: (value: any, record: any, index: number) => {
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
  ].map((item: any) => {
    return { ...item, title: formatMessage({ id: item.title }) };
  });

  const searchForm = (
    <div className={styles.searchContainer}>
      <Form form={form} className={styles.searchForm}>
        <Form.Item name="fullName" className={styles.searchItem}>
          <Input.Search
            placeholder={formatMessage({ id: 'form_search_text' })}
            allowClear
            onSearch={submit}
          />
        </Form.Item>
        {/* <Form.Item
          name="isActive"
          initialValue=""
          className={styles.searchItem}
        >
          <Select onChange={submit}>
            {STATUS_ACTIVE.map((item) => (
              <Option value={item.value}>
                {formatMessage({ id: item.name })}
              </Option>
            ))}
          </Select>
        </Form.Item> */}
      </Form>
    </div>
  );

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          {formatMessage({ id: 'user_management_list_user' })}
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
