import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import ContactBody from './ContactBody';

class ContactSeller extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    houseEntity: PropTypes.shape(PropTypes.object),
  };

  static defaultProps = {
    houseEntity: {},
  };

  render() {
    return (
      <Popup
        onClose={this.props.onClose}
        header="Contact seller"
        body={<ContactBody houseEntity={this.props.houseEntity} />}
      />
    );
  }
}

export default ContactSeller;
