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
import { Icon } from 'antd';
import { Flex, Carousel, Drawer, NavBar, WhiteSpace } from 'antd-mobile';
import {
  getLandType,
  getDirection,
  getMoney,
  encodeId,
  SERVER_API_URL,
} from 'constants/utils';

import Link from 'components/Link';
import SideBar from 'components/Sidebar';

class Detail extends React.Component {
  state = {
    open: false,
  };

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  houseAdressFull() {
    return (
      <>
        {this.props.houseEntity.address}, {this.props.houseEntity.wardType}{' '}
        {this.props.houseEntity.wardName}, {this.props.houseEntity.districtType}{' '}
        {this.props.houseEntity.districtName}, {this.props.houseEntity.cityName}
      </>
    );
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
            Diện tích:<span>{this.props.houseEntity.acreage} m2</span>
          </p>
          <p className="compass">
            Hướng:<span>{getDirection(this.props.houseEntity.direction)}</span>
          </p>
          <p className="bedroom">
            Phòng ngủ:<span>{this.props.houseEntity.bedRoom}</span>
          </p>
          <p className="bathroom">
            Phòng tắm:<span>{this.props.houseEntity.bathRoom}</span>
          </p>
          <p className="gara">
            Chỗ để ô tô:<span>
              {this.props.houseEntity.parking ? 'Có' : 'Không'}
            </span>
          </p>
        </div>
        <div className="location">
          <span className="title">Địa chỉ</span>
          <p>{this.houseAdressFull()}</p>
        </div>
        <div className="button-group">
          {/* eslint-disable-next-line */}
          <a href="#" className="like">
            <img src="/images/icon/like.png" alt="" />Yêu thích
          </a>
          {/* eslint-disable-next-line */}
          <a href="#" className="report">
            <img src="/images/icon/warning.png" alt="" />Báo xấu
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <NavBar icon={<Icon type="bars" />} onLeftClick={this.onOpenChange}>
          <Link to="/">
            <img src="/images/logo.png" alt="" />
          </Link>
        </NavBar>
        <Drawer
          className="my-drawer"
          style={{
            minHeight: this.props.heightScreen ? this.props.heightScreen : 600,
          }}
          contentStyle={{
            color: '#A6A6A6',
            textAlign: 'center',
            paddingTop: 10,
          }}
          sidebar={<SideBar />}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <div className="flex-container">
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
          </div>
        </Drawer>
      </div>
    );
  }
}

Detail.propTypes = {
  houseEntity: PropTypes.shape(PropTypes.object).isRequired,
  housePhotoList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  heightScreen: PropTypes.number.isRequired,
};

const mapState = state => ({
  isAuthenticated: state.session.isAuthenticated,
  heightScreen: state.setting.heightScreen,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(Detail);
