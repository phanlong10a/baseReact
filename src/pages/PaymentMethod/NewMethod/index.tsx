import Dialog from '@/components/Dialog';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  Radio,
  Row,
  Skeleton,
} from 'antd';
import React, { useState } from 'react';
import { IImage } from '../interface';
import { getFile, IMethod } from '../services';
import styles from './index.less';
import InfiniteScroll from 'react-infinite-scroll-component';

interface INewMethod {
  handleSubmit?: (newMethod: IMethod) => typeof newMethod | void;
}
const NewMethod: React.FC<INewMethod> = ({ handleSubmit = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const initialValue = {
    imageId: '',
    method: '',
    description: '',
  };
  const [imagelist, setImagelist] = useState<IImage[]>([]);

  const {
    data: images,
    loading: loadingImages,
    run: GetImages,
  } = useRequest(getFile, {
    onSuccess: (res) => {
      setImagelist((imagelist) => imagelist.concat(res.data));
    },
  });

  const loadMoreData = () => {
    if (loadingImages) {
      return;
    }
    GetImages({
      page: Math.floor(imagelist.length / 10) + 1,
      pageSize: 10,
    });
  };
  return (
    <div>
      <header className={styles.header}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.button}
          onClick={() => {
            setVisible(true);
          }}
        >
          Thêm phương thức
        </Button>
      </header>
      {images && (
        <Dialog
          title="Thêm phương thức"
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
        >
          <Form
            layout="vertical"
            hideRequiredMark
            form={form}
            initialValues={initialValue}
            onFinish={(values) => {
              const newMethod = {
                ...values,
                isActive: true,
                display: 'ON',
              };
              handleSubmit(newMethod);
            }}
            onValuesChange={(value) => {
              console.log(value);
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <h3 className={styles.h3}>Hình ảnh</h3>
                <div className={styles.imagelist} id="scrollableDiv">
                  <Form.Item name="imageId" label="Tên phương thức">
                    <Radio.Group>
                      <InfiniteScroll
                        dataLength={imagelist.length}
                        next={loadMoreData}
                        hasMore={imagelist.length < images.total}
                        loader={
                          <Skeleton avatar paragraph={{ rows: 1 }} active />
                        }
                        endMessage={
                          <Divider plain>It is all, nothing more 🤐</Divider>
                        }
                        scrollableTarget="scrollableDiv"
                      >
                        <List
                          dataSource={imagelist}
                          renderItem={(item) => (
                            <label>
                              <List.Item
                                key={item.id}
                                className={styles.images}
                              >
                                <Radio value={item.id} />
                                <img src={item.url} />
                                <p>{item.originalname}</p>
                              </List.Item>
                            </label>
                          )}
                        />
                      </InfiniteScroll>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <Form.Item name="method" label="Tên phương thức">
                  <Input placeholder="Tên" />
                </Form.Item>
                <Form.Item name="description" label="Trạng thái hoạt động">
                  <Input placeholder="Tên" />
                </Form.Item>
              </Col>
            </Row>
            <div className={styles.addGroupButton}>
              <Button
                danger
                onClick={() => {
                  setVisible(false);
                  form.resetFields();
                }}
                className={styles.addButton}
              >
                huỷ
              </Button>
              <Button
                type="primary"
                className={styles.addButton}
                onClick={() => {
                  form.submit();
                }}
              >
                tạo mới
              </Button>
            </div>
          </Form>
        </Dialog>
      )}
    </div>
  );
};

export default NewMethod;
