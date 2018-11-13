/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, NavBar, WhiteSpace } from 'antd-mobile';
import { Steps, Button, Breadcrumb, Tabs, Icon } from 'antd';

import Link from 'components/Link';
import Logo from 'components/Logo';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

import history from '../../history';

const Step = Steps.Step;

const TabPane = Tabs.TabPane; // eslint-disable-line

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      open: false,
      house: {},
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

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  next = () => {
    // this.setState({ alerts: [] });
    // this.validateStep(this.state.current);
    const current = this.state.current + 1;
    this.setState({ current });
  };

  gotoPayment = () => {
    this.props.history.push(
      `/tai-khoan/thanh-toan/${encodePayment(this.props.payment.id)}`,
    );
  };

  gotoPreview = () => {
    // Go to preview page
    // this.props.history.push(`/tai-khoan/xem-truoc-tin-dang/${encodeId(this.props.house.id)}`);
    this.props.history.push(
      `/bat-dong-san/${encodeId(this.props.house.id)}/xem-truoc-tin-dang`,
    );
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  stepForm() {
    const steps = [
      {
        title: 'Hình thức',
        content: <StepOne house={{}} updateHouse={this.updateHouse} />,
      },
      {
        title: 'Vị trí',
        content: <StepTwo house={{}} updateHouse={this.updateHouse} />,
      },
      {
        title: 'Đặc điểm',
        content: <StepThree house={{}} updateHouse={this.updateHouse} />,
      },
    ];
    return (
      <div>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action" style={{ marginTop: 16 }}>
          {this.state.current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={this.prev}>
              Quay lại
            </Button>
          )}
          {this.state.current < steps.length - 2 && (
            <Button type="primary" onClick={this.next}>
              Tiếp tục
            </Button>
          )}
          {this.state.current === steps.length - 2 && (
            <Button type="primary" onClick={this.saveEntity}>
              Hoàn tất
            </Button>
          )}
          {this.state.current === steps.length - 1 && (
            <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={this.gotoPreview}
            >
              Xem trước tin đăng
            </Button>
          )}
          {this.state.current === steps.length - 1 && (
            <Button type="primary" onClick={this.gotoPayment}>
              Thanh toán
            </Button>
          )}
        </div>
      </div>
    );
  }

  updateHouse = house => {
    const nextHouse = { ...this.state.house, ...house };
    this.setState({
      house: nextHouse,
    });
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
          {this.stepForm()}
        </div>
      </div>
    );
  }
}

Post.defaultProps = {
  // heightScreen: 1000,
  // isAuthenticated: false,
};

Post.propTypes = {
  // isAuthenticated: PropTypes.bool,
  // houseEntity: PropTypes.shape(PropTypes.object).isRequired,
  // heightScreen: PropTypes.number,
};

const mapState = () => ({
  // isAuthenticated: state.session.isAuthenticated,
  // heightScreen: state.setting.heightScreen,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(Post);
