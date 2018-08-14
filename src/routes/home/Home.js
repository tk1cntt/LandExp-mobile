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
import Link from 'components/Link';
import SideBar from 'components/Sidebar';
import getTop from 'actions/getTop';

import s from './Home.css';

class Home extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.getTop(1, 8);
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    console.log("this.props.heightScreen", this.props.heightScreen);
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
          style={{ minHeight: this.props.heightScreen ? this.props.heightScreen : 600 }}
          sidebar={<SideBar isAuthenticated={this.props.isAuthenticated} />}
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
                      <Card.Body>
                        <Link className="post-item" to={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}>
                          <div className="item-display">
                            <img src="/images/item-1.png" />
                            <div className="item-info">
                              <div href="#" className="like-button"><i className="fa fa-heart-o"></i></div>
                              <div className="title"><h3>{getLandType(house.landType)}</h3></div>
                              <p className="subtitle">{house.projectName}</p>
                              {house.actionType === 'FOR_SELL' ? <div className="type-sell">BÁN</div> : <div className="type-rent">CHO THUÊ</div>}
                              <div className="price" dangerouslySetInnerHTML={{ __html: getMoney(house.money, house.actionType) }} />
                              <div className="post-date">Ngày đăng <span>{house.createAt}</span></div>
                            </div>
                          </div>
                          <div className="property">
                            <span className="compact">{house.acreage} m2</span>
                            <span className="bedroom">{house.bedRoom}</span>
                            <span className="bathroom">{house.bathRoom}</span>
                            <span className="gara">{house.parking ? <i className="fa fa-check" /> : <i className="fa fa-times" />}</span>
                          </div>
                          <p className="location">Quận Hà Đông, Hà Nội</p>
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
  getTop: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  widthScreen: PropTypes.number.isRequired,
  heightScreen: PropTypes.number.isRequired,
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

const mapState = state => ({
  isAuthenticated: state.session.isAuthenticated,
  heightScreen: state.setting.heightScreen,
  widthScreen: state.setting.widthScreen,
  houseList: state.top.top,
});

const mapDispatch = {
  getTop,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Home));
