/* eslint-disable react/no-did-mount-set-state */

import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import DistrictFilterHeader from './DistrictFilterHeader';
import DistrictFilterBody from './DistrictFilterBody';
import DistrictFilterFooter from './DistrictFilterFooter';

class DistrictFilter extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    districts: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateHouse: PropTypes.func.isRequired,
    updateCity: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      footerDom: undefined,
    };
  }

  componentDidMount() {
    const footerDom =
      this.props.districts.length === 0 ? null : (
        <DistrictFilterFooter onClose={this.props.onClose} />
      );
    this.setState({
      footerDom,
    });
  }

  updateHouse = houseEntity => {
    const footerDom =
      houseEntity.districts.length === 0 ? null : (
        <DistrictFilterFooter onClose={this.props.onClose} />
      );
    this.setState({
      footerDom,
    });
    this.props.updateHouse(houseEntity);
  };

  render() {
    return (
      <Popup
        showBackButton={false}
        onClose={this.props.onClose}
        header={<DistrictFilterHeader />}
        body={
          <DistrictFilterBody
            updateHouse={this.updateHouse}
            updateCity={this.props.updateCity}
            districts={this.props.districts}
          />
        }
        footer={this.state.footerDom}
      />
    );
  }
}

export default DistrictFilter;
