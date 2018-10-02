/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';

class CityItem extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    checked: false,
    label: '',
    value: '',
  };

  onClick = () => {
    const obj = {
      value: this.props.value,
      label: this.props.label,
    };
    this.props.onChange(obj);
  };

  render() {
    const clss = this.props.checked ? 'image-item active' : 'image-item';
    return (
      <div className="image-block">
        <div className={clss}>
          <input
            checked={this.props.checked}
            id={this.props.value}
            type="radio"
            name="land-type"
            label={this.props.label}
            onChange={this.onClick}
          />
          <label
            className={`drinkcard-cc ${this.props.value}`}
            htmlFor={this.props.value}
          />
        </div>
        <p>{this.props.label}</p>
      </div>
    );
  }
}

export default CityItem;
