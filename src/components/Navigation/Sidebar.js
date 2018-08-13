import React from 'react';
import { connect } from 'react-redux';
import {
  Drawer,
  SearchBar,
  List,
  NavBar,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';
import { Icon } from 'antd';
import Link from '../Link';

class SideBar extends React.Component {
  render() {
    return (
      <List>
        <List.Item arrow="horizontal" thumb={<Icon type="home" />}>
          <Link to="/">Trang chủ</Link>
        </List.Item>
        {this.props.isAuthenticated ? (
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

const mapStateToProps = storeState => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);
