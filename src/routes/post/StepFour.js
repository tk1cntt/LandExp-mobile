import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio, Row, Col, Spin } from 'antd';
import Select from 'react-select';

// import Loading from 'components/Loading';

import PostItem from './PostItem';
import s from './StepFour.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class StepFour extends React.Component {
  constructor(props) {
    super(props);
  }

  loading() {
    return (
      <div className="justify-content-center" style={{ minHeight: 300 }}>
        <Spin tip="Đang cập nhật dữ liệu..." />
      </div>
    );
  }

  notice() {
    if (this.props.error) {
      return (
        <div>
          <div>Đăng tin không thành công</div>
          <div>Xin hãy thử lại</div>
          <div>Chọn [Quay lại] sau đó chọn [Hoàn tất]</div>
        </div>
      );
    }

    return (
      <div className={s.selection}>
        <h3 className="text-center">
          <strong>Hoàn tất đăng tin</strong>
        </h3>
        <p>
          Bạn đã hoàn tất việc cung cấp thông tin đăng bán bất động sản trên
          website của chúng tôi.
        </p>
        <p>
          Bạn sẽ cần thanh toán khoản phí đăng tin 1 lần duy nhất, tin đăng của
          bạn sẽ được hiển thị trên website ngay. Chúng tôi sẽ bắt đầu hỗ trợ
          bán bất động sản của bạn bằng giải pháp tốt nhất và nhanh chóng nhất.
        </p>
        <p>
          Hãy chờ tin của chúng tôi!
          <br />
          Cảm ơn bạn đã tin tưởng.
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className={s.body}>
        {this.props.loading ? this.loading() : this.notice()}
      </div>
    );
  }
}

const mapState = state => ({
  house: state.house.house,
  error: state.house.error,
  loading: state.house.loading,
});

const mapDispatch = {};

export default withStyles(s)(
  connect(
    mapState,
    mapDispatch,
  )(StepFour),
);
