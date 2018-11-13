import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Input, Radio, Checkbox } from 'antd';
import { InputItem } from 'antd-mobile';

import {
  showAcreageStreetSide,
  showNumberOfFloor,
  showBedRoom,
} from 'constants/utils';
import s from './StepThree.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const moneyKeyboardWrapProps = {};
/*
if (!window) {
  const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
  if (isIPhone) {
    moneyKeyboardWrapProps = {
      onTouchStart: e => e.preventDefault(),
    };
  }
}
*/

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acreage: null,
      acreageStreetSide: null,
      bedRoom: null,
      bathRoom: null,
      direction: null,
      directionBalcony: null,
      numberOfFloor: null,
      floor: null,
      parking: null,
      furniture: null,
      summary: '',
    };
  }

  onChangeAcreage = value => {
    this.setState({
      acreage: value,
    });
    this.props.updateHouse({
      acreage: value,
    });
  };

  onChangeAcreageStreetSide = value => {
    this.setState({
      acreageStreetSide: value,
    });
    this.props.updateHouse({
      acreageStreetSide: value,
    });
  };

  onChangeBedRoom = value => {
    this.setState({
      bedRoom: value,
    });
    this.props.updateHouse({
      bedRoom: value,
    });
  };

  onChangeBathRoom = value => {
    this.setState({
      bathRoom: value,
    });
    this.props.updateHouse({
      bathRoom: value,
    });
  };

  onChangeFloor = value => {
    this.setState({
      floor: value,
    });
    this.props.updateHouse({
      floor: value,
    });
  };

  onChangeNumberOfFloor = value => {
    this.setState({
      numberOfFloor: value,
    });
    this.props.updateHouse({
      numberOfFloor: value,
    });
  };

  onChangeDirection = e => {
    this.setState({
      direction: e.target.value,
    });
    this.props.updateHouse({
      direction: e.target.value,
    });
  };

  onChangeDirectionBalcony = e => {
    this.setState({
      directionBalcony: e.target.value,
    });
    this.props.updateHouse({
      directionBalcony: e.target.value,
    });
  };

  onChangeParking = e => {
    this.setState({
      parking: e.target.checked,
    });
    this.props.updateHouse({
      parking: e.target.checked,
    });
  };

  onChangeFurniture = e => {
    this.setState({
      furniture: e.target.checked,
    });
    this.props.updateHouse({
      furniture: e.target.checked,
    });
  };

  onChangeSummary = value => {
    this.setState({
      summary: value,
    });
    this.props.updateHouse({
      summary: value,
    });
  };

  render() {
    return (
      <Row>
        <Col span={24}>
          <p className="text-center subtitle">
            <i className="fa fa-lightbulb-o" />
            <em>
              {' '}
              Hãy cung cấp đầy đủ thông tin đặc điểm bất động sản của bạn!
            </em>
          </p>
        </Col>
        <Col span={24}>
          <InputItem
            type="number"
            placeholder="0"
            clear
            extra="m2"
            value={this.state.acreage || this.props.house.acreage}
            onChange={this.onChangeAcreage}
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >
            Diện tích
          </InputItem>
        </Col>
        {showAcreageStreetSide(this.props.house.landType) ? (
          <Col span={24}>
            <InputItem
              type="number"
              placeholder="0"
              clear
              extra="m2"
              value={this.state.acreage || this.props.house.acreage}
              onChange={this.onChangeAcreageStreetSide}
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >
              Mặt tiền
            </InputItem>
          </Col>
        ) : (
          ''
        )}
        {showBedRoom(this.props.house.landType) ? (
          <Col span={24}>
            <InputItem
              type="number"
              placeholder="0"
              clear
              value={this.state.bedRoom || this.props.house.bedRoom}
              onChange={this.onChangeBedRoom}
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >
              Phòng ngủ
            </InputItem>
          </Col>
        ) : (
          ''
        )}
        {showBedRoom(this.props.house.landType) ? (
          <Col span={24}>
            <InputItem
              type="number"
              placeholder="0"
              clear
              value={this.state.bathRoom || this.props.house.bathRoom}
              onChange={this.onChangeBathRoom}
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >
              Phòng tắm
            </InputItem>
          </Col>
        ) : (
          ''
        )}
        {this.props.house.landType === 'APARTMENT' ? (
          <Col span={24}>
            <InputItem
              type="number"
              placeholder="0"
              clear
              value={this.state.floor || this.props.house.floor}
              onChange={this.onChangeFloor}
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >
              Tầng số
            </InputItem>
          </Col>
        ) : (
          ''
        )}
        {showNumberOfFloor(this.props.house.landType) ? (
          <Col span={24}>
            <InputItem
              type="number"
              placeholder="0"
              clear
              value={this.state.numberOfFloor || this.props.house.numberOfFloor}
              onChange={this.onChangeNumberOfFloor}
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >
              Số tầng
            </InputItem>
          </Col>
        ) : (
          ''
        )}
        <Col span={24}>
          <div style={{ marginTop: 16 }}>
            <b>Hướng nhà</b>
          </div>
        </Col>
        <Col span={24}>
          <div style={{ marginTop: 16 }}>
            <RadioGroup
              onChange={this.onChangeDirection}
              value={this.state.direction || this.props.house.direction}
            >
              <RadioButton value="EAST">Đông</RadioButton>
              <RadioButton value="WEST">Tây</RadioButton>
              <RadioButton value="SOUTH">Nam</RadioButton>
              <RadioButton value="NORTH">Bắc</RadioButton>
              <RadioButton value="EAST_NORTH">Đông Bắc</RadioButton>
              <RadioButton value="EAST_SOUTH">Đông Nam</RadioButton>
              <RadioButton value="WEST_NORTH">Tây Bắc</RadioButton>
              <RadioButton value="WEST_SOUTH">Tây Nam</RadioButton>
            </RadioGroup>
          </div>
        </Col>
        {this.props.house.landType === 'APARTMENT' ? (
          <>
            <Col span={24}>
              <div style={{ marginTop: 16 }}>
                <b>Hướng ban công</b>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ marginTop: 16 }}>
                <RadioGroup
                  onChange={this.onChangeDirectionBalcony}
                  value={
                    this.state.directionBalcony ||
                    this.props.house.directionBalcony
                  }
                >
                  <RadioButton value="EAST">Đông</RadioButton>
                  <RadioButton value="WEST">Tây</RadioButton>
                  <RadioButton value="SOUTH">Nam</RadioButton>
                  <RadioButton value="NORTH">Bắc</RadioButton>
                  <RadioButton value="EAST_NORTH">Đông Bắc</RadioButton>
                  <RadioButton value="EAST_SOUTH">Đông Nam</RadioButton>
                  <RadioButton value="WEST_NORTH">Tây Bắc</RadioButton>
                  <RadioButton value="WEST_SOUTH">Tây Nam</RadioButton>
                </RadioGroup>
              </div>
            </Col>
          </>
        ) : (
          ''
        )}
        {showBedRoom(this.props.house.landType) ? (
          <>
            <Col span={24}>
              <div style={{ marginTop: 16 }}>
                <b>Tiện nghi</b>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ marginTop: 16 }}>
                <Checkbox
                  onChange={this.onChangeParking}
                  checked={this.state.parking || this.props.house.parking}
                >
                  Có chỗ để ôtô{' '}
                </Checkbox>
              </div>
            </Col>
          </>
        ) : (
          ''
        )}
      </Row>
    );
  }
}

StepTwo.defaultProps = {
  house: {},
};

StepTwo.propTypes = {
  updateHouse: PropTypes.func.isRequired,
  house: PropTypes.shape(PropTypes.object),
};

export default withStyles(s)(StepTwo);
