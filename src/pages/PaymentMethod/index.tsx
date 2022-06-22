import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, InputRef, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/lib/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
interface DataType {
  key: React.Key;
  name: string;
  method: string;
  active: boolean;
  images: string;
}
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Tên phương thức ` + Math.floor(Math.random() * (10 - 0)) + 0,
    method: 'Tên phương thức',
    active: Math.floor(Math.random() * (1 - 0)) + 0 ? true : false,
    images:
      'https://i.pinimg.com/236x/aa/60/07/aa60072bac86acb04821937bf8daff5f.jpg',
  });
}

const ManagementPaymentMethod: React.FC = () => {
  const { formatMessage } = useIntl();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  type DataIndex = keyof DataType;
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
  ): ColumnType<DataType> => ({
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
  const columns: ColumnsType<DataType> = [
    {
      title: formatMessage({ id: 'management_payment_method_table_name' }),
      dataIndex: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      onFilter: (value, record) => record.name.includes(String(value)),
      ...getColumnSearchProps('name'),
    },
    {
      title: formatMessage({ id: 'management_payment_method_table_image' }),
      dataIndex: 'images',
    },
    {
      title: formatMessage({ id: 'management_payment_method_table_edit' }),
      dataIndex: 'name',
      render: () => <DeleteOutlined className="pointer" />,
    },
  ];

  return (
    <section className={styles.Manage_payment_method}>
      <h1 className="mb-3">
        {formatMessage({ id: 'management_payment_method_title' })}
      </h1>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        className={styles.table_white}
      />
    </section>
  );
};
export default ManagementPaymentMethod;
