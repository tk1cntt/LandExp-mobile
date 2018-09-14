import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TouchFeedback from 'rmc-feedback';
import { Icon } from 'antd';

import s from './Popup.css';

class Popup extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.node,
    body: PropTypes.node,
    footer: PropTypes.node,
    showBackButton: PropTypes.bool,
  };

  static defaultProps = {
    header: undefined,
    body: undefined,
    footer: undefined,
    showBackButton: true,
  };

  render() {
    const { showBackButton } = this.props;
    const backButton = showBackButton ? (
      <TouchFeedback>
        <div className={s.popupHeaderLeft}>
          <Icon
            type="arrow-left"
            style={{ fontSize: 20 }}
            onClick={this.props.onClose}
          />
        </div>
      </TouchFeedback>
    ) : null;
    return (
      <div className={s.popupContainer}>
        <div className={s.popupHeader}>
          {backButton} {this.props.header}
        </div>
        <div className={s.popupBody}>{this.props.body}</div>
        <div className={s.popupFooter}>{this.props.footer}</div>
      </div>
    );
  }
}

export default withStyles(s)(Popup);
