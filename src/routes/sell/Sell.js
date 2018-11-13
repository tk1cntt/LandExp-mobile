/* eslint-disable react/no-access-state-in-setstate */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Breadcrumb, Icon } from 'antd';
import ReactModal from 'react-modal';

import SearchFilter from 'components/SearchFilter';
import ContactSeller from 'components/ContactSeller';
import ListItem from 'components/ListItem';
import Link from 'components/Link';

import history from '../../history';
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
    window.addEventListener('scroll', this.handleScroll);
    const cityLabel =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityLabel')
        : undefined;
    const cityValue =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityValue')
        : undefined;
    if (cityValue === undefined || cityValue === null) {
      history.push('/');
    } else {
      this.setState({
        cityLabel,
      });
    }
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
        <SearchFilter
          queryString={this.props.queryString}
          visiable={showSearchFilter}
        />
        <div className={s.body}>
          <Breadcrumb className={s.breadcrumb}>
            <Breadcrumb.Item>
              <Link className={s.logo} to="/">
                <Icon type="home" /> Trang chủ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Bất động sản tại {this.state.cityLabel}
            </Breadcrumb.Item>
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
  queryString: {},
};

Sell.propTypes = {
  queryString: PropTypes.object,
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

const mapState = () => ({
  // isAuthenticated: state.session.isAuthenticated,
  // heightScreen: state.setting.heightScreen,
  // houseList: state.top.top,
});

const mapDispatch = {};

export default withStyles(s)(
  connect(
    mapState,
    mapDispatch,
  )(Sell),
);
