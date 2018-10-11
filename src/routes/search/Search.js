/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable react/no-did-mount-set-state */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio, Icon } from 'antd';
import TouchFeedback from 'rmc-feedback';
import ReactModal from 'react-modal';

import { getLandType, queryString } from 'constants/utils';
import Tag from 'components/Tag';
import CitySelection from 'components/CitySelection';
import DistrictFilter from 'components/DistrictFilter';

import history from '../../history';
import s from './Search.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionType: 'FOR_SELL',
      popupDom: undefined,
      districts: [],
      parameters: {},
    };
  }

  componentDidMount() {
    const cityLabel =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityLabel')
        : undefined;
    const cityValue =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityValue')
        : undefined;
    const actionType =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('actionType')
        : undefined;
    const parameters = { actionType, ...this.props.parameters };
    const nextParameter = { ...this.state.parameters, ...parameters };
    if (cityValue === undefined || cityValue === null) {
      history.push('/');
    } else {
      this.setState({
        cityLabel,
        cityValue,
        actionType,
        parameters: nextParameter,
      });
      const district = this.props.parameters.districtId
        ? {
            id: this.props.parameters.districtId,
            label: this.props.parameters.districtLabel,
          }
        : undefined;
      if (district === undefined) {
        this.handleAddFilter();
      } else {
        this.state.districts.push(district);
      }
    }
  }

  onClose = value => {
    const districts = this.state.districts || [];
    const index = districts.map(x => x.id).indexOf(value);
    districts.splice(index, 1);
    this.setState({
      districts,
    });
  };

  onLandTypeChange = e => {
    const parameters = { landType: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
  };

  onPriceChange = e => {
    const parameters = { money: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
  };

  onAcreageChange = e => {
    const parameters = { acreage: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
  };

  onBathRoomChange = e => {
    const parameters = { bathRoom: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
  };

  onBedRoomChange = e => {
    const parameters = { bedRoom: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
  };

  onSearchClick = () => {
    // history.push('/tim-mua-nha');
    const ids = [];
    const labels = [];
    this.state.districts.map(d => ids.push(d.id));
    this.state.districts.map(d => labels.push(d.label));
    const parameters = { districtId: ids, districtLabel: labels };
    const nextParameter = { ...this.state.parameters, ...parameters };
    const actionTypeText =
      this.state.actionType === 'FOR_SELL'
        ? '/tim-mua-nha'
        : '/tim-cho-thue-nha';
    history.push(`${actionTypeText}?${queryString(nextParameter)}`);
  };

  handleChangeCity = () => {
    const popupDom = (
      <ReactModal
        isOpen
        onRequestClose={this.handleChangeCityClose}
        ariaHideApp={false}
        className="popup"
      >
        <CitySelection
          updateHouse={this.updateCity}
          onClose={this.handleChangeCityClose}
        />
      </ReactModal>
    );
    this.setState({
      popupDom,
    });
  };

  handleAddFilter = () => {
    const popupDom = (
      <ReactModal
        isOpen
        onRequestClose={this.handleAddFilterClose}
        ariaHideApp={false}
        className="popup"
      >
        <DistrictFilter
          districts={this.state.districts}
          updateHouse={this.updateDistrict}
          updateCity={this.handleChangeCity}
          onClose={this.handleAddFilterClose}
        />
      </ReactModal>
    );
    this.setState({
      popupDom,
    });
  };

  handleAddFilterClose = () => {
    this.setState({
      popupDom: undefined,
    });
  };

  handleChangeCityClose = () => {
    this.setState({
      popupDom: undefined,
      districts: [], // Clear district data
    });
    window.localStorage.setItem('cityLabel', this.state.cityLabel);
    window.localStorage.setItem('cityValue', this.state.cityValue);
    window.localStorage.setItem('actionType', this.state.actionType);
  };

  updateCity = cityEntity => {
    const parameters = { actionType: cityEntity.actionType };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
      cityLabel: cityEntity.userCity ? cityEntity.userCity.label : undefined,
      cityValue: cityEntity.userCity ? cityEntity.userCity.value : undefined,
      actionType: cityEntity.actionType,
    });
  };

  updateDistrict = districtEntity => {
    this.setState({
      districts: districtEntity.districts,
    });
  };

  gotoPrevious = () => {
    history.go(-1);
  };

  clearFilter = () => {
    console.log('Clear filter'); //eslint-disable-line
  };

  searchButton() {
    const contactButton = (
      <div className="contact-footer">
        <div
          className="contact-footer-button"
          onClick={this.onSearchClick}
          onKeyPress={() => {}}
          tabIndex={0}
          role="button"
        >
          <div className="contact-title" />
          Tìm kiếm
        </div>
      </div>
    );
    return contactButton;
  }

  header() {
    return (
      <div className="popup-header">
        <TouchFeedback>
          <div className="popup-header-left">
            <Icon
              type="arrow-left"
              style={{ fontSize: 20 }}
              onClick={this.gotoPrevious}
            />
          </div>
        </TouchFeedback>
        <div className="popup-header-middle">Tìm kiếm</div>
        <TouchFeedback>
          <div className="popup-header-right">
            <Icon
              type="reload"
              style={{ fontSize: 20 }}
              onClick={this.clearFilter}
            />
          </div>
        </TouchFeedback>
      </div>
    );
  }

  body() {
    const districtDom = [];
    this.state.districts.map(district =>
      districtDom.push(
        <Tag
          key={`district-id-${district.id}`}
          title={district.label}
          value={district.id}
          onClose={this.onClose}
          closable
          color="#5e23dc"
        />,
      ),
    );
    const actionTypeText =
      this.state.actionType === 'FOR_SELL' ? 'mua' : 'cho thuê';
    return (
      <div className="popup-body">
        <div className={s.title}>
          <span>Tìm {actionTypeText} bất động sản tại </span>
          <strong>{this.state.cityLabel}</strong>
          <div
            className={s.changeButton}
            onClick={this.handleChangeCity}
            onKeyPress={() => {}}
            tabIndex={0}
            role="button"
          >
            <span>Đổi tỉnh thành</span>
          </div>
        </div>
        <div className={s.body}>
          {districtDom}
          <Tag title="Thêm địa chỉ" addable onClick={this.handleAddFilter} />
        </div>
        <div className={s.subTitle}>Loại bất động sản</div>
        <div className={s.body}>
          <RadioGroup
            onChange={this.onLandTypeChange}
            value={
              this.state.parameters.landType || this.props.parameters.landType
            }
          >
            <RadioButton value="APARTMENT">
              {getLandType('APARTMENT')}
            </RadioButton>
            <RadioButton value="HOME">{getLandType('HOME')}</RadioButton>
            <RadioButton value="HOME_VILLA">
              {getLandType('HOME_VILLA')}
            </RadioButton>
            <RadioButton value="HOME_STREET_SIDE">
              {getLandType('HOME_STREET_SIDE')}
            </RadioButton>
            <RadioButton value="LAND_SCAPE">
              {getLandType('LAND_SCAPE')}
            </RadioButton>
            <RadioButton value="LAND_OF_PROJECT">
              {getLandType('LAND_OF_PROJECT')}
            </RadioButton>
            <RadioButton value="LAND_FARM">
              {getLandType('LAND_FARM')}
            </RadioButton>
            <RadioButton value="LAND_RESORT">
              {getLandType('LAND_RESORT')}
            </RadioButton>
            <RadioButton value="MOTEL_ROOM">
              {getLandType('MOTEL_ROOM')}
            </RadioButton>
            <RadioButton value="OFFICE">{getLandType('OFFICE')}</RadioButton>
            <RadioButton value="WAREHOUSES">
              {getLandType('WAREHOUSES')}
            </RadioButton>
            <RadioButton value="KIOSKS">{getLandType('KIOSKS')}</RadioButton>
          </RadioGroup>
        </div>
        <div className={s.subTitle}>Khoảng giá</div>
        <div className={s.body}>
          <RadioGroup
            onChange={this.onPriceChange}
            value={this.state.parameters.money || this.props.parameters.money}
          >
            <RadioButton value="0">Bất kỳ</RadioButton>
            <RadioButton value="1">&lt; 500 triệu</RadioButton>
            <RadioButton value="2">500 triệu - 1 tỷ</RadioButton>
            <RadioButton value="3">1 - 1.5 tỷ</RadioButton>
            <RadioButton value="4">1.5 - 2 tỷ</RadioButton>
            <RadioButton value="5">&gt; 2 tỷ</RadioButton>
          </RadioGroup>
        </div>
        <div className={s.subTitle}>Diện tích</div>
        <div className={s.body}>
          <RadioGroup
            onChange={this.onAcreageChange}
            value={
              this.state.parameters.acreage || this.props.parameters.acreage
            }
          >
            <RadioButton value="0">Bất kỳ</RadioButton>
            <RadioButton value="1">&lt; 50 m2</RadioButton>
            <RadioButton value="2">50 - 80 m2</RadioButton>
            <RadioButton value="3">80 - 100 m2</RadioButton>
            <RadioButton value="4">100 - 200 m2</RadioButton>
            <RadioButton value="5">&gt; 200 m2</RadioButton>
          </RadioGroup>
        </div>
        <div className={s.subTitle}>Số phòng tắm</div>
        <div className={s.body}>
          <RadioGroup
            onChange={this.onBathRoomChange}
            value={
              this.state.parameters.bathRoom || this.props.parameters.bathRoom
            }
          >
            <RadioButton value="0">Bất kỳ</RadioButton>
            <RadioButton value="1">+1</RadioButton>
            <RadioButton value="2">+2</RadioButton>
            <RadioButton value="3">+3</RadioButton>
            <RadioButton value="4">+4</RadioButton>
            <RadioButton value="5">+5</RadioButton>
          </RadioGroup>
        </div>
        <div className={s.subTitle}>Số phòng ngủ</div>
        <div className={s.body}>
          <RadioGroup
            onChange={this.onBedRoomChange}
            value={
              this.state.parameters.bedRoom || this.props.parameters.bedRoom
            }
          >
            <RadioButton value="0">Bất kỳ</RadioButton>
            <RadioButton value="1">+1</RadioButton>
            <RadioButton value="2">+2</RadioButton>
            <RadioButton value="3">+3</RadioButton>
            <RadioButton value="4">+4</RadioButton>
            <RadioButton value="5">+5</RadioButton>
          </RadioGroup>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="popup">
        <div className="popup-container">
          {this.header()}
          {this.body()}
        </div>
        {this.searchButton()}
        {this.state.popupDom}
      </div>
    );
  }
}

Search.defaultProps = {
  parameters: {},
  // houseList: [],
  // heightScreen: 1000,
  // isAuthenticated: false,
};

Search.propTypes = {
  // getTop: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  // heightScreen: PropTypes.number,
  // houseList: PropTypes.arrayOf(PropTypes.shape),
  parameters: PropTypes.object,
};

const mapState = () => ({
  // isAuthenticated: state.session.isAuthenticated,
  // heightScreen: state.setting.heightScreen,
  // houseList: state.top.top,
});

const mapDispatch = {};

export default withStyles(s)(
  connect(
    mapState,
    mapDispatch,
  )(Search),
);
