import { useTranslate } from '@/utils/hooks/useTranslate';
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
  const { t } = useTranslate();

  const handleOk = () => {
    onOk(id);
  };
  return (
    <>
      <Modal
        title={t('manager_bike_stattion_title_delete')}
        visible={status}
        onOk={() => handleOk()}
        onCancel={onCancel}
      >
        <p>{t('manager_bike_stattion_content_delete')}</p>
      </Modal>
    </>
  );
};

export default ModalDelete;
