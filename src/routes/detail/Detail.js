/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

class Detail extends React.Component {
  static propTypes = {
    house: PropTypes.shape(PropTypes.object).isRequired,
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.props.house.title}
        {this.props.house.link}
      </div>
    );
  }
}
export default Detail;
