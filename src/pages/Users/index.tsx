import {
  OPTION_STATUS_ACTIVE,
  STATUS_ACCOUNT,
  STATUS_KYC,
} from '@/utils/constant';
import { StatusAccount } from '@/utils/enum';
import { EyeOutlined } from '@ant-design/icons';
import { useAntdTable, useRequest, useToggle } from 'ahooks';
import {
  Breadcrumb,
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
import React from 'react';
import { useIntl } from 'umi';
import Dialog from './Dialog';
import styles from './index.less';
import { getTableData, switchStatusUser } from './service';

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

  console.log(error);

  const requestSwitchStatus = useRequest(switchStatusUser, {
    manual: true,
    onSuccess: (res: any) => {
      message.success(formatMessage({ id: 'message_user_success' }));
      refresh();
    },
    onError: (rej: any) => {
      message.error(formatMessage({ id: 'message_user_failure' }));
      refresh();
    },
  });

  const { formatMessage } = useIntl();

  const { type, changeType, submit, reset } = search;

  const handleViewUser = (idUser: number | string) => {
    setIdSelected(idUser);
    setOpenDialog.set(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      width: 100,
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
    },
    {
      title: 'const_column_full_name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'const_column_phone_number',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {record.phone ? '+' + record.phone : ''}
          </React.Fragment>
        );
      },
    },
    {
      title: 'const_column_email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'const_column_date_of_birth',
      dataIndex: 'dateOfBirth',
      key: 'email',
    },
    {
      title: 'general_status_account',
      dataIndex: 'status',
      key: 'status',
      render: (value: any, record: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {record.kyc[0]
              ? formatMessage(
                  {
                    id: STATUS_KYC.find((item) => {
                      return item.value == record.kyc[0].status;
                    })?.name,
                  } || '',
                )
              : formatMessage({
                  id: 'general_kyc_not_verified',
                })}
          </React.Fragment>
        );
      },
    },
    {
      title: 'const_column_status',
      dataIndex: 'active',
      align: 'center',
      key: 'active',
      width: 250,
      render: (value: any, record: any, index: number) => {
        console.log(record);
        return (
          <React.Fragment key={index}>
            <Switch
              style={{ width: 150 }}
              checkedChildren={formatMessage({ id: 'status_active' })}
              unCheckedChildren={formatMessage({ id: 'status_inactive' })}
              defaultChecked={record.status == StatusAccount.ACTIVE}
              onChange={(checked: boolean, event: MouseEvent) => {
                switch (record.status) {
                  case StatusAccount.ACTIVE:
                    requestSwitchStatus.run(record, StatusAccount.INACTIVE);
                    break;
                  case StatusAccount.INACTIVE:
                    requestSwitchStatus.run(record, StatusAccount.ACTIVE);
                    break;
                }
              }}
            />
          </React.Fragment>
        );
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
        <Form.Item name="statusKyc" className={styles.searchItem}>
          <Select
            onChange={submit}
            allowClear
            placeholder={formatMessage({ id: 'general_status_account' })}
          >
            {STATUS_KYC.map((item) => (
              <Option value={item.value}>
                {formatMessage({ id: item.name })}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" className={styles.searchItem}>
          <Select
            onChange={submit}
            allowClear
            placeholder={formatMessage({ id: 'general_status_active' })}
          >
            {OPTION_STATUS_ACTIVE.map((item) => (
              <Option value={item.value}>
                {formatMessage({ id: item.name })}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
