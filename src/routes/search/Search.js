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
import { Icon } from 'antd';
import { Flex, NavBar, Range } from 'antd-mobile';
import TouchFeedback from 'rmc-feedback';
import Link from 'components/Link';
import Tag from 'components/Tag';
import Footer from 'components/Footer';
import getTop from 'actions/getTop';
import s from './Search.css';

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
             <div className={s.title}>
                <span>Bạn đang tìm kiếm bất động sản tại </span>
                <strong>Hà Nội</strong>
                <a className={s.changeButton} href="/doi-tinh-thanh">
                  <span>Đổi tỉnh thành</span>
                </a>
             </div>
             <div className={s.body}>
                <Tag title="Cầu Giấy" closable color="#5e23dc" />
                <Tag title="Nam Từ Liêm" closable color="#5e23dc" />
                <Tag title="Bắc Từ Liêm" closable color="#5e23dc" />
                <Tag title="Hà Đông" closable color="#5e23dc" />
                <Tag title="Cầu Giấy" closable color="#5e23dc" />
                <Tag title="Thêm địa chỉ" addable onClick={this.addFilter}/>
             </div>
             <div className={s.filterTitle}>Giá nhà</div>
             <div className={s.filterBody}>
               <Range
                style={{ marginLeft: 30, marginRight: 30 }}
                min={0}
                max={10000000000}
                defaultValue={[1000000, 2000000000]}
               />
             </div>
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

export default withStyles(s)(connect(
  mapState,
  mapDispatch,
)(Search));
