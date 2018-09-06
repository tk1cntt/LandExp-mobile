import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';

class ReportError extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return <Popup onClose={this.props.onClose} header="Report error" />;
  }
}

export default ReportError;
