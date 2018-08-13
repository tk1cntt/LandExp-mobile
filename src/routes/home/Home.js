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
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'components/Link';
import SideBar from 'components/SideBar';

import { Icon } from 'antd';
import {
  Flex,
  Card,
  Drawer,
  SearchBar,
  List,
  NavBar,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';
import {
  getActionType,
  getLandType,
  getCityType,
  getDirection,
  getPresent,
  getSaleType,
  getMoney,
  encodeId,
} from 'constants/utils';
import getSession from 'actions/getSession';
import getTop from 'actions/getTop';

import s from './Home.css';

const PlaceHolder = () => <div className={s.placeholder}>Block</div>;

const WhiteSpaceExample = () => (
  <div>
    <WhiteSpace size="xs" />
    <PlaceHolder />

    <WhiteSpace size="sm" />
    <PlaceHolder />

    <WhiteSpace />
    <PlaceHolder />

    <WhiteSpace size="lg" />
    <PlaceHolder />

    <WhiteSpace size="xl" />
    <PlaceHolder />
  </div>
);

class Home extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.getSession();
    this.props.getTop(1, 8);
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <NavBar icon={<Icon type="bars" />} onLeftClick={this.onOpenChange}>
          <Link to="/">
            <img src="/content/images/logo.png" />
          </Link>
        </NavBar>
        <SearchBar
          placeholder="Tìm kiếm thông tin nhà đất"
          onCancel={this.onSearch}
          cancelText="Tìm"
        />
        <Drawer
          className="my-drawer"
          style={{ minHeight: 300 }}
          contentStyle={{
            color: '#A6A6A6',
            textAlign: 'center',
            paddingTop: 10,
          }}
          sidebar={<SideBar />}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <div className="flex-container" />
        </Drawer>
      </div>
    );
  }
}

Home.propTypes = {
  // loading: PropTypes.bool.isRequired,
  getSession: PropTypes.func.isRequired,
  getTop: PropTypes.func.isRequired,
  houseList: PropTypes.array,
};

const mapState = state => ({
  // houseList: state.top.top,
});

const mapDispatch = {
  getSession,
  getTop,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Home));
