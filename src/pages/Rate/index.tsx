import { EyeOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { useAntdTable, useToggle } from 'ahooks';
import {
  Breadcrumb,
  Form,
  Input,
  message,
  Rate,
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
import { getTableData } from './service';

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

  const handleViewRate = (idRate: number | string) => {
    setIdSelected(idRate);
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
      title: 'const_column_star',
      dataIndex: 'rating',
      key: 'rating',
      width: 220,
      render: (value: any, record: any, index: number) => {
        return (
          <span>
            {/* {[...new Array(5)].map((arr, index) => {
              return index > record.rating ? <StarOutlined /> : <StarFilled />;
            })} */}
            <Rate value={record.rating} />
          </span>
        );
      },
    },
    {
      title: 'const_column_message',
      dataIndex: 'message',
      key: 'message',
    },
    // {
    //   title: 'const_column_action',
    //   dataIndex: 'custom',
    //   align: 'center',
    //   render: (value: any, record: any, index: number) => {
    //     return (
    //       <Tooltip
    //         title={formatMessage({ id: 'general_tooltip_show_infomation' })}
    //       >
    //         <div
    //           style={{ cursor: 'pointer' }}
    //           onClick={() => handleViewRate(record.id)}
    //         >
    //           <EyeOutlined />
    //         </div>
    //       </Tooltip>
    //     );
    //   },
    // },
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
      </Form>
    </div>
  );

  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          {formatMessage({ id: 'navigation_rate' })}
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
