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
import { Flex, Card, WhiteSpace, NoticeBar } from 'antd-mobile';
import ReactModal from 'react-modal';

import { getLandType, getMoney, encodeId } from 'constants/utils';
import Link from 'components/Link';
import HorizontalList from 'components/HorizontalList';
import SearchHeader from 'components/SearchHeader';
import Footer from 'components/Footer';
// import Tag from 'components/Tag';
import getTop from 'actions/getTop';
import CitySelection from 'components/CitySelection';

import history from '../../history';

class Rent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showModal: false,
      height: typeof window !== "undefined" ? window.innerHeight : 0, // eslint-disable-line
      message: 'not at bottom',
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

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

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleScroll() {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body; // eslint-disable-line
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        message: 'bottom reached',
      });
    } else {
      this.setState({
        message: 'not at bottom',
      });
    }
  }

  gotoPage = link => {
    history.push(link);
  };

  render() {
    console.log(this.state.message); // eslint-disable-line
    return (
      <div style={{ height: '100%' }}>
        <SearchHeader />

        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          Thông báo: Miễn phí đăng tin cho khách hàng đăng ký mới tài khoản
          trong tháng 8/2018
        </NoticeBar>

        <div className="flex-container dummy-footer">
          <HorizontalList
            houseList={this.props.houseList}
            title="Tin nhà đất tương tự"
            subtitle="Dựa trên các tin nhà đất bạn đã xem"
          />
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
            <Footer activeTab="List" />
          </Flex.Item>
        </Flex>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          ariaHideApp={false}
          className="popup"
        >
          <CitySelection onClose={this.handleCloseModal} />
        </ReactModal>
      </div>
    );
  }
}

Rent.defaultProps = {
  houseList: [],
  // heightScreen: 1000,
  // isAuthenticated: false,
};

Rent.propTypes = {
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

export default connect(
  mapState,
  mapDispatch,
)(Rent);
