import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { InputItem } from 'antd-mobile';

import s from './ContactBody.css';

class ContactBody extends React.Component {
  static propTypes = {
    houseEntity: PropTypes.shape(PropTypes.object).isRequired,
  };

  onChange = e => {
    console.log(`radio checked:${e.target.value}`); // eslint-disable-line
  };

  render() {
    return (
      <div className={s.body}>
        <div className={s.title}>Thông tin người bán</div>
        <div className={s.card}>
          <div className={s.profileImg} />
          <div className={s.profileInfo}>
            <div className={s.profileName}>
              {this.props.houseEntity.customer}
            </div>
            <div className={s.profileType}>Chính chủ</div>
            <div className={s.profileNumber}>09xxxxxxxx</div>
          </div>
        </div>
        <div className={s.inputGroup}>
          <InputItem clear placeholder="Thông tin liên lạc">
            Liên hệ
          </InputItem>
          <InputItem type="phone" placeholder="09xxxxxxxxxx">
            Điện thoại
          </InputItem>
        </div>
        <button className={s.submit}>Nhận thông tin người bán</button>
      </div>
    );
  }
}

export default withStyles(s)(ContactBody);
