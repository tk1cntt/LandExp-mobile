import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import ContactSeller from 'components/ContactSeller';
import Logo from 'components/Logo';

import history from '../../history';

const TabPane = Tabs.TabPane; // eslint-disable-line

class Detail extends React.Component {
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
            <Flex.Item>{this.props.articleEntity.title}</Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/tin-tuc">Tin tức</Breadcrumb.Item>
              </Breadcrumb>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="md" />
          <Flex>
            <Flex.Item>
              <img
                src={`${SERVER_API_URL}/api/articles/${encodeId(
                  this.props.articleEntity.id,
                )}/avatar/${this.props.articleEntity.link}-${encodeId(
                  this.props.articleEntity.id,
                )}.jpg`}
              />
            </Flex.Item>
          </Flex>
          <div
            className="summary"
            dangerouslySetInnerHTML={{
              __html: this.props.articleEntity.summary,
            }}
          />
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: this.props.articleEntity.content,
            }}
          />
        </div>
      </div>
    );
  }
}

Detail.defaultProps = {
  articleEntity: {},
  // isAuthenticated: false,
};

Detail.propTypes = {
  // isAuthenticated: PropTypes.bool,
  articleEntity: PropTypes.shape(PropTypes.object),
};

const mapState = () => ({
  // isAuthenticated: state.session.isAuthenticated,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(Detail);
