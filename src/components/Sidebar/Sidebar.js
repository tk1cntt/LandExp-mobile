import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
import { Icon } from 'antd';
import Link from '../Link';

class SideBar extends React.Component {
  state = {
    isAuthenticated: false,
  }
  render() {
    return (
      <List>
        <List.Item arrow="horizontal" thumb={<Icon type="home" />}>
          <Link to="/">Trang chủ</Link>
        </List.Item>
        {this.state.isAuthenticated ? (
          ''
        ) : (
            <>
              <List.Item arrow="horizontal" thumb={<Icon type="user-add" />}>
                <Link to="/dang-ky">Đăng ký</Link>
              </List.Item>
              <List.Item arrow="horizontal" thumb={<Icon type="unlock" />}>
                <Link to="/dang-nhap">Đăng nhập</Link>
              </List.Item>
            </>
          )}
        <List.Item arrow="horizontal" thumb={<Icon type="edit" />}>
          <Link to="/tai-khoan/dang-tin">Đăng tin</Link>
        </List.Item>
        {!this.props.isAuthenticated ? (
          ''
        ) : (
            <List.Item arrow="horizontal" thumb={<Icon type="export" />}>
              <Link to="/thoat">Thoát</Link>
            </List.Item>
          )}
      </List>
    );
  }
}

const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(SideBar);
