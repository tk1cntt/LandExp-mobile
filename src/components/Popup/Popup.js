import React from 'react';
import PropTypes from 'prop-types';
import TouchFeedback from 'rmc-feedback';
import { Icon } from 'antd';

class Popup extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.node,
    body: PropTypes.node,
    footer: PropTypes.node,
  };

  static defaultProps = {
    header: undefined,
    body: undefined,
    footer: undefined,
  };

  render() {
    return (
      <div className="popup-container">
        <div className="popup-header">
          <TouchFeedback>
            <div className="popup-header-left">
              <Icon
                type="arrow-left"
                style={{ fontSize: 20 }}
                onClick={this.props.onClose}
              />
            </div>
          </TouchFeedback>{' '}
          {this.props.header}
        </div>
        <div className="popup-body">{this.props.body}</div>
        <div className="popup-footer">{this.props.footer}</div>
      </div>
    );
  }
}

export default Popup;
