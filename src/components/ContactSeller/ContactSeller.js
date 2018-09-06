import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import ContactBody from './ContactBody';

class ContactSeller extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Popup
        onClose={this.props.onClose}
        header="Contact seller"
        body={<ContactBody />}
      />
    );
  }
}

export default ContactSeller;
