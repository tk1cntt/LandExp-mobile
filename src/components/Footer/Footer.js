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
import TouchFeedback from 'rmc-feedback';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Icon, Row, Col } from 'antd';

import history from '../../history';
import Link from '../Link';
import s from './Footer.css';

class Footer extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
  };

  gotoPage = (link) => {
    history.push(link);
  };

  render() {
    const { activeTab } = this.props;
    const homeStyle = activeTab === 'home' ? cx(s.tab, s.tabActive) : cx(s.tab);
    const favoritesStyle = activeTab === 'favorites' ? cx(s.tab, s.tabActive) : cx(s.tab);
    const profileStyle = activeTab === 'profile' ? cx(s.tab, s.tabActive) : cx(s.tab);
    return (
      <div>
        <div className={s.footerContainer}>
          <Row>
            <Col span={8} className={homeStyle}>
              <Icon style={{ fontSize: 23 }} type="home" onClick={this.gotoPage.bind(this, '/')} />
              <div className={s.text}>Trang chủ</div>
            </Col>
            <Col span={8} className={favoritesStyle}>
              <Icon style={{ fontSize: 23 }} type="heart" onClick={this.gotoPage.bind(this, '/tai-khoang/tin-yeu-thich')} />
              <div className={s.text}>Yêu thích</div>
            </Col>
            <Col span={8} className={profileStyle}>
              <Icon style={{ fontSize: 23 }} type="user" onClick={this.gotoPage.bind(this, '/tai-khoan/thong-tin-ca-nhan')} />
              <div className={s.text}>Tài khoản</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
