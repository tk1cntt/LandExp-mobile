/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Icon, Row, Col } from 'antd';

import s from './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className={s.footerContainer}>
          <Row>
            <Col span={8} className={cx(s.tab, s.tabActive)}>
              <Icon style={{ fontSize: 23 }} type="home" />
              <div className={s.text}>Home</div>
            </Col>
            <Col span={8} className={cx(s.tab)}>
              <Icon style={{ fontSize: 23 }} type="heart" />
              <div className={s.text}>Favourites</div>
            </Col>
            <Col span={8} className={cx(s.tab)}>
              <Icon style={{ fontSize: 23 }} type="user" />
              <div className={s.text}>Profile</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
