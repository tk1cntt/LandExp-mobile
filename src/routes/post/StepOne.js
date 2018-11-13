/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-access-state-in-setstate */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'antd';

import PostItem from './PostItem';
import s from './StepOne.css';

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parameters: {},
    };
  }

  onChangeItemActionType = e => {
    const actionType = e.value;
    const parameters = { actionType };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
    this.props.updateHouse(nextParameter);
  };

  onChangeItemLandType = e => {
    const landType = e.value;
    const parameters = { landType };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
    this.props.updateHouse(nextParameter);
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
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  (this.state.parameters.actionType ||
                    this.props.house.actionType) === 'FOR_SELL'
                }
                value="FOR_SELL"
                style="sale"
                label="Bán bất động sản"
                onChange={this.onChangeItemActionType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <PostItem
                checked={
                  (this.state.parameters.actionType ||
                    this.props.house.actionType) === 'FOR_RENT'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType ||
                    this.props.house.landType) === 'APARTMENT'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'HOME'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'HOME_VILLA'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'HOME_STREET_SIDE'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'LAND_SCAPE'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'LAND_OF_PROJECT'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'LAND_FARM'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'LAND_RESORT'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'OFFICE'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'WAREHOUSES'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'KIOSKS'
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
                  (this.state.parameters.landType ||
                    this.props.house.landType) === 'MOTEL_ROOM'
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

StepOne.defaultProps = {
  house: {},
};

StepOne.propTypes = {
  updateHouse: PropTypes.func.isRequired,
  house: PropTypes.shape(PropTypes.object),
};
export default withStyles(s)(StepOne);
