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
import SideBar from 'components/Sidebar';

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

class Home extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.getSession();
    this.props.getTop(1, 8);
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    console.log("this.props.houseList", this.props.houseList); // eslint-disable-line
    return (
      <div style={{ height: '100%' }}>
        <NavBar icon={<Icon type="bars" />} onLeftClick={this.onOpenChange}>
          <Link to="/">
            <img src="/images/logo.png" alt="" />
          </Link>
        </NavBar>
        <SearchBar
          placeholder="Tìm kiếm thông tin nhà đất"
          onCancel={this.onSearch}
          cancelText="Tìm"
        />
        <Drawer
          className="my-drawer"
          style={{ minHeight: 600 }}
          sidebar={<SideBar />}
          contentStyle={{
            color: '#A6A6A6',
            textAlign: 'center',
            paddingTop: 10,
          }}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <div className="flex-container">
            {this.props.houseList.map((house, i) => (
              <div key={`entity-${i}`}>
                <Flex>
                  <Flex.Item>
                    <Card>
                      <Card.Header
                        title={`${house.districtType} ${house.districtName}, ${house.cityName}`}
                      />
                      <Card.Body>
                        <Link to={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}>
                          <div className="item-display">
                            <img src="/images/item-1.png" />
                            <div className="item-info">
                              <div className="title">{getLandType(house.landType)}</div>
                              <div className="price" dangerouslySetInnerHTML={{ __html: getMoney(house.money, house.actionType) }} />
                              <div className="property">
                                <span className="compact">{house.acreage}m2</span>
                                <span className="bedroom">{house.bedRoom}</span>
                                <span className="bathroom">{house.bathRoom}</span>
                                <span className="gara">{house.parking ? <i className="fa fa-check" /> : <i className="fa fa-times" />}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Flex.Item>
                </Flex>
                <WhiteSpace size="md" />
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    );
  }
}

Home.defaultProps = {
  houseList: [],
};

Home.propTypes = {
  // loading: PropTypes.bool.isRequired,
  getSession: PropTypes.func.isRequired,
  getTop: PropTypes.func.isRequired,
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

const mapState = state => ({
  houseList: state.top.top,
});

const mapDispatch = {
  getSession,
  getTop,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Home));
