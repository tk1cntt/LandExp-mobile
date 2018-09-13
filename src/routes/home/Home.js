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
import { NoticeBar } from 'antd-mobile';
import ReactModal from 'react-modal';

import getTop from 'actions/getTop';
import HorizontalList from 'components/HorizontalList';
import SearchHeader from 'components/SearchHeader';
import Footer from 'components/Footer';
// import Tag from 'components/Tag';
import CitySelection from 'components/CitySelection';

import history from '../../history';

class Home extends React.Component {
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
        </div>
        <Footer activeTab="home" />
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

Home.defaultProps = {
  houseList: [],
  // heightScreen: 1000,
  // isAuthenticated: false,
};

Home.propTypes = {
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
)(Home);
