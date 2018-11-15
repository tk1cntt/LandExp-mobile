import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import NumberFormat from 'react-number-format';
import { Input } from 'antd';
import { Picker, List, InputItem } from 'antd-mobile';

import s from './StepThree.css';
import jsonData from './cities.json';

class StepThree extends React.Component {
  static propTypes = {
    updateHouse: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      money: null,
      locations: [],
      cities: [],
      districts: [],
      columnNumber: 1,
    };
  }

  componentDidMount() {
    this.mappingCity();
  }

  mappingCity() {
    const locations = [];
    jsonData.map(city => {
      const cityData = {
        value: city.id,
        label: city.name,
        children: [],
      };
      city.districts.map(district => {
        const districtData = {
          value: district.id,
          label: `${district.type} ${district.name}`,
          children: [],
        };
        district.wards.map(ward => {
          const wardData = {
            value: ward.id,
            label: `${ward.type} ${ward.name}`,
          };
          districtData.children.push(wardData);
        });
        cityData.children.push(districtData);
      });
      locations.push(cityData);
    });
    this.setState({
      locations,
    });
  }

  /*
  mappingCity() {
    const cities = this.state.cities;
    const firstCity = {
      value: 0,
      label: 'Chọn một thành phố',
      // children: [],
    };
    cities.push(firstCity);
    jsonData.map(city => {
      const cityData = {
        value: city.id,
        label: city.name,
        // children: [],
      };
      cities.push(cityData);
    });
    console.log('cities', cities);
    this.setState({
      cities,
    });
  }

  onPickerBack = value => {
    console.log('onPickerBack', value)
    const { cities } =  this.state;
    this.setState({
      data: cities,
      columnNumber: 1,
    });
  }

  onPickerChange = cityId => {
    if (this.state.columnNumber === 2) return;
    const districts = [];
    jsonData.map(city => {
      if (city.id === cityId[0]) {
        city.districts.map(district => {
          const districtData = {
            value: district.id,
            label: district.type + ' ' + district.name,
            children: []
          };
          district.wards.map(ward => {
            const wardData = {
              value: ward.id,
              label: ward.type + ' ' + ward.name
            };
            districtData.children.push(wardData);
          });
          districts.push(districtData);
        });
      }
    });
    this.setState({
      columnNumber: 2,
      districts,
    });
  };
  // */

  onPickerOk = value => {
    console.log('onPickerOk', value)
    this.setState({
      columnNumber: 1,
    });
  }

  onChangeMoney = values => {
    const { formattedValue, value } = values;
    this.setState({
      money: formattedValue,
    });
    this.props.updateHouse({
      money: value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <List renderHeader={() => 'Địa chỉ'}>
          <Picker
            extra="Chọn thành phố"
            value={this.state.sValue}
            onChange={v => this.setState({ sValue: v })}
            data={this.state.locations}
            cols={3}
            // data={this.state.columnNumber === 1 ? this.state.cities : this.state.districts}
            // cols={this.state.columnNumber}
            // onPickerChange={this.onPickerChange}
            dismissText="Huỷ"
            okText="Chọn"
            onOk={this.onPickerOk}
            // onDismiss={this.onPickerBack}
          >
            <List.Item arrow="horizontal">Thành phố</List.Item>
          </Picker>
          <InputItem
            type="text"
            placeholder="Số nhà, ngõ, ngách, phố"
            clear
            value={
              this.state.acreageStreetSide || this.props.house.acreageStreetSide
            }
            onChange={this.onChangeAcreageStreetSide}
            moneyKeyboardAlign="left"
          />
        </List>
        <List renderHeader={() => 'Giá tiền (VND)'}>
          <NumberFormat
            value={this.state.money || this.props.house.money}
            displayType="input"
            customInput={Input}
            thousandSeparator
            onValueChange={this.onChangeMoney}
          />
        </List>
        <List renderHeader={() => 'Thông tin liên hệ'}>
          <InputItem
            type="text"
            placeholder="Họ tên"
            clear
            value={
              this.state.acreageStreetSide || this.props.house.acreageStreetSide
            }
            onChange={this.onChangeAcreageStreetSide}
            moneyKeyboardAlign="left"
          />
          <InputItem
            type="text"
            placeholder="Số điện thoại"
            clear
            value={
              this.state.acreageStreetSide || this.props.house.acreageStreetSide
            }
            onChange={this.onChangeAcreageStreetSide}
            moneyKeyboardAlign="left"
          />
          <InputItem
            type="text"
            placeholder="Email"
            clear
            value={
              this.state.acreageStreetSide || this.props.house.acreageStreetSide
            }
            onChange={this.onChangeAcreageStreetSide}
            moneyKeyboardAlign="left"
          />
        </List>
      </div>
    );
  }
}

export default withStyles(s)(StepThree);
