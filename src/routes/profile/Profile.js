/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Flex, NavBar } from 'antd-mobile';
import { Menu, Icon } from 'antd';

import Logo from 'components/Logo';

import history from '../../history';
import s from './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  onOpenChange = () => {
    const isOpen = this.state.open;
    this.setState({ open: !isOpen });
  };

  gotoPrevious = () => {
    history.go(-1);
  };

  gotoPage = link => () => {
    history.push(link);
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <NavBar
          icon={
            <Icon
              type="arrow-left"
              style={{ fontSize: 20 }}
              onClick={this.gotoPrevious}
            />
          }
          onLeftClick={this.onOpenChange}
          rightContent={
            <Icon type="search" onClick={this.gotoPage('/tim-kiem')} />
          }
        >
          <Logo />
        </NavBar>
        <div className="flex-container">
          <Flex>
            <Flex.Item>
              <div className="breadcrumb">Account center</div>
            </Flex.Item>
          </Flex>
          <Menu>
            <Menu.Item>
              <Icon type="book" />
              <span>Tin đăng của bạn</span>
            </Menu.Item>
            <Menu.Item>
              <Icon type="heart" />
              <span>Tin yêu thích</span>
            </Menu.Item>
            <Menu.Item>
              <Icon type="setting" />
              <span>Thông tin tài khoản</span>
            </Menu.Item>
            <Menu.Item>
              <Icon type="tool" />
              <span>Thay đổi mật khẩu</span>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Profile);
