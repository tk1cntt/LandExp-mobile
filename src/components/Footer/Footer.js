/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Collapse } from 'antd';

/* eslint-disable-next-line */
const Panel = Collapse.Panel;

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Collapse defaultActiveKey={['1']}>
          <Panel header="LandExp.com.vn" key="1">
            <p>Hotline office: 0909333333</p>
            <p>Email: office@landexp.com.vn</p>
            <p>Phone: 0220 383 9999</p>
            <p>
              Địa chỉ: Số 02, ngách 158/51 Nguyễn Khánh Toàn,<br /> P.Quan Hoa,
              Q.Cầu Giấy, TP.Hà Nội
            </p>
            <img src="/images/dadangky.png" alt="Bat dong san LandExp" />
          </Panel>
          <Panel header="Về chúng tôi" key="2">
            <ul>
              <li>
                {/* eslint-disable-next-line */}
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                {/* eslint-disable-next-line */}
                <a href="#">Giải pháp</a>
              </li>
              <li>
                {/* eslint-disable-next-line */}
                <a href="#">Đội ngũ nhân sự</a>
              </li>
              <li>
                {/* eslint-disable-next-line */}
                <a href="#">Liên hệ</a>
              </li>
            </ul>
          </Panel>
          <Panel header="Hỗ trợ" key="3">
            <ul>
              <li>
                {/* eslint-disable-next-line */}
                <a href="#">Dành cho người bán</a>
              </li>
              <li>
                {/* eslint-disable-next-line */}
                <a href="#">Dành cho người mua</a>
              </li>
              <li>
                {/* eslint-disable-next-line */}
                <a href="#">Chính sách hợp tác</a>
              </li>
            </ul>
          </Panel>
        </Collapse>
        <div className="info">
          <p className="link-app">
            {/* eslint-disable-next-line */}
            <a href="#">
              <img
                src="/images/icon/IOS.png"
                alt="Ung dung bat dong san cho android"
              />
            </a>
            {/* eslint-disable-next-line */}
            <a href="#">
              <img
                src="/images/icon/ANDROID.png"
                alt="Ung dung bat dong san cho ios"
              />
            </a>
          </p>
          <div className="social-icon">
            {/* eslint-disable-next-line */}
            <a href="#">
              <i className="fa fa-facebook" />
            </a>
            {/* eslint-disable-next-line */}
            <a href="#">
              <i className="fa fa-twitter" />
            </a>
            {/* eslint-disable-next-line */}
            <a href="#">
              <i className="fa fa-linkedin" />
            </a>
            {/* eslint-disable-next-line */}
            <a href="#">
              <i className="fa fa-youtube" />
            </a>
            {/* eslint-disable-next-line */}
            <a href="#">
              <i className="fa fa-google-plus" />
            </a>
          </div>
          <div className="copyright">
            <p>Copyright © 2018 LandExp. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
