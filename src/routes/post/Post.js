/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable react/no-access-state-in-setstate */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Flex, NavBar, WhiteSpace } from 'antd-mobile';
import { Row, Col, Alert, Button, Breadcrumb, Tabs, Icon } from 'antd';

import Logo from 'components/Logo';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

import history from '../../history';

const TabPane = Tabs.TabPane; // eslint-disable-line

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      open: false,
      house: {},
      alerts: [],
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

  next = () => {
    this.setState({ alerts: [] });
    this.validateStep(this.state.current);
  };

  gotoPayment = () => {
    /*
    this.props.history.push(
      `/tai-khoan/thanh-toan/${encodePayment(this.props.payment.id)}`,
    );
    */
  };

  gotoPreview = () => {
    /*
    // Go to preview page
    // this.props.history.push(`/tai-khoan/xem-truoc-tin-dang/${encodeId(this.props.house.id)}`);
    this.props.history.push(
      `/bat-dong-san/${encodeId(this.props.house.id)}/xem-truoc-tin-dang`,
    );
    */
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  validateStep = id => {
    switch (id) {
      case 0:
        this.validateStepOne();
        break;
      case 1:
        this.validateStepTwo();
        break;
      case 2:
        this.validateStepThree();
        break;
      default:
        break;
    }
  };

  validateStepOne = () => {
    const alerts = [];
    const actionTypeValue =
      this.state.house.actionType || this.props.house.actionType;
    const actionTypeForm = actionTypeValue ? null : (
      <Row key="action-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải chọn một hình thức bán" />
        </Col>
      </Row>
    );
    alerts.push(actionTypeForm);
    const landTypeValue =
      this.state.house.landType || this.props.house.landType;
    const landTypeForm = landTypeValue ? null : (
      <Row key="land-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải chọn loại bất động sản" />
        </Col>
      </Row>
    );
    alerts.push(landTypeForm);
    this.setState({ alerts });
    if (actionTypeValue && landTypeValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  validateStepTwo = () => {
    const alerts = [];
    const acreageValue =
      this.state.house.acreage || this.props.house.acreage || null;
    const acreageForm = acreageValue ? null : (
      <Row key="city-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập diện tích nhà" />
        </Col>
      </Row>
    );
    alerts.push(acreageForm);
    this.setState({ alerts });
    if (acreageValue) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  validateStepThree = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  saveEntity = () => {
    const { house } = this.props;
    const entity = {
      ...house,
      ...this.state.house,
    };
    /*
    this.props.updateHouse(entity);
    if (entity.fileList) {
      entity.fileList.map(file => {
        if (file.photoId) {
          // this.props.updatePhoto({ id: file.photoId, image: realData, imageContentType: file.type, houseId: this.props.house.id });
        } else {
          const imageURL = file.thumbUrl;
          const block = imageURL.split(';');
          const realData = block[1].split(',')[1];
          this.props.createPhoto({ image: realData, imageContentType: file.type, houseId: this.props.house.id });
        }
      });
    }
    */
    this.next();
  };

  updateHouse = house => {
    const nextHouse = { ...this.state.house, ...house };
    console.log('updateHouse', nextHouse);
    this.setState({
      house: nextHouse,
    });
  };

  render() {
    const { house } = this.props;
    const entity = {
      ...house,
      ...this.state.house,
    };
    console.log('stepForm', entity);
    const steps = [
      {
        title: 'Hình thức',
        content: <StepOne house={entity} updateHouse={this.updateHouse} />,
      },
      {
        title: 'Đặc điểm',
        content: <StepTwo house={entity} updateHouse={this.updateHouse} />,
      },
      {
        title: 'Thông tin',
        content: <StepThree house={entity} updateHouse={this.updateHouse} />,
      },
      {
        title: 'Xác nhận',
        content: <StepFour house={entity} updateHouse={this.updateHouse} />,
      },
      {
        title: 'Hoàn tất',
        content: <StepFive house={entity} updateHouse={this.updateHouse} />,
      },
    ];
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
          <div>
            <div className="steps-content">
              {steps[this.state.current].content}
            </div>
            {this.state.alerts.map((item, index) => (
              <div
                className="steps-action"
                key={index}
                style={{ marginTop: 10 }}
              >
                {item}
              </div>
            ))}
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
  house: PropTypes.shape(PropTypes.object).isRequired,
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
