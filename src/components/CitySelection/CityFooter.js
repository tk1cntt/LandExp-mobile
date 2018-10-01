import React from 'react';
import PropTypes from 'prop-types';

class CityFooter extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  handleSumbit = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="app-container">
        <div className="contact-footer">
          <div
            className="contact-footer-button"
            onClick={this.handleSumbit}
            onKeyPress={() => {}}
            tabIndex={0}
            role="button"
          >
            <div className="contact-title" />
            Chọn
          </div>
        </div>
      </div>
    );
  }
}

export default CityFooter;
