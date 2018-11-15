import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'antd';
import {
  Checkbox,
  ImagePicker,
  TextareaItem,
  Picker,
  List,
  Stepper,
  InputItem,
} from 'antd-mobile';

import {
  showAcreageStreetSide,
  showNumberOfFloor,
  showBedRoom,
} from 'constants/utils';
import s from './StepThree.css';

const CheckboxItem = Checkbox.CheckboxItem;

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
const data = [];

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
      files: [],
      multiple: false,
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

  onChangeDirection = value => {
    this.setState({
      direction: value,
    });
    this.props.updateHouse({
      direction: value,
    });
  };

  onChangeDirectionBalcony = value => {
    this.setState({
      directionBalcony: value,
    });
    this.props.updateHouse({
      directionBalcony: value,
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

  onChangeImagePicker = (files, type, index) => {
    // const file = files.slice(-1).pop();
    switch (type) {
      case 'add':
        console.log("Add image", files);
        break;
      case 'remove':
        console.log("Remove image", this.state.files[index]);
        break;
    }
    this.setState({
      files,
    });
    this.props.updateHouse({
      files,
    });
  };

  render() {
    const directions = [
      {
        label: 'Đông',
        value: 'EAST',
      },
      {
        label: 'Tây',
        value: 'WEST',
      },
      {
        label: 'Nam',
        value: 'SOUTH',
      },
      {
        label: 'Bắc',
        value: 'NORTH',
      },
      {
        label: 'Đông Bắc',
        value: 'EAST_NORTH',
      },
      {
        label: 'Đông Nam',
        value: 'EAST_SOUTH',
      },
      {
        label: 'Tây Bắc',
        value: 'WEST_NORTH',
      },
      {
        label: 'Tây Nam',
        value: 'WEST_SOUTH',
      },
    ];
    return (
      <div>
        <List renderHeader={() => 'Thông tin ngôi nhà'}>
          <List.Item
            wrap
            extra={
              <InputItem
                type="number"
                placeholder="0"
                clear
                extra="m2"
                value={this.state.acreage || this.props.house.acreage}
                onChange={this.onChangeAcreage}
                moneyKeyboardAlign="left"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              />
            }
          >
            Diện tích
          </List.Item>
          {showAcreageStreetSide(this.props.house.landType) ? (
            <List.Item
              wrap
              extra={
                <InputItem
                  type="number"
                  placeholder="0"
                  clear
                  extra="m2"
                  value={
                    this.state.acreageStreetSide ||
                    this.props.house.acreageStreetSide
                  }
                  onChange={this.onChangeAcreageStreetSide}
                  moneyKeyboardAlign="left"
                  moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                />
              }
            >
              Mặt tiền
            </List.Item>
          ) : (
            ''
          )}
          {showBedRoom(this.props.house.landType) ? (
            <List.Item
              wrap
              extra={
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  min={1}
                  value={this.state.bedRoom || this.props.house.bedRoom}
                  onChange={this.onChangeBedRoom}
                />
              }
            >
              Phòng ngủ
            </List.Item>
          ) : (
            ''
          )}
          {showBedRoom(this.props.house.landType) ? (
            <List.Item
              wrap
              extra={
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  min={1}
                  value={this.state.bathRoom || this.props.house.bathRoom}
                  onChange={this.onChangeBathRoom}
                />
              }
            >
              Phòng tắm
            </List.Item>
          ) : (
            ''
          )}
          {this.props.house.landType === 'APARTMENT' ? (
            <List.Item
              wrap
              extra={
                <InputItem
                  type="number"
                  placeholder="0"
                  clear
                  value={this.state.floor || this.props.house.floor}
                  onChange={this.onChangeFloor}
                  moneyKeyboardAlign="left"
                  moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                />
              }
            >
              Tầng số
            </List.Item>
          ) : (
            ''
          )}
          {showNumberOfFloor(this.props.house.landType) ? (
            <List.Item
              wrap
              extra={
                <InputItem
                  type="number"
                  placeholder="0"
                  clear
                  value={
                    this.state.numberOfFloor || this.props.house.numberOfFloor
                  }
                  onChange={this.onChangeNumberOfFloor}
                  moneyKeyboardAlign="left"
                  moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                />
              }
            >
              {' '}
              Số tầng
            </List.Item>
          ) : (
            ''
          )}
          <Picker
            data={directions}
            cols={1}
            extra="Chọn hướng"
            dismissText="Huỷ"
            okText="Chọn"
            value={this.state.direction || this.props.house.direction}
            onChange={this.onChangeDirection}
            onOk={this.onChangeDirection}
          >
            <List.Item arrow="horizontal">Hướng nhà</List.Item>
          </Picker>
          {this.props.house.landType === 'APARTMENT' ? (
            <Picker
              data={directions}
              cols={1}
              extra="Chọn hướng"
              dismissText="Huỷ"
              okText="Chọn"
              value={
                this.state.directionBalcony || this.props.house.directionBalcony
              }
              onChange={this.onChangeDirectionBalcony}
              onOk={this.onChangeDirectionBalcony}
            >
              <List.Item arrow="horizontal">Hướng ban công</List.Item>
            </Picker>
          ) : (
            ''
          )}
        </List>
        <List renderHeader={() => 'Tiện nghi'}>
          <CheckboxItem key="1" onChange={e => console.log(e.target.checked)}>
            Có chỗ để xe ô tô
          </CheckboxItem>
        </List>
        <List renderHeader={() => 'Mô tả'}>
          <TextareaItem
            rows={3}
            placeholder="Thông tin mô tả ngôi nhà của ban"
          />
        </List>
        <List renderHeader={() => 'Hình ảnh mô tả ngôi nhà'}>
          <ImagePicker
            files={this.state.files}
            onChange={this.onChangeImagePicker}
            // onImageClick={(index, fs) => console.log('onImageClick', index, fs)}
            selectable={this.state.files.length < 7}
            multiple={this.state.multiple}
          />
        </List>
      </div>
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
