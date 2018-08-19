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
import { Flex, Drawer, NavBar, WhiteSpace } from 'antd-mobile';
import { Breadcrumb, Tabs, Icon } from 'antd';
import Link from 'components/Link';
import SideBar from 'components/Sidebar';
import Footer from 'components/Footer';

const TabPane = Tabs.TabPane; // eslint-disable-line

class Post extends React.Component {
  state = {
    open: false,
  };

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    console.log(this.props.houseEntity); // eslint-disable-line
    return (
      <div style={{ height: '100%' }}>
        <NavBar
          icon={<Icon type="bars" />}
          onLeftClick={this.onOpenChange}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          <Link to="/">
            <img src="/images/logo.png" alt="" />
          </Link>
        </NavBar>
        <Drawer
          className="my-drawer"
          style={{
            minHeight: this.props.heightScreen,
          }}
          contentStyle={{
            color: '#A6A6A6',
            textAlign: 'center',
            paddingTop: 10,
          }}
          sidebar={<SideBar isAuthenticated={this.props.isAuthenticated} />}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <div className="flex-container">
            <Flex>
              <Flex.Item>
                <Breadcrumb className="breadcrumb">
                  <Breadcrumb.Item>Tin bất động sản</Breadcrumb.Item>
                  <Breadcrumb.Item href="">
                    <strong>Đăng tin</strong>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Flex.Item>
            </Flex>
            <WhiteSpace size="md" />
            <Flex>
              <Flex.Item>
                <Footer />
              </Flex.Item>
            </Flex>
          </div>
        </Drawer>
      </div>
    );
  }
}

Post.defaultProps = {
  heightScreen: 1000,
  isAuthenticated: false,
};

Post.propTypes = {
  isAuthenticated: PropTypes.bool,
  houseEntity: PropTypes.shape(PropTypes.object).isRequired,
  heightScreen: PropTypes.number,
};

const mapState = state => ({
  isAuthenticated: state.session.isAuthenticated,
  heightScreen: state.setting.heightScreen,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(Post);
