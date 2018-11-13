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
      showModal: false,
      showContactFooter: true,
    };
    this.contactRef = React.createRef();
    this.scrollRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  handleScroll() {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const windowBottom = windowHeight + window.pageYOffset;
    if (
      windowBottom >=
      this.contactRef.current.offsetTop +
        this.contactRef.current.offsetHeight / 2
    ) {
      this.setState({
        showContactFooter: false,
      });
    } else {
      this.setState({
        showContactFooter: true,
      });
    }
  }

  houseAdressFull() {
    return (
      <>
        {this.props.houseEntity.address}, {this.props.houseEntity.wardType}{' '}
        {this.props.houseEntity.wardName}, {this.props.houseEntity.districtType}{' '}
        {this.props.houseEntity.districtName}, {this.props.houseEntity.cityName}
      </>
    );
  }

  houseContactButtonFooter() {
    const contactForm = this.state.showContactFooter
      ? this.houseContactButton()
      : null;
    return contactForm;
  }

  houseContactButton() {
    const contactButton = (
      <div className="contact-footer">
        <div
          className="contact-footer-button"
          onClick={this.handleOpenModal}
          onKeyPress={() => {}}
          tabIndex={0}
          role="button"
        >
          <div className="contact-title" />
          Liên hệ chủ nhà
        </div>
      </div>
    );
    return contactButton;
  }

  houseDetailForm() {
    return (
      <div className="product-info">
        <h1>{getLandType(this.props.houseEntity.landType)}</h1>
        <p className="post-date">{this.props.houseEntity.createAt}</p>
        <p
          className="price"
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: getMoney(
              this.props.houseEntity.money,
              this.props.houseEntity.actionType,
            ),
          }}
        />
        <div className="property">
          <p className="compact">
            Diện tích: <span>{this.props.houseEntity.acreage} m2</span>
          </p>
          <p className="compass">
            Hướng: <span>{getDirection(this.props.houseEntity.direction)}</span>
          </p>
          <p className="bedroom">
            Phòng ngủ: <span>{this.props.houseEntity.bedRoom}</span>
          </p>
          <p className="bathroom">
            Phòng tắm: <span>{this.props.houseEntity.bathRoom}</span>
          </p>
          <p className="gara">
            Chỗ để ô tô:{' '}
            <span>{this.props.houseEntity.parking ? 'Có' : 'Không'}</span>
          </p>
        </div>
        <div className="location">
          <span className="title">Địa chỉ:</span>
          <p>{this.houseAdressFull()}</p>
        </div>
        <div className="button-group">
          {/* eslint-disable-next-line */}
          <a href="#" className="like">
            <img src="/images/icon/like.png" alt="" />
            Yêu thích
          </a>
          {/* eslint-disable-next-line */}
          <a href="#" className="report">
            <img src="/images/icon/warning.png" alt="" />
            Báo xấu
          </a>
        </div>
      </div>
    );
  }

  houseContactForm() {
    return (
      <div className="contact-box" ref={this.contactRef}>
        <div className="contact">
          <h3>Chủ nhà</h3>
          <p>
            <i className="fa fa-user" /> {this.props.houseEntity.customer}
          </p>
          <p>
            <i className="fa fa-mobile" /> 09xxxxxxxxx
          </p>
          <p>
            <i className="fa fa-envelope-o" /> xxx@xxx.com
          </p>
          <div
            className="contact-footer-button"
            onClick={this.handleOpenModal}
            onKeyPress={() => {}}
            tabIndex={0}
            role="button"
          >
            <div className="contact-title" />
            Liên hệ chủ nhà
          </div>
        </div>
      </div>
    );
  }

  houseNearByForm() {
    const houseNearByForm =
      this.props.houseEntity.schools.length === 0 ? (
        ''
      ) : (
        <div>
          <Flex>
            <Flex.Item>
              <div className="location-search">
                <Tabs
                  defaultActiveKey="1"
                  style={{
                    border: '1px solid #dfdfdf',
                    padding: 10,
                    minHeight: 400,
                    maxHeight: 400,
                  }}
                >
                  <TabPane
                    tab={
                      <span>
                        <i className="fa fa-shopping-cart" /> Bệnh viện
                      </span>
                    }
                    key="1"
                    className="nearby"
                  >
                    {this.props.houseEntity.hospitals &&
                      this.props.houseEntity.hospitals.map(hospital => (
                        <div key={`restaurant-id-${hospital.title}`}>
                          {' '}
                          {/* eslint-disable-line */}
                          <div className="title">{hospital.title}</div>
                          <p style={{ padding: 5 }}>
                            {hospital.address}
                            <span>{humanize(hospital.distance / 1000)} km</span>
                          </p>
                        </div>
                      ))}
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <i className="fa fa-graduation-cap" /> Trường học
                      </span>
                    }
                    key="2"
                    className="nearby"
                  >
                    {this.props.houseEntity.schools &&
                      this.props.houseEntity.schools.map(school => (
                        <div key={`restaurant-id-${school.title}`}>
                          {' '}
                          {/* eslint-disable-line */}
                          <div className="title">{school.title}</div>
                          <p style={{ padding: 5 }}>
                            {school.address}
                            <span>{humanize(school.distance / 1000)} km</span>
                          </p>
                        </div>
                      ))}
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <i className="fa fa-home" /> Mua sắm
                      </span>
                    }
                    key="3"
                    className="nearby"
                  >
                    {this.props.houseEntity.restaurants &&
                      this.props.houseEntity.restaurants.map(restaurant => (
                        <div key={`restaurant-id-${restaurant.title}`}>
                          {' '}
                          {/* eslint-disable-line */}
                          <div className="title">{restaurant.title}</div>
                          <p style={{ padding: 5 }}>
                            {restaurant.address}
                            <span>
                              {humanize(restaurant.distance / 1000)} km
                            </span>
                          </p>
                        </div>
                      ))}
                  </TabPane>
                </Tabs>
              </div>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="md" />
        </div>
      );
    return <div>{houseNearByForm}</div>;
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
                <Breadcrumb.Item
                  href={`/tim-kiem?actionType=${
                    this.props.houseEntity.actionType
                  }`}
                >
                  <strong>
                    {getActionType(this.props.houseEntity.actionType)}
                  </strong>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="md" />
          <Flex>
            <Flex.Item>
              <Carousel autoplay infinite>
                {this.props.housePhotoList.map(file => (
                  <img
                    key={`id-${file.id}`}
                    src={`${SERVER_API_URL}/api/house-photos/${encodeId(
                      file.id,
                    )}/contents/${this.props.houseEntity.link}-${encodeId(
                      file.id,
                    )}.jpg`}
                    style={{ width: '100%', verticalAlign: 'top' }}
                    alt=""
                  />
                ))}
              </Carousel>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="md" />
          <Flex>
            <Flex.Item>{this.houseDetailForm()}</Flex.Item>
          </Flex>
          <WhiteSpace size="md" />
          <Flex>
            <Flex.Item>{this.houseContactForm()}</Flex.Item>
          </Flex>
          <WhiteSpace size="md" />
          {this.houseNearByForm()}
        </div>
        {this.houseContactButtonFooter()}
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          ariaHideApp={false}
          className="popup"
        >
          <ContactSeller
            houseEntity={this.props.houseEntity}
            onClose={this.handleCloseModal}
          />
        </ReactModal>
      </div>
    );
  }
}

Detail.defaultProps = {
  houseEntity: {},
  housePhotoList: [],
  // heightScreen: 1000,
  // isAuthenticated: false,
};

Detail.propTypes = {
  // isAuthenticated: PropTypes.bool,
  houseEntity: PropTypes.shape(PropTypes.object),
  housePhotoList: PropTypes.arrayOf(PropTypes.shape),
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
)(Detail);
