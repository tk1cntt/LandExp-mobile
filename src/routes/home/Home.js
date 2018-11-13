/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react/no-access-state-in-setstate */

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
      showModal: false,
      houseEntity: { actionType: 'FOR_SELL' },
    };
  }

  componentDidMount() {
    this.props.getTop(1, 8);
    // eslint-disable-next-line
    const cityLabel =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityLabel')
        : undefined;
    this.setState({
      cityLabel,
    });
    // eslint-disable-next-line
    const cityValue =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityValue')
        : undefined;
    this.setState({
      cityValue,
    });
    // eslint-disable-next-line
    const actionType =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('actionType')
        : undefined;
    this.setState({
      actionType,
    });
    // eslint-disable-next-line
    this.setState({
      showModal: cityValue === undefined || cityValue === null,
    });
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    window.localStorage.setItem('cityLabel', this.state.cityLabel);
    window.localStorage.setItem('cityValue', this.state.cityValue);
    window.localStorage.setItem('actionType', this.state.actionType);
  };

  gotoPage = link => {
    history.push(link);
  };

  updateHouse = houseEntity => {
    const nextHouse = { ...this.state.houseEntity, ...houseEntity };
    this.setState({
      cityLabel: nextHouse.userCity ? nextHouse.userCity.label : undefined,
      cityValue: nextHouse.userCity ? nextHouse.userCity.value : undefined,
      actionType: nextHouse.actionType,
      houseEntity: nextHouse,
    });
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <SearchHeader
          cityLabel={this.state.cityLabel}
          actionType={this.state.actionType}
          handleOpenModal={this.handleOpenModal}
        />
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
          <CitySelection
            updateHouse={this.updateHouse}
            onClose={this.handleCloseModal}
          />
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
