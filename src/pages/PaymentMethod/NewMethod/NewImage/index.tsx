import openNotificationWithIcon from '@/components/Notification';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';
import { Button, Form, Upload } from 'antd';
import * as React from 'react';
import { createFile } from '../../services';
interface NewImageProps {}

const NewImage: React.FunctionComponent<NewImageProps> = () => {
  const { run: newIage } = useRequest(createFile, {
    manual: true,
    onSuccess: () => {
      openNotificationWithIcon('success', 'upload image success');
    },
    onError: () => {
      openNotificationWithIcon('error', 'upload image failed');
    },
  });
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      onValuesChange={(value) => {
        console.log(value.file.fileList[0].originFileObj);
        newIage(value.file.fileList[0].originFileObj);
        form.resetFields();
      }}
    >
      <Form.Item name="file">
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default NewImage;
