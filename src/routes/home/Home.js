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
import { WhiteSpace } from 'antd-mobile';
import getSession from 'actions/getSession';

import s from './Home.css';

const PlaceHolder = () => <div className={s.placeholder}>Block</div>;

const WhiteSpaceExample = () => (
  <div>
    <WhiteSpace size="xs" />
    <PlaceHolder />

    <WhiteSpace size="sm" />
    <PlaceHolder />

    <WhiteSpace />
    <PlaceHolder />

    <WhiteSpace size="lg" />
    <PlaceHolder />

    <WhiteSpace size="xl" />
    <PlaceHolder />
  </div>
);

class Home extends React.Component {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <WhiteSpaceExample />
          <h1>React.js News</h1>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  // loading: PropTypes.bool.isRequired,
  getSession: PropTypes.func.isRequired,
};

const mapState = () => ({});

const mapDispatch = {
  getSession,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Home));
