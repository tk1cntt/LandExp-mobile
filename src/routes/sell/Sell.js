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
import { Breadcrumb } from 'antd';
import { Flex, Card, WhiteSpace } from 'antd-mobile';
import ReactModal from 'react-modal';

import { getLandType, getMoney, encodeId } from 'constants/utils';
import Link from 'components/Link';
import SearchFilter from 'components/SearchFilter';
import ContactSeller from 'components/ContactSeller';
import getTop from 'actions/getTop';

import s from './Sell.css';

class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showFilter: true,
      lastScrollPosition: 0,
      houseEntity: {},
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.getTop(1, 8);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  onHandleContact = houseEntity => () => {
    this.setState({ showFilter: false });
    this.setState({ houseEntity });
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    this.setState({ showFilter: true });
  };

  handleScroll() {
    if (this.state.lastScrollPosition > window.pageYOffset) {
      this.setState({
        lastScrollPosition: window.pageYOffset,
      });
      this.setState({ showFilter: true });
    } else if (this.state.lastScrollPosition < window.pageYOffset) {
      this.setState({
        lastScrollPosition: window.pageYOffset,
      });
      this.setState({ showFilter: false });
    }
  }

  render() {
    return (
      <div className={s.container}>
        <SearchFilter visiable={this.state.showFilter} />
        <div className={s.body}>
          <Breadcrumb className={s.breadcrumb}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
          {this.props.houseList.map(house => (
            <div key={`entity-${house.id}`}>
              <Flex>
                <Flex.Item>
                  <Card>
                    <Card.Body>
                      <Link
                        className="post-item"
                        to={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}
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
                                __html: getMoney(house.money, house.actionType),
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
                      </Link>
                      <div className="location">
                        {house.districtType} {house.districtName},{' '}
                        {house.cityName}
                        <div
                          className={s.contactBtn}
                          onClick={this.onHandleContact(house)}
                          onKeyPress={() => {}}
                          tabIndex={0}
                          role="button"
                        >
                          Contact
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Flex.Item>
              </Flex>
              <WhiteSpace size="md" />
            </div>
          ))}
          {this.props.houseList.map(house => (
            <div key={`entity-${house.id}`}>
              <Flex>
                <Flex.Item>
                  <Card>
                    <Card.Body>
                      <Link
                        className="post-item"
                        to={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}
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
                                __html: getMoney(house.money, house.actionType),
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
                      </Link>
                      <div className="location">
                        {house.districtType} {house.districtName},{' '}
                        {house.cityName}
                        <div
                          className={s.contactBtn}
                          onClick={this.onHandleContact(house)}
                          onKeyPress={() => {}}
                          tabIndex={0}
                          role="button"
                        >
                          Contact
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Flex.Item>
              </Flex>
              <WhiteSpace size="md" />
            </div>
          ))}
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          ariaHideApp={false}
          className="popup"
        >
          <ContactSeller
            houseEntity={this.state.houseEntity}
            onClose={this.handleCloseModal}
          />
        </ReactModal>
      </div>
    );
  }
}

Sell.defaultProps = {
  houseList: [],
  // heightScreen: 1000,
  // isAuthenticated: false,
};

Sell.propTypes = {
  getTop: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  // heightScreen: PropTypes.number,
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

const mapState = state => ({
  // isAuthenticated: state.session.isAuthenticated,
  // heightScreen: state.setting.heightScreen,
  houseList: state.top.top,
});

const mapDispatch = {
  getTop,
};

export default withStyles(s)(
  connect(
    mapState,
    mapDispatch,
  )(Sell),
);
