import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import NumberFormat from 'react-number-format';
import { Input, Radio } from 'antd';
import { Picker, List, InputItem, CheckboxItem } from 'antd-mobile';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { getPresent, getSaleType } from 'constants/utils';
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

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.city !== prevProps.city) {
      this.mappingCity();
    }
  }

  /*
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
  //*/

  mappingCity() {
    const districts = [];
    jsonData.map(city => {
      if (city.name === this.props.city) {
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
      districts,
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
  //*/

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

  onChangePresent = e => {
    this.setState({
      present: e.target.value
    });
    this.props.updateHouse({
      present: e.target.value
    });
  };

  onChangeSaleType = e => {
    this.setState({
      saleType: e.target.value
    });
    this.props.updateHouse({
      saleType: e.target.value
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
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
    // console.log(this.state);
    return (
      <div>
        <List renderHeader={() => 'Địa chỉ'}>
          <Picker
            extra="Chọn thành phố"
            value={this.state.city}
            // onChange={v => this.setState({ sValue: v })}
            // data={this.state.locations}
            data={this.state.districts}
            cols={2}
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
        <List renderHeader={() => 'Hỗ trợ sau mua bán'}>
          <RadioGroup
            style={{ paddingLeft: 20, paddingRight: 20 }}
            onChange={this.onChangePresent}
            value={this.state.present || this.props.house.present}
          >
            <Radio style={radioStyle} value={'NONE'}>
              {getPresent('NONE')}
            </Radio>
            <Radio style={radioStyle} value={'BASIC_FURNITURE'}>
              {getPresent('BASIC_FURNITURE')}
            </Radio>
            <Radio style={radioStyle} value={'FULL_FURNITURE'}>
              {getPresent('FULL_FURNITURE')}
            </Radio>
            <Radio style={radioStyle} value={'DISCOUNT_PRICE'}>
              {getPresent('DISCOUNT_PRICE')}
            </Radio>
            <Radio style={radioStyle} value={'SUPPORT_EXHIBIT'}>
              {getPresent('SUPPORT_EXHIBIT')}
            </Radio>
            <Radio style={radioStyle} value={'SUPPORT_FEE'}>
              {getPresent('SUPPORT_FEE')}
            </Radio>
            <Radio style={radioStyle} value={'HAVE_PRESENT'}>
              {getPresent('HAVE_PRESENT')}
            </Radio>
          </RadioGroup>
        </List>
        <List renderHeader={() => 'Gói tin đăng'}>
          <RadioGroup
            style={{ paddingLeft: 20, paddingRight: 20 }}
            onChange={this.onChangeSaleType}
            value={this.state.saleType || this.props.house.saleType}
          >
            1. Thông thường (Người mua quan tâm sẽ liên hệ trực tiếp với bạn)
            <Radio style={radioStyle} value={'SALE_BY_MYSELF'}>
              {getSaleType('SALE_BY_MYSELF')}
            </Radio>
            Được đăng tin vô thời giạn trên trang web
            <Radio style={radioStyle} value={'SALE_BY_MYSELF_VIP'}>
              {getSaleType('SALE_BY_MYSELF_VIP')}
            </Radio>
            Sẽ xuất hiện ưu tiên trên trang chủ và các trang tìm kiếm
            <br />
            2. Ký gửi (Chúng tôi hỗ trợ bán tận răng)
            <Radio style={radioStyle} value={'SALE_SUPPORT'}>
              {getSaleType('SALE_SUPPORT')}
            </Radio>
            Chúng tôi sẽ tìm kiếm khách hàng giúp bạn
            <Radio style={radioStyle} value={'SALE_SUPPORT_VIP'}>
              {getSaleType('SALE_SUPPORT_VIP')}
            </Radio>
            Sử dụng các nghiệp vụ marketing để bán được nhà của bạn hiệu quả nhất
            <br />
            Hoa hồng ký gửi: 0.5%/giá bán (Không quá 10 triệu VNĐ)
          </RadioGroup>
        </List>
        <List renderHeader={() => 'Thông tin liên hệ'}>
          <InputItem
            type="text"
            placeholder="Tên người bán"
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
