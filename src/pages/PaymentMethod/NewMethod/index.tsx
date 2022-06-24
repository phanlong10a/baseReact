import Dialog from '@/components/Dialog';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  message,
  Radio,
  Row,
  Skeleton,
} from 'antd';
import React, { useState } from 'react';
import { IImage } from '../interface';
import { deleteFileId, getFile, getFileId, IMethod } from '../services';
import styles from './index.less';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewImage from './NewImage';
import Search from 'antd/lib/transfer/search';

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

  const { data: imageByID, run: GetImagesByID } = useRequest(getFileId, {
    manual: true,
    onSuccess: (res) => {
      if (res) {
        setImagelist([res]);
      } else setImagelist([]);
    },
  });
  const [deleteId, setDeleteID] = useState<number>();

  const { run: deleteImagesByID } = useRequest(deleteFileId, {
    manual: true,
    onSuccess: () => {
      message.success('delete success');
      setImagelist((imagelist) =>
        imagelist.filter((image) => image.id !== deleteId),
      );
    },
    onError: () => {
      message.error('delete error');
    },
  });

  const {
    data: images,
    loading: loadingImages,
    run: GetImages,
  } = useRequest(getFile, {
    onSuccess: (res) => {
      setImagelist((imagelist) => imagelist.concat(res?.data));
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

  const hasMore = () => {
    if (imagelist) {
      if (!imageByID) {
        return imagelist?.length < images?.total;
      }
    }
    return false;
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
          >
            <Row gutter={16}>
              <Col span={12}>
                <h3 className={styles.h3}>Hình ảnh</h3>
                <header className={styles.header}>
                  <Search
                    placeholder="search by id image"
                    onChange={(e) => {
                      // @ts-ignore
                      if (!!Number(e.target.value)) {
                        // @ts-ignore
                        GetImagesByID(Number(e.target.value));
                      } else {
                        setImagelist([]);
                        GetImages();
                      }
                    }}
                  />
                  <NewImage
                    onUpload={(image) => {
                      GetImagesByID(image.id);
                    }}
                  />
                </header>
                <div className={styles.imagelist} id="scrollableDiv">
                  <Form.Item name="imageId" className={styles.w_100}>
                    <Radio.Group className={styles.w_100}>
                      <InfiniteScroll
                        dataLength={imagelist.length}
                        next={loadMoreData}
                        hasMore={hasMore()}
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
                                <p>id image: {item.id}</p>
                                <DeleteOutlined
                                  className={styles.ml_auto}
                                  onClick={() => {
                                    setDeleteID(item.id);
                                    deleteImagesByID(item.id);
                                  }}
                                />
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
