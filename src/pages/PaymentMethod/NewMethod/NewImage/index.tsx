import openNotificationWithIcon from '@/components/Notification';
import { ENVIRONMENTS } from '@/utils/constant';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';
import { Button, Form, message, Upload } from 'antd';
import { UploadProps } from 'antd/es/upload/interface';
import * as React from 'react';
import { API_FILE, createFile } from '../../services';
interface NewImageProps {
  onUpload?: () => void;
}

const NewImage: React.FunctionComponent<NewImageProps> = () => {
  const { run: newIage } = useRequest(createFile, {
    manual: true,
    onSuccess: (res) => {
      openNotificationWithIcon('success', 'upload image success');
      console.log(res[0]);
    },
    onError: () => {
      openNotificationWithIcon('error', 'upload image failed');
    },
  });
  const props: UploadProps = {
    onChange(info) {
      if (info.fileList[0].originFileObj) {
        newIage(info.fileList[0].originFileObj);
      }
    },
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default NewImage;
