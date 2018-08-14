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
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Detail.css';

class Detail extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        Detail
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Detail));
