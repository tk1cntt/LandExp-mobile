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
import { Icon } from 'antd';
import { Flex, Card, Drawer, NavBar, WhiteSpace, NoticeBar } from 'antd-mobile';
import { getLandType, getMoney, encodeId } from 'constants/utils';
import Link from 'components/Link';
import SideBar from 'components/Sidebar';
import Footer from 'components/Footer';
import getTop from 'actions/getTop';

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
    return (
      <div style={{ height: '100%' }}>
        <NavBar
          icon={<Icon type="bars" />}
          onLeftClick={this.onOpenChange}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          <Link to="/">
            <img src="/images/logo.png" alt="" />
          </Link>
        </NavBar>
        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          Thông báo: Miễn phí đăng tin cho khách hàng đăng ký mới tài khoản
          trong tháng 8/2018
        </NoticeBar>
        <Drawer
          className="my-drawer"
          style={{
            minHeight: this.props.heightScreen,
          }}
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
            {this.props.houseList.map(house => (
              <div key={`entity-${house.id}`}>
                <Flex>
                  <Flex.Item>
                    <Card>
                      <Card.Body>
                        <Link
                          className="post-item"
                          to={`/bat-dong-san/${encodeId(house.id)}/${
                            house.link
                          }`}
                        >
                          <div className="item-display">
                            <img src="/images/item-1.png" alt="" />
                            <div className="item-info">
                              <div href="#" className="like-button">
                                <i className="fa fa-heart-o" />
                              </div>
                              <div className="title">
                                <h3>{getLandType(house.landType)}</h3>
                              </div>
                              <p className="subtitle">{house.projectName}</p>
                              {house.actionType === 'FOR_SELL' ? (
                                <div className="type-sell">BÁN</div>
                              ) : (
                                <div className="type-rent">CHO THUÊ</div>
                              )}
                              <div
                                className="price"
                                dangerouslySetInnerHTML={{
                                  __html: getMoney(
                                    house.money,
                                    house.actionType,
                                  ),
                                }}
                              />
                              <div className="post-date">
                                Ngày đăng <span>{house.createAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className="property">
                            <span className="compact">{house.acreage} m2</span>
                            <span className="bedroom">{house.bedRoom}</span>
                            <span className="bathroom">{house.bathRoom}</span>
                            <span className="gara">
                              {house.parking ? (
                                <i className="fa fa-check" />
                              ) : (
                                <i className="fa fa-times" />
                              )}
                            </span>
                          </div>
                          <p className="location">
                            {house.districtType} {house.districtName},{' '}
                            {house.cityName}
                          </p>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Flex.Item>
                </Flex>
                <WhiteSpace size="md" />
              </div>
            ))}
          </div>
          <Flex>
            <Flex.Item>
              <Footer />
            </Flex.Item>
          </Flex>
        </Drawer>
      </div>
    );
  }
}

Home.defaultProps = {
  houseList: [],
  heightScreen: 1000,
  isAuthenticated: false,
};

Home.propTypes = {
  getTop: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  heightScreen: PropTypes.number,
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

const mapState = state => ({
  isAuthenticated: state.session.isAuthenticated,
  heightScreen: state.setting.heightScreen,
  houseList: state.top.top,
});

const mapDispatch = {
  getTop,
};

export default connect(
  mapState,
  mapDispatch,
)(Home);
