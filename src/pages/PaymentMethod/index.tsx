import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputRef,
  message,
  Radio,
  Switch,
  Table,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import type { ColumnsType, ColumnType } from 'antd/lib/table';
import React, { useRef, useState } from 'react';
import { Location, useIntl, useRequest } from 'umi';
import styles from './index.less';
import { Image, IQueryPayment, tableData } from './interface';
import NewMethod from './NewMethod';
import {
  createPayment,
  deletePayment,
  editPayment,
  getAllPayment,
  IUpdateMethod,
} from './services';
import { ParsedQuery } from 'history-with-query/node_modules/query-string';
import { useLocation, history } from 'umi';

const ManagementPaymentMethod: React.FC = () => {
  const {
    data: tableData,
    run: requestData,
    refresh: refeshData,
  } = useRequest(getAllPayment, {
    onSuccess: () => {},
  });

  const [loading, setLoading] = useState(false);

  const { run: editMethod, loading: Editloading } = useRequest(
    async (method: IUpdateMethod, id: number) => {
      setLoading(true);
      return editPayment(method, id);
    },
    {
      manual: true,
      onSuccess: (res) => {
        setLoading(false);
        refeshData();
        message.success('update method success');
      },
      onError: () => {
        setLoading(false);
        message.error('update method failed');
      },
    },
  );

  const { run: deleteMethod } = useRequest(
    async (id: number) => {
      setLoading(true);
      return deletePayment(id);
    },
    {
      manual: true,
      onSuccess: (res) => {
        setLoading(false);
        refeshData();
        message.success('delete success');
      },
      onError: () => {
        setLoading(false);
        message.error('delete method failed');
      },
    },
  );

  type DataIndex = keyof tableData;
  const searchInput = useRef<InputRef>(null);

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<tableData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          style={{ marginBottom: 8, display: 'block' }}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => confirm()}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    render: (text) => text,
  });

  const columns: ColumnsType<tableData> = [
    {
      title: 'PHƯƠNG THỨC',
      dataIndex: 'method',
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
          </div>
        );
      },
      width: 500,
    },
    {
      title: 'deciption',
      dataIndex: 'image',
      render: (image: Image, record: tableData) => {
        return (
          <Form
            onFinish={(value) => {
              editMethod(
                {
                  description: value.description,
                  status: record.status,
                  display: record.display,
                },
                record.id,
              );
            }}
          >
            <div className={styles.deciption}>
              <Form.Item name="description" initialValue={record.description}>
                <TextArea rows={4} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                <EditOutlined />
                Save change
              </Button>
            </div>
          </Form>
        );
      },
      width: 500,
    },
    {
      title: 'status',
      dataIndex: 'status',
      filters: [
        {
          text: 'ACTIVE',
          value: 'ACTIVE',
        },
        {
          text: 'INACTIVE',
          value: 'INACTIVE',
        },
      ],
      render: (_, record: tableData) => (
        <div className={styles.edit}>
          <Switch
            checked={record.status === 'ACTIVE'}
            className={styles.switch}
            onChange={() => {
              editMethod(
                {
                  description: record.description,
                  status: record.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                  display: record.display,
                },
                record.id,
              );
            }}
          />
        </div>
      ),
      width: 100,
    },
    {
      title: 'display',
      dataIndex: 'display',
      filters: [
        {
          text: 'ON',
          value: 'ON',
        },
        {
          text: 'OFF',
          value: 'OFF',
        },
      ],
      render: (_, record: tableData) => (
        <div className={styles.edit}>
          <Switch
            defaultChecked
            className={styles.switch}
            checked={record.display === 'ON'}
            onChange={() => {
              editMethod(
                {
                  description: record.description,
                  status: record.status,
                  display: record.display === 'ON' ? 'OFF' : 'ON',
                },
                record.id,
              );
            }}
          />
        </div>
      ),
      width: 100,
    },
    {
      title: 'delete',
      dataIndex: 'name',
      render: (_, record: tableData) => (
        <div className={styles.edit}>
          <DeleteOutlined
            className={styles.delete}
            size={25}
            onClick={() => {
              deleteMethod(record.id);
            }}
          />
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
    onError: (res) => {
      message.error('failed');
    },
  });
  const location: Location = useLocation();

  const handelFilter = (query: any) => {
    history.push({ query: query });
    requestData(query);
  };
  return (
    <>
      <section className={styles.Manage_payment_method}>
        <h1>QUẢN LÝ PHƯƠNG THỨC THANH TOÁN</h1>
        <NewMethod
          handleSubmit={(method) => {
            newMethod(method);
          }}
        />
        <Table
          loading={loading}
          columns={columns}
          dataSource={tableData}
          className={styles.table_white}
          rowKey={(record) => JSON.stringify(record)}
          pagination={{
            pageSize: 10,
          }}
          onChange={(panigation, filters) => {
            const query: IQueryPayment = {
              ...location.query,
              page: panigation?.current ? panigation?.current : 1,
              pageSize: panigation?.pageSize ? panigation.pageSize : 10,
              method: filters?.method ? String(filters?.method[0]) : '--',
              status:
                filters?.status?.length === 1
                  ? String(filters?.status[0])
                  : '--',
              display:
                filters?.display?.length === 1
                  ? String(filters?.display[0])
                  : '--',
            };
            if (query.method === '--') {
              delete query.method;
            }
            if (query.status === '--') {
              delete query.status;
            }
            if (query.display === '--') {
              delete query.display;
            }
            handelFilter(query);
          }}
          title={() => (
            <div className={styles.tableheader}>
              <label>
                <p>sortBy</p>
                <Radio.Group
                  name="sortBy"
                  value={
                    location?.query?.sortBy ? location?.query?.sortBy : '--'
                  }
                  onChange={(e) => {
                    const query = {
                      ...location.query,
                      sortBy: e.target.value,
                    };
                    if (e.target.value !== '--') {
                      handelFilter(query);
                    } else {
                      delete query.sortBy;
                      handelFilter(query);
                    }
                  }}
                >
                  <Radio value={'--'}>none</Radio>
                  <Radio value={'id'}>id</Radio>
                  <Radio value={'method'}>method</Radio>
                  <Radio value={'createdAt'}>createAt</Radio>
                  <Radio value={'updatedAt'}>update AT</Radio>
                </Radio.Group>
              </label>
              <label>
                <p>orderBy</p>
                <Radio.Group
                  value={
                    location?.query?.orderBy ? location?.query?.orderBy : 'ASC'
                  }
                  onChange={(e) => {
                    const query = {
                      ...location.query,
                      orderBy: e.target.value,
                    };
                    if (e.target.value) {
                      handelFilter(query);
                    } else {
                      delete query.orderBy;
                      handelFilter(query);
                    }
                  }}
                >
                  <Radio value={'ASC'}>ASC</Radio>
                  <Radio value={'DESC'}>DESC</Radio>
                </Radio.Group>
              </label>
            </div>
          )}
        />
      </section>
    </>
  );
};
export default ManagementPaymentMethod;
