/* eslint-disable react/no-access-state-in-setstate */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import { Flex, NavBar, WhiteSpace } from 'antd-mobile';
import { Row, Col, Alert, Button, Breadcrumb, Tabs, Icon } from 'antd';
import ReactModal from 'react-modal';

import CitySelection from 'components/CitySelection';
import Logo from 'components/Logo';

import { encodePayment, encodeId } from 'constants/utils';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

import history from '../../history';
import updateHouse from '../../actions/updateHouse';
import createPhoto from '../../actions/createPhoto';

import s from './Post.css';

const TabPane = Tabs.TabPane; // eslint-disable-line

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      open: false,
      house: {
        // actionType: 'FOR_SELL',
        // landType: 'APARTMENT',
      },
      alerts: [],
    };
  }

  componentDidMount() {
    const cityLabel =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityLabel')
        : undefined;
    const cityValue =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('cityValue')
        : undefined;
    const actionType =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('actionType')
        : undefined;
    const parameters = { actionType, ...this.props.parameters };
    const nextParameter = { ...this.state.parameters, ...parameters };
    //*
    if (cityValue === undefined || cityValue === null) {
      history.push('/');
    } else {
      this.setState({
        cityLabel,
        cityValue,
        actionType,
        parameters: nextParameter,
      });
      /*
      const district = this.props.parameters.districtId
        ? {
            id: this.props.parameters.districtId,
            label: this.props.parameters.districtLabel,
          }
        : undefined;
      if (district === undefined) {
        this.handleAddFilter();
      } else {
        this.state.districts.push(district);
      }
      // */
    }
    //* /
  }

  handleChangeCity = () => {
    const popupDom = (
      <ReactModal
        isOpen
        onRequestClose={this.handleChangeCityClose}
        ariaHideApp={false}
        className="popup"
      >
        <CitySelection
          showActionButton={false}
          updateHouse={this.updateCity}
          onClose={this.handleChangeCityClose}
        />
      </ReactModal>
    );
    this.setState({
      popupDom,
    });
  };

  handleChangeCityClose = () => {
    this.setState({
      popupDom: undefined,
      districts: [], // Clear district data
    });
    window.localStorage.setItem('cityLabel', this.state.cityLabel);
    window.localStorage.setItem('cityValue', this.state.cityValue);
    window.localStorage.setItem('actionType', this.state.actionType);
  };

  updateCity = cityEntity => {
    const parameters = { actionType: cityEntity.actionType };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
      cityLabel: cityEntity.userCity ? cityEntity.userCity.label : undefined,
      cityValue: cityEntity.userCity ? cityEntity.userCity.value : undefined,
      actionType: cityEntity.actionType,
    });
  };

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
    //*
    history.push(`/tai-khoan/thanh-toan/${encodePayment(this.props.house.id)}`);
    //* /
  };

  gotoPreview = () => {
    //*
    // Go to preview page
    // this.props.history.push(`/tai-khoan/xem-truoc-tin-dang/${encodeId(this.props.house.id)}`);
    history.push(
      `/bat-dong-san/${encodeId(this.props.house.id)}/xem-truoc-tin-dang`,
    );
    //* /
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
        const current = this.state.current + 1;
        this.setState({ current });
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
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  };

  validateStepThree = () => {
    const alerts = [];
    const cityValue = this.state.house.cityId || this.props.house.cityId;
    const cityForm = cityValue ? null : (
      <Row key="city-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải chọn một tỉnh thành" />
        </Col>
      </Row>
    );
    alerts.push(cityForm);
    const addressValue = this.state.house.address || this.props.house.address;
    const addressForm = addressValue ? null : (
      <Row key="address-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập địa chỉ" />
        </Col>
      </Row>
    );
    alerts.push(addressForm);
    const moneyValue = this.state.house.money || this.props.house.money;
    const moneyForm = moneyValue ? null : (
      <Row key="money-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập giá bán ngôi nhà" />
        </Col>
      </Row>
    );
    alerts.push(moneyForm);
    const saleTypeValue =
      this.state.house.saleType || this.props.house.saleType;
    const saleTypeForm = saleTypeValue ? null : (
      <Row key="sale-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải chọn một gói tin đăng" />
        </Col>
      </Row>
    );
    alerts.push(saleTypeForm);
    const customerValue =
      this.state.house.customer || this.props.house.customer;
    const customerForm = customerValue ? null : (
      <Row key="customer-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập tên người bán" />
        </Col>
      </Row>
    );
    alerts.push(customerForm);
    const mobileValue = this.state.house.mobile || this.props.house.mobile;
    const mobileForm = mobileValue ? null : (
      <Row key="mobile-type-value-alert">
        <Col md="12">
          <Alert type="error" message="Bạn phải nhập số điện thoại liên lạc" />
        </Col>
      </Row>
    );
    alerts.push(mobileForm);
    // //////////////////////////////////////////////////////////////////////////
    this.setState({ alerts });
    if (
      cityValue &&
      addressValue &&
      moneyValue &&
      saleTypeValue &&
      customerValue &&
      mobileValue
    ) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  };

  saveEntity = () => {
    const { house } = this.props;
    const entity = {
      ...house,
      ...this.state.house,
    };
    entity.direction = this.state.house.direction
      ? this.state.house.direction[0]
      : null;
    entity.directionBalcony = this.state.house.directionBalcony
      ? this.state.house.directionBalcony[0]
      : null;
    // console.log("saveEntity", entity);
    //*
    this.props.updateHouse(entity);
    if (entity.files) {
      entity.files.map(file => {
        if (file.photoId) {
          // this.props.updatePhoto({ id: file.photoId, image: realData, imageContentType: file.type, houseId: this.props.house.id });
        } else {
          const imageURL = file.url;
          const block = imageURL.split(';');
          const realData = block[1].split(',')[1];
          const imageData = {
            image: realData,
            imageContentType: file.file.type,
            houseId: this.props.house.id,
          };
          this.props.createPhoto(imageData);
        }
      });
    }
    //* /
    this.next();
  };

  updateHouse = house => {
    const nextHouse = { ...this.state.house, ...house };
    console.log('updateHouse', nextHouse); // eslint-disable-line
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
        content: (
          <StepThree
            city={this.state.cityLabel}
            house={entity}
            updateHouse={this.updateHouse}
          />
        ),
      },
      {
        title: 'Hoàn tất',
        content: <StepFour />,
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
              <div className="breadcrumb">Đăng tin</div>
            </Flex.Item>
          </Flex>
          <div className={s.title}>
            <span>Đang chọn đăng tin tại </span>
            <strong>{this.state.cityLabel}</strong>
            <div
              className={s.changeButton}
              onClick={this.handleChangeCity}
              onKeyPress={() => {}}
              tabIndex={0}
              role="button"
            >
              <span>Đổi tỉnh thành</span>
            </div>
          </div>
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
        {this.state.popupDom}
      </div>
    );
  }
}

Post.propTypes = {
  updateHouse: PropTypes.func.isRequired,
  createPhoto: PropTypes.func.isRequired,
};

const mapState = () => ({
  // isAuthenticated: state.session.isAuthenticated,
  // heightScreen: state.setting.heightScreen,
});

const mapDispatch = {
  updateHouse,
  createPhoto,
};

export default withStyles(s)(
  connect(
    mapState,
    mapDispatch,
  )(Post),
);
