import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import styles from '../index.less';
import { getListBicycle } from '../service';
import { useDebounceFn } from 'ahooks';

const { Option } = Select;

interface PROPS {
  status: boolean;
  onCancel: () => void;
}

const CustomerDialog = (props: PROPS): JSX.Element => {
  const { status, onCancel } = props;
  const [listBicycle, setListBicycle] = useState([]);
  const intl = useIntl();

  useEffect(() => {
    const init = async () => {
      await setListSearch('');
    };
    init();
  }, []);

  const setListSearch = async (values: string) => {
    const req = await getListBicycle(values);
    setListBicycle(req.list);
  };

  console.log(listBicycle);

  const onFiltersChangeDebounce = useDebounceFn(
    async (values: string) => {
      await setListSearch(values);
    },
    {
      wait: 500,
    },
  );

  const onSearch = (values: string) => {
    onFiltersChangeDebounce.run(values);
  };

  return (
    <Modal
      title="Thêm mới trạm xe"
      centered
      visible={status}
      width={720}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        // onFinish={}
      >
        <Form.Item
          label={<FormattedMessage id="in" defaultMessage="Tên trạm xe" />}
          name="name"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'i',
                defaultMessage: 'Không được để trống trường này',
              }),
            },
          ]}
          normalize={(value) => value.trim()}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="in" defaultMessage="Vị trí" />}
          name="location"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'i',
                defaultMessage: 'Không được để trống trường này',
              }),
            },
          ]}
          normalize={(value) => value.trim()}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="in" defaultMessage="Số xe có trong trạm" />
          }
          name="bike_number"
        >
          <Select mode="multiple" allowClear onSearch={onSearch}>
            {listBicycle.map((item: any) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="in" defaultMessage="Số lượng chỗ đỗ xe" />
          }
          name="parking_number"
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <div className={styles.addGroupButton}>
          <Button danger className={styles.button}>
            Hủy
          </Button>
          <Button type="primary">Thêm mới</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerDialog;
