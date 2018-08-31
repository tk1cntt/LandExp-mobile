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
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import s from './Tag.css';

class Tag extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    closable: false,
    onClose() {},
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
    const { title, closable } = this.props;
    const closableDom = closable ? (
      <Icon onClick={this.onTagClose} className={s.iconClose} type="close" />
    ) : null;

    return !this.state.closed ? (
      <span className={cx(s.tag, s.headerTag)}>
        <div className={s.text}>{title}</div>
        <span>
          <div className={s.rippleParent} style={{ zIndex: 40 }}>
            <div className={s.ripple} />
          </div>
          {closableDom}
        </span>
      </span>
    ) : null;
  }
}

export default withStyles(s)(Tag);
