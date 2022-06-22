import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputRef,
  Switch,
  Table,
} from 'antd';
import type { ColumnsType, ColumnType } from 'antd/lib/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import { useIntl, useRequest } from 'umi';
import styles from './index.less';
import { Image, tableData } from './interface';
import NewMethod from './NewMethod';
import {
  createPayment,
  editPayment,
  getAllPayment,
  IMethod,
  IUpdateMethod,
} from './services';

const ManagementPaymentMethod: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {
    data: tableData,
    run: requestData,
    refresh: refeshData,
  } = useRequest(
    async (lastResult: any, params: string) => {
      return getAllPayment({
        page: 1,
        pageSize: 10,
      });
    },
    {
      onSuccess: () => {
        setSelectedRowKeys(
          tableData
            ?.filter((method: tableData) => method.isActive)
            .map((method: tableData) => method.id),
        );
      },
    },
  );

  const [loading, setLoading] = useState(false);
  const { run: editMethod, loading: Editloading } = useRequest(
    async (method: IUpdateMethod, id: number) => {
      setLoading(true);
      const r = await editPayment(method, id);
    },
    {
      manual: true,
      onSuccess: (res) => {
        setTimeout(() => {
          setLoading(false);
          refeshData();
        }, 1000);
      },
      onError: () => {
        setLoading(false);
      },
    },
  );
  type DataIndex = keyof tableData;
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<tableData> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns: ColumnsType<tableData> = [
    {
      title: 'PHƯƠNG THỨC THANH TOÁN',
      dataIndex: 'method',
      onFilter: (value, record) => record.method.includes(String(value)),
      ...getColumnSearchProps('method'),
      width: 150,
    },
    {
      title: 'Hinh anh',
      dataIndex: 'image',
      render: (image: Image, record: tableData) => {
        return (
          <div className={styles.image}>
            <img src={image.url} alt="" className={styles.image} />
            <Form
              onFinish={(value) => {
                editMethod(
                  {
                    description: value.description,
                    isActive: !record.isActive,
                    display: record.display,
                  },
                  record.id,
                );
              }}
            >
              <Input.Group compact className={styles.editDeciption}>
                <Form.Item name="description" initialValue={record.description}>
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  <EditOutlined />
                  Save change
                </Button>
              </Input.Group>
            </Form>
          </div>
        );
      },
      width: 500,
    },
    {
      title: 'sua',
      dataIndex: 'name',
      render: (_, record: tableData) => (
        <div className={styles.edit}>
          <Switch
            checkedChildren="active"
            unCheckedChildren="active"
            checked={record.isActive}
            className={styles.switch}
            onChange={() => {
              editMethod(
                {
                  description: record.description,
                  isActive: !record.isActive,
                  display: record.display,
                },
                record.id,
              );
            }}
          />
          <Switch
            checkedChildren="display"
            unCheckedChildren="display"
            defaultChecked
            className={styles.switch}
            checked={record.display === 'ON'}
            onChange={() => {
              editMethod(
                {
                  description: record.description,
                  isActive: record.isActive,
                  display: record.display === 'ON' ? 'OFF' : 'ON',
                },
                record.id,
              );
            }}
          />
          <DeleteOutlined className={styles.delete} size={25} />
        </div>
      ),
      width: 100,
    },
  ];

  const { run: newMethod } = useRequest(createPayment, {
    manual: true,
    onSuccess: (res) => {
      console.log(res);
    },
  });

  return (
    <>
      {loading && (
        <div className={styles.loading}>
          <div>
            <LoadingOutlined />
          </div>
        </div>
      )}
      <section className={styles.Manage_payment_method}>
        <h1>QUẢN LÝ PHƯƠNG THỨC THANH TOÁN</h1>
        <NewMethod
          handleSubmit={(method) => {
            newMethod(method);
          }}
        />
        <Table
          columns={columns}
          dataSource={tableData}
          className={styles.table_white}
          rowKey={(record) => JSON.stringify(record)}
        />
      </section>
    </>
  );
};
export default ManagementPaymentMethod;
