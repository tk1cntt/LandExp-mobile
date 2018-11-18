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

  onChangeCascader = value => {
    this.setState({
      city: value
    });
    this.props.updateHouse({
      cityId: value[0],
      districtId: value[1],
      wardId: value[2]
    });
  }

  onChangeAddress = value => {
    this.setState({
      address: value
    });
    this.props.updateHouse({
      address: value
    });
  };

  onChangeMoney = values => {
    const { formattedValue, value } = values;
    this.setState({
      money: formattedValue,
    });
    this.props.updateHouse({
      money: value,
    });
  };

  onChangeCustomer = value => {
    this.setState({
      customer: value
    });
    this.props.updateHouse({
      customer: value
    });
  };

  onChangeMobile = value => {
    const reg = /^\d{1,11}$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        mobile: value
      });
      this.props.updateHouse({
        mobile: value
      });
    }
  };

  onChangeEmail = value => {
    this.setState({
      email: value
    });
    this.props.updateHouse({
      email: value
    });
  };

  onChangeZalo = e => {
    this.setState({
      zalo: e.target.value
    });
    this.props.updateHouse({
      zalo: e.target.value
    });
  };

  onChangeFacebook = e => {
    this.setState({
      facebook: e.target.value
    });
    this.props.updateHouse({
      facebook: e.target.value
    });
  };

  render() {
    // console.log(this.state);
    return (
      <div>
        <List renderHeader={() => 'Địa chỉ'}>
          <Picker
            extra="Chọn thành phố"
            value={this.state.city}
            // onChange={v => this.setState({ sValue: v })}
            data={this.state.locations}
            cols={3}
            // data={this.state.columnNumber === 1 ? this.state.cities : this.state.districts}
            // cols={this.state.columnNumber}
            // onPickerChange={this.onPickerChange}
            dismissText="Huỷ"
            okText="Chọn"
            onOk={this.onChangeCascader}
            // onDismiss={this.onPickerBack}
          >
            <List.Item arrow="horizontal">Thành phố</List.Item>
          </Picker>
          <InputItem
            type="text"
            placeholder="Số nhà, ngõ, ngách, phố"
            clear
            value={
              this.state.address || this.props.house.address
            }
            onChange={this.onChangeAddress}
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
              this.state.customer || this.props.house.customer
            }
            onChange={this.onChangeCustomer}
            moneyKeyboardAlign="left"
          />
          <InputItem
            type="text"
            placeholder="Số điện thoại"
            clear
            value={
              this.state.mobile || this.props.house.mobile
            }
            onChange={this.onChangeMobile}
            moneyKeyboardAlign="left"
          />
          <InputItem
            type="text"
            placeholder="Email"
            clear
            value={
              this.state.email || this.props.house.email
            }
            onChange={this.onChangeEmail}
            moneyKeyboardAlign="left"
          />
          <InputItem
            type="text"
            placeholder="Facebook"
            clear
            value={
              this.state.facebook || this.props.house.facebook
            }
            onChange={this.onChangeFaebook}
            moneyKeyboardAlign="left"
          />
          <InputItem
            type="text"
            placeholder="Zalo"
            clear
            value={
              this.state.zalo || this.props.house.zalo
            }
            onChange={this.onChangeZalo}
            moneyKeyboardAlign="left"
          />
        </List>
      </div>
    );
  }
}

export default withStyles(s)(StepThree);
