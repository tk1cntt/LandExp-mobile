/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react/no-access-state-in-setstate */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';

import Tag from 'components/Tag';

import s from './DistrictFilterBody.css';

const districtAll = require('./districts.json');

class DistrictFilterBody extends React.Component {
  static propTypes = {
    updateHouse: PropTypes.func.isRequired,
    updateCity: PropTypes.func.isRequired,
    districts: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userDistrict: undefined,
      districts: undefined,
    };
  }

  componentDidMount() {
    const actionType =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('actionType')
        : undefined;
    const cityValue =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityValue')
        : undefined;
    const districtOfCity = cityValue ? districtAll[cityValue] : undefined;
    const cityLabel =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityLabel')
        : undefined;
    this.setState({
      cityLabel,
      actionType,
      districtOfCity,
    });
  }

  onChangeDistrict = e => {
    this.setState({
      userDistrict: e,
    });
    if (e === null) return;
    // let districts = this.state.districts || this.props.districts || [];
    let districts = []; // this.state.districts || this.props.districts || [];
    districts.push(e);
    districts = Array.from(
      districts.reduce((m, t) => m.set(t.id, t), new Map()).values(),
    );
    this.setState({
      districts,
    });
    this.props.updateHouse({
      districts,
    });
  };

  onClose = value => {
    const districts = this.state.districts || [];
    const index = districts.map(x => x.id).indexOf(value);
    districts.splice(index, 1);
    this.props.updateHouse({
      districts,
    });
    this.setState({
      districts,
      userDistrict: null,
    });
  };

  render() {
    const districtDom = [];
    const districts = this.state.districts || this.props.districts;
    const actionTypeText =
      this.state.actionType === 'FOR_SELL' ? 'mua' : 'cho thuê';
    districts.map(district =>
      districtDom.push(
        <Tag
          key={`district-id-${district.id}`}
          title={district.label}
          value={district.id}
          closable
          onClose={this.onClose}
          color="#5e23dc"
        />,
      ),
    );
    return (
      <div>
        <div className={s.title}>
          <span>Tìm {actionTypeText} bất động sản tại </span>
          <strong>{this.state.cityLabel}</strong>
          <div
            className={s.changeButton}
            onClick={this.props.updateCity}
            onKeyPress={() => {}}
            tabIndex={0}
            role="button"
          >
            <span>Đổi tỉnh thành</span>
          </div>
        </div>
        <div className={s.body}>
          <div className={s.selection}>
            {districtDom}
            <div>Cách chọn quận huyện</div>
            <div className={s.subtitle}>
              <i>{'(badinh -> Ba Đình, quan1 -> Quận 1)'}</i>
            </div>
            <div>
              <Select
                autoFocus
                isClearable
                value={this.state.userDistrict}
                onChange={this.onChangeDistrict}
                placeholder="Chọn một quận huyện"
                options={this.state.districtOfCity}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(DistrictFilterBody);
