import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio, Row, Col } from 'antd';
import Select from 'react-select';

import CityItem from './CityItem';
import s from './CityBody.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const options = require('./cities.json');

class CityBody extends React.Component {
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
    this.props.updateHouse(nextParameter);
  };

  onChangeItemLandType = e => {
    const userCity = {
      value: e.value,
      label: e.label,
    };
    const parameters = { userCity };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
    });
    this.props.updateHouse(nextParameter);
  };

  onChangeCity = e => {
    const parameters = { userCity: e };
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
          <div className={s.type}>
            <RadioGroup
              onChange={this.onChangeServiceType}
              defaultValue="FOR_SELL"
            >
              <RadioButton style={{ width: 150 }} value="FOR_SELL">
                Mua
              </RadioButton>
              <RadioButton style={{ width: 150 }} value="FOR_RENT">
                Thuê
              </RadioButton>
            </RadioGroup>
          </div>
          <div className={s.title}>Cách chọn một thành phố</div>
          <div className={s.subtitle}>
            <i>{'(hanoi -> Hà Nội, hochiminh -> Hồ Chí Minh)'}</i>
          </div>
          <div className={s.citySelected}>
            <Select
              autoFocus
              isClearable
              value={this.state.userCity}
              onChange={this.onChangeCity}
              placeholder="Chọn một thành phố"
              options={options}
            />
          </div>
          <div className={s.title}>Các thành phố nổi tiếng</div>
          <Row
            className="cc-selector"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <Col span={6} style={{ alignItems: 'center' }}>
              <CityItem
                checked={
                  this.state.userCity
                    ? this.state.userCity.value === 'hanoi'
                    : false
                }
                value="hanoi"
                label="Hà Nội"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <CityItem
                checked={
                  this.state.userCity
                    ? this.state.userCity.value === 'hochiminh'
                    : false
                }
                value="hochiminh"
                label="Hồ Chí Minh"
                onChange={this.onChangeItemLandType}
              />
            </Col>
            <Col span={6} style={{ alignItems: 'center' }}>
              <CityItem
                checked={
                  this.state.userCity
                    ? this.state.userCity.value === 'danang'
                    : false
                }
                value="danang"
                label="Đà Nẵng"
                onChange={this.onChangeItemLandType}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CityBody);
