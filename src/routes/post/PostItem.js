/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';

class PostItem extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.string,
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
            className={`drinkcard-cc ${this.props.style}`}
            htmlFor={this.props.value}
          />
        </div>
        <p>{this.props.label}</p>
      </div>
    );
  }
}

export default PostItem;
