import { message, Breadcrumb } from 'antd';
import React, { useState, useRef } from 'react';
import { useRequest } from 'ahooks';
export default () => {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý trạm xe</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách trạm xe</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, minHeight: '240px' }}>trạm xe</div>
    </>
  );
};
