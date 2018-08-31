import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio } from 'antd';
import s from './CityBody.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class CityBody extends React.Component {
  onChange = e => {
    console.log(`radio checked:${e.target.value}`); // eslint-disable-line
  };

  render() {
    return (
      <div className={s.body}>
        <div className={s.selection}>
          <div className={s.title}>Nhu cầu của bạn là gì?</div>
          <div className={s.type}>
            <RadioGroup onChange={this.onChange} defaultValue="BUY">
              <RadioButton style={{ width: 150 }} value="BUY">
                Mua
              </RadioButton>
              <RadioButton style={{ width: 150 }} value="RENT">
                Thuê
              </RadioButton>
            </RadioGroup>
          </div>
          <div className={s.title}>Thành phố nổi tiếng</div>
          <div>
            <RadioGroup onChange={this.onChange} defaultValue="Hà Nội">
              <RadioButton value="Hà Nội">Hà Nội</RadioButton>
              <RadioButton value="Hồ Chí Minh">Hồ Chí Minh</RadioButton>
              <RadioButton value="Đà Nẵng">Đà Nẵng</RadioButton>
            </RadioGroup>
            <RadioGroup style={{ marginTop: 5 }} onChange={this.onChange}>
              <RadioButton value="Hải Phòng">Hải Phòng</RadioButton>
              <RadioButton value="Hải Dương">Hải Dương</RadioButton>
              <RadioButton value="Bắc Ninh">Bắc Ninh</RadioButton>
            </RadioGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CityBody);
