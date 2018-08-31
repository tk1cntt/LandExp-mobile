import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import CityHeader from './CityHeader';
import CityBody from './CityBody';
import CityFooter from './CityFooter';

class CitySelection extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Popup
        showBackButton={false}
        onClose={this.props.onClose}
        header={<CityHeader />}
        body={<CityBody />}
        footer={<CityFooter />}
      />
    );
  }
}

export default CitySelection;
