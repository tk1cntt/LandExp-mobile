import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Flex, Carousel, NavBar, WhiteSpace } from 'antd-mobile';
import { Row, Col, Breadcrumb, Tabs, Icon } from 'antd';
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
import ContactSeller from 'components/ContactSeller';
import Logo from 'components/Logo';

import history from '../../history';
import s from './Articles.css';

const TabPane = Tabs.TabPane; // eslint-disable-line

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
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

  articleListForm() {
    const articleListDom = this.props.articleList.map(article => (
      <Col span={12} key={`entity-${article.id}`} className={cx(s.ib)}>
        <a
          className={cx(s.hListItem, s.ib)}
          data-key={2099224}
          href={`/tin-tuc/${encodeId(article.id)}/${article.link}`}
        >
          <div className={cx(s.imageSection, s.ib)}>
            <img
              className={cx(s.listImg)}
              src={`${SERVER_API_URL}/api/articles/${encodeId(
                article.id,
              )}/avatar/${article.link}-${encodeId(article.id)}.jpg`}
              width="170"
              height="130"
            />
            <div className={s.caption}>
              <div className={s.tag}>
                <p>{article.title}</p>
              </div>
            </div>
          </div>
        </a>
      </Col>
    ));
    return articleListDom;
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
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/tin-tuc">Tin tức</Breadcrumb.Item>
              </Breadcrumb>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="md" />
          <div className={s.container}>{this.articleListForm()}</div>
        </div>
      </div>
    );
  }
}

Articles.defaultProps = {
  // isAuthenticated: false,
};

Articles.propTypes = {
  // isAuthenticated: PropTypes.bool,
};

const mapState = () => ({
  // isAuthenticated: state.session.isAuthenticated,
});

const mapDispatch = {};

export default withStyles(s)(
  connect(
    mapState,
    mapDispatch,
  )(Articles),
);
