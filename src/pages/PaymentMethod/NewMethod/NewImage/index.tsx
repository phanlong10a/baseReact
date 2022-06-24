import { ENVIRONMENTS } from '@/utils/constant';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';
import { Button, Form, message, Upload } from 'antd';
import { UploadProps } from 'antd/es/upload/interface';
import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import { IUploadImage } from '../../interface';
import { createFile } from '../../services';
interface NewImageProps {
  onUpload?: (image: IUploadImage) => typeof image | void;
}

const NewImage: React.FunctionComponent<NewImageProps> = ({
  onUpload = () => {},
}) => {
  const [file, setFile] = React.useState<UploadFile[]>([]);
  const { run: newIage } = useRequest(createFile, {
    manual: true,
    onSuccess: (res: IUploadImage[]) => {
      message.success('upload image success');
      onUpload(res[0]);
    },
    onError: () => {
      message.error('upload image failed');
    },
  });
  const props: UploadProps = {
    fileList: file,
    onChange(info) {
      if (info?.fileList[0]?.originFileObj) {
        newIage(info.fileList[0].originFileObj);
        info.fileList = [];
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
