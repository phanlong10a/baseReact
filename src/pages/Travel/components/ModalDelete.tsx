import { Button, Modal } from 'antd';
import { useState } from 'react';

interface PROPS {
  id: any;
  status: boolean;
  onCancel: () => void;
  onOk: (id: any) => void;
}

const ModalDelete = (props: PROPS) => {
  const { status, id, onCancel, onOk } = props;

  const handleOk = () => {
    onOk(id);
  };
  return (
    <>
      <Modal
        title="Xác nhận xóa"
        visible={status}
        onOk={() => handleOk()}
        onCancel={onCancel}
      >
        <p>Xác nhận xóa trạm xe?</p>
      </Modal>
    </>
  );
};

export default ModalDelete;
