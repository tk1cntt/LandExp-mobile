import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio, Row, Col } from 'antd';
import Select from 'react-select';

import PostItem from './PostItem';
import s from './StepOne.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class StepOne extends React.Component {
  static propTypes = {
    updateHouse: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      parameters: {
        actionType: 'FOR_SELL',
      },
    };
  }

  onChangeServiceType = e => {
    const parameters = { actionType: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
    // this.props.updateHouse(nextParameter);
  };

  onChangeItemActionType = e => {
    const actionType = {
      value: e.value,
      label: e.label,
    };
    const parameters = { actionType };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
    // this.props.updateHouse(nextParameter);
  };

  onChangeItemLandType = e => {
    const landType = {
      value: e.value,
      label: e.label,
    };
    const parameters = { landType };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
    // this.props.updateHouse(nextParameter);
  };

  render() {
    return (
      <div className={s.body}>
        <div className={s.selection}>
          <div className={s.title}>Nhu cầu của bạn là gì?</div>
          <Row
            className="cc-selector"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <Col span={12} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.actionType
                    ? this.state.parameters.actionType.value === 'FOR_SELL'
                    : false
                }
                value="FOR_SELL"
                style="sale"
                label="Bán bất động sản"
                onChange={this.onChangeItemActionType}
              />
            </Col>
            <Col span={12} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.actionType
                    ? this.state.parameters.actionType.value === 'FOR_RENT'
                    : false
                }
                value="FOR_RENT"
                style="rent"
                label="Cho thuê bất động sản"
                onChange={this.onChangeItemActionType}
              />
            </Col>
          </Row>
          <div className={s.title}>Chọn loại bất động sản bạn muốn bán</div>
          <Row
            className="cc-selector"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'APARTMENT'
                    : false
                }
                value="APARTMENT"
                style="aparment"
                label="Căn hộ chung cư"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'HOME'
                    : false
                }
                value="HOME"
                style="home"
                label="Nhà riêng"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'HOME_VILLA'
                    : false
                }
                value="HOME_VILLA"
                style="home-villa"
                label="Biệt thự"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value ===
                      'HOME_STREET_SIDE'
                    : false
                }
                value="HOME_STREET_SIDE"
                style="home-street-side"
                label="Nhà mặt phố"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'LAND_SCAPE'
                    : false
                }
                value="LAND_SCAPE"
                style="land-scape"
                label="Đất thổ cư"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'LAND_OF_PROJECT'
                    : false
                }
                value="LAND_OF_PROJECT"
                style="land-of-project"
                label="Đất dự án"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'LAND_FARM'
                    : false
                }
                value="LAND_FARM"
                style="land-farm"
                label="Đất nông nghiệp"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'LAND_RESORT'
                    : false
                }
                value="LAND_RESORT"
                style="land-resort"
                label="Resort"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'OFFICE'
                    : false
                }
                value="OFFICE"
                style="office"
                label="Văn phòng"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'WAREHOUSES'
                    : false
                }
                value="WAREHOUSES"
                style="warehouses"
                label="Kho, nhà xưởng"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'KIOSKS'
                    : false
                }
                value="KIOSKS"
                style="kiosks"
                label="Cửa hàng, Kiot"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  this.state.parameters.landType
                    ? this.state.parameters.landType.value === 'MOTEL_ROOM'
                    : false
                }
                value="MOTEL_ROOM"
                style="motel-room"
                label="Nhà trọ"
                onChange={this.onChangeItemLandType}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(StepOne);
