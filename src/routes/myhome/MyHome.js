import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import { Flex, Carousel, NavBar, WhiteSpace } from 'antd-mobile';
import { Breadcrumb, Tabs, Icon } from 'antd';
import ReactModal from 'react-modal';

import {
  getActionType,
  getLandType,
  getDirection,
  getMoney,
  encodeId,
  humanize,
  SERVER_API_URL,
} from 'constants/utils';
import getTop from 'actions/getTop';
import ContactSeller from 'components/ContactSeller';
import Logo from 'components/Logo';

import history from '../../history';
import s from './MyHome.css';

const TabPane = Tabs.TabPane; // eslint-disable-line

class MyHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    this.props.getTop(1, 8);
  }

  onOpenChange = () => {
    const isOpen = this.state.open;
    this.setState({ open: !isOpen });
  };

  gotoPrevious = () => {
    history.go(-1);
  };

  gotoPage = link => () => {
    history.push(link);
  };

  houseListForm() {
    const houstListDom = this.props.houseList.map(house => (
      <div key={`entity-${house.id}`} className={cx(s.ib)}>
        <a
          className={cx(s.hListItem, s.ib)}
          data-key={2099224}
          href={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}
        >
          <div className={cx(s.imageSection, s.ib)}>
            <img
              className={cx(s.listImg)}
              src={`${SERVER_API_URL}/api/house-photos/${encodeId(
                house.id,
              )}/thumbnails.jpg`}
              alt={house.title}
              width="100"
              height="100"
            />
          </div>
          <div className={cx(s.contentSection, s.ib)}>
            <div className={cx(s.listHeading)}>
              {getLandType(house.landType)}
            </div>
            <div className={cx(s.listSubheading)}>{house.projectName}</div>
            <div className={cx(s.listLocality)}>
              {house.districtType} {house.districtName}
            </div>
            {house.actionType === 'FOR_SELL' ? (
              <div className={cx(s.typeSell)}>BÁN</div>
            ) : (
              <div className={cx(s.typeRent)}>CHO THUÊ</div>
            )}
            <div className={cx(s.listContent)}>
              <span
                className={cx(s.listPrice)}
                dangerouslySetInnerHTML={{
                  __html: getMoney(house.money, house.actionType),
                }}
              />
            </div>
          </div>
        </a>
      </div>
    ));
    return houstListDom;
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <NavBar
          icon={
            <Icon
              type="arrow-left"
              style={{ fontSize: 20 }}
              onClick={this.gotoPrevious}
            />
          }
          onLeftClick={this.onOpenChange}
          rightContent={
            <Icon type="search" onClick={this.gotoPage('/tim-kiem')} />
          }
        >
          <Logo />
        </NavBar>
        <div className="flex-container">
          <Flex>
            <Flex.Item>
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/">Tài khoản</Breadcrumb.Item>
                <Breadcrumb.Item href="/tin-tuc">Tin đăng của bạn</Breadcrumb.Item>
              </Breadcrumb>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="md" />
          {this.houseListForm()}
        </div>
      </div>
    );
  }
}

MyHome.defaultProps = {
  houseList: [],
  // isAuthenticated: false,
};

MyHome.propTypes = {
  getTop: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

const mapState = (state) => ({
  // isAuthenticated: state.session.isAuthenticated,
  houseList: state.top.top,
});

const mapDispatch = {
  getTop,
};

export default withStyles(s)(
  connect(
    mapState,
    mapDispatch,
  )(MyHome),
);
