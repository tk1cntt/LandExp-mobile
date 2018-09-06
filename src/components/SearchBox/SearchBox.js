import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import Tag from '../Tag';

class SearchBox extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Popup
        onClose={this.props.onClose}
        header={<Tag closable title="Search content" />}
      />
    );
  }
}

export default SearchBox;
