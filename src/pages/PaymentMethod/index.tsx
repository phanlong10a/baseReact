import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, InputRef, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/lib/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import { useIntl, useRequest } from 'umi';
import styles from './index.less';
import { Image, tableData } from './interface';
import { createPayment, getAllPayment } from './services';

const ManagementPaymentMethod: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  type DataIndex = keyof tableData;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
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
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      onFilter: (value, record) => record.method.includes(String(value)),
      ...getColumnSearchProps('method'),
    },
    {
      title: 'hinh anh',
      dataIndex: 'image',
      render: (image: Image) => {
        return <img src={image.url} alt="" />;
      },
    },
    {
      title: 'ten',
      dataIndex: 'name',
      render: () => <DeleteOutlined className="pointer" />,
    },
  ];

  // const { loading, data, run } = useRequest(
  //   createPayment({
  //     imageId: 1,
  //     method: 'VTCPAY',
  //     description: 'This is descriptionasd',
  //     isActive: true,
  //     display: 'OFF',
  //   }),
  //   {
  //     manual: true,
  //   },
  // );

  const { data: tableData } = useRequest(
    async (lastResult: any, params: string) => {
      // skip take
      // const result = privateRequest(axios.get | fetch | request.get, path, configs = { customHeaders, body, params});
      // const results2 = request(get, configs);
      // gop ket qua
      // tra ve ket qua
      return getAllPayment({
        page: 1,
        pageSize: 10,
        // SortBy: 'id' | 'method' | 'createdAt' | 'updatedAt',
        // orderby: 'ASC' | 'DESC',
        // method: 'string',
        // isActive: boolean,
        // display: 'ON' | 'OFF',
      });
    },
  );

  return (
    <section className={styles.Manage_payment_method}>
      <h1>QUẢN LÝ PHƯƠNG THỨC THANH TOÁN</h1>
      {/* <button onClick={run}>run</button> */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
        className={styles.table_white}
        rowKey={(record) => record.id}
      />
    </section>
  );
};
export default ManagementPaymentMethod;
