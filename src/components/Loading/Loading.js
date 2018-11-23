import React from 'react';
import { Spin } from 'antd';

class Loading extends React.Component {
  render() {
    return (
      <div className="justify-content-center" style={{ minHeight: 300 }}>
        <Spin tip="Đang cập nhật dữ liệu..." />
      </div>
    );
  }
}

export default Loading;
