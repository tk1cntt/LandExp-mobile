/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TouchFeedback from 'rmc-feedback';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import s from './Tag.css';

class Tag extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    closable: PropTypes.bool,
    addable: PropTypes.bool,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    closable: false,
    color: '#c7ccd5',
    addable: false,
    onClose() {},
    onClick() {},
  };

  state = {
    closed: false,
  };

  onTagClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.setState({
      closed: true,
    });
  };

  render() {
    const { title, addable, closable } = this.props;
    const addableDom = addable ? (
      <TouchFeedback>
        <Icon className={s.iconAdd} type="plus" />
      </TouchFeedback>
    ) : null;
    const closableDom = closable ? (
      <TouchFeedback>
        <Icon onClick={this.onTagClose} className={s.iconClose} type="close" />
      </TouchFeedback>
    ) : null;
    const onClickHandle = addable ? (
      <div
        className={s.rippleParent}
        style={{ zIndex: 40 }}
        onClick={this.props.onClick}
        onKeyPress={() => {}}
        tabIndex={0}
        role="button"
      >
        <div className={s.ripple} />
      </div>
    ) : (
      <div className={s.rippleParent} style={{ zIndex: 40 }}>
        <div className={s.ripple} />
      </div>
    );
    return !this.state.closed ? (
      <span
        className={cx(s.tag, s.headerTag)}
        style={{ backgroundColor: this.props.color }}
      >
        <div className={s.text}>{title}</div>
        <span>
          {addableDom}
          {onClickHandle}
          {closableDom}
        </span>
      </span>
    ) : null;
  }
}

export default withStyles(s)(Tag);
