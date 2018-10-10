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
import { Breadcrumb } from 'antd';
import ReactModal from 'react-modal';

import SearchFilter from 'components/SearchFilter';
import ContactSeller from 'components/ContactSeller';
import ListItem from 'components/ListItem';
import getTop from 'actions/getTop';

import s from './Sell.css';

class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showFilter: true,
      lastScrollPosition: 0,
      houseEntity: {},
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  state = {
    open: false,
  };

  componentDidMount() {
    // this.props.getTop(1, 8);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  onHandleContact = houseEntity => () => {
    this.setState({ showFilter: false });
    this.setState({ houseEntity });
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    this.setState({ showFilter: true });
  };

  handleScroll() {
    if (this.state.lastScrollPosition > window.pageYOffset) {
      this.setState({
        lastScrollPosition: window.pageYOffset,
      });
      this.setState({ showFilter: true });
    } else if (this.state.lastScrollPosition < window.pageYOffset) {
      this.setState({
        lastScrollPosition: window.pageYOffset,
      });
      this.setState({ showFilter: false });
    }
  }

  render() {
    const showSearchFilter = this.state.showFilter
      ? !this.state.showModal
      : false;
    return (
      <div className={s.container}>
        <SearchFilter visiable={showSearchFilter} />
        <div className={s.body}>
          <Breadcrumb className={s.breadcrumb}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
          {this.props.houseList.map(house => (
            <div key={`entity-${house.id}`}>
              <ListItem
                houseEntity={house}
                onHandleContact={this.onHandleContact}
              />
            </div>
          ))}
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          ariaHideApp={false}
          className="popup"
        >
          <ContactSeller
            houseEntity={this.state.houseEntity}
            onClose={this.handleCloseModal}
          />
        </ReactModal>
      </div>
    );
  }
}

Sell.defaultProps = {
  houseList: [],
  // heightScreen: 1000,
  // isAuthenticated: false,
};

Sell.propTypes = {
  getTop: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  // heightScreen: PropTypes.number,
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

const mapState = state => ({
  // isAuthenticated: state.session.isAuthenticated,
  // heightScreen: state.setting.heightScreen,
  // houseList: state.top.top,
});

const mapDispatch = {
  getTop,
};

export default withStyles(s)(
  connect(
    mapState,
    mapDispatch,
  )(Sell),
);
