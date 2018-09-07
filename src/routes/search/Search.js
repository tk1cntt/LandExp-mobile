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
import { Icon } from 'antd';
import { Flex, NavBar } from 'antd-mobile';
import TouchFeedback from 'rmc-feedback';
import Link from 'components/Link';
import Tag from 'components/Tag';
import Footer from 'components/Footer';
import getTop from 'actions/getTop';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight, // eslint-disable-line
      message: 'not at bottom',
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.getTop(1, 8);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  handleScroll() {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body; // eslint-disable-line
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        message: 'bottom reached',
      });
    } else {
      this.setState({
        message: 'not at bottom',
      });
    }
  }

  gotoPage = () => {
    history.go(-1);
  }

  clearFilter = () => {
    console.log('Clear filter'); //eslint-disable-line
  }

  addFilter = () => {
    console.log('Add filter'); //eslint-disable-line
  }

  render() {
    console.log(this.state.message); // eslint-disable-line
    return (
      <div className="popup">
        <div className="popup-container">
          <div className="popup-header">
            <TouchFeedback>
              <div className="popup-header-left">
                <Icon
                  type="arrow-left"
                  style={{ fontSize: 20 }}
                  onClick={this.gotoPage}
                />
              </div>
            </TouchFeedback>
            <div className="popup-header-middle">
              Tìm kiếm
            </div>
            <TouchFeedback>
              <div className="popup-header-right">
                <Icon
                  type="reload"
                  style={{ fontSize: 20 }}
                  onClick={this.clearFilter}
                />
              </div>
            </TouchFeedback>
          </div>
          <div className="popup-body">
             <Tag title="Cầu Giấy" closable color="#5e23dc" />
             <Tag title="Thêm địa chỉ" addable onClick={this.addFilter}/>
          </div>
          <div className="popup-footer">{this.props.footer}</div>
        </div>
      </div>
    );
  }
}

Search.defaultProps = {
  // houseList: [],
  // heightScreen: 1000,
  // isAuthenticated: false,
};

Search.propTypes = {
  getTop: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  // heightScreen: PropTypes.number,
  // houseList: PropTypes.arrayOf(PropTypes.shape),
};

const mapState = () => ({
  // isAuthenticated: state.session.isAuthenticated,
  // heightScreen: state.setting.heightScreen,
  // houseList: state.top.top,
});

const mapDispatch = {
  getTop,
};

export default connect(
  mapState,
  mapDispatch,
)(Search);
