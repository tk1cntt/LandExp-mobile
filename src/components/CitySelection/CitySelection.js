import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import CityHeader from './CityHeader';
import CityBody from './CityBody';
import CityFooter from './CityFooter';

class CitySelection extends React.Component {
  static propTypes = {
    showActionButton: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    updateHouse: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Popup
        showBackButton={false}
        onClose={this.props.onClose}
        header={<CityHeader />}
        body={
          <CityBody
            showActionButton={this.props.showActionButton}
            updateHouse={this.props.updateHouse}
          />
        }
        footer={<CityFooter onClose={this.props.onClose} />}
      />
    );
  }
}

export default CitySelection;
