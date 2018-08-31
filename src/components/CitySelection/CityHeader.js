import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';

import s from './CityHeader.css';

class CityHeader extends React.Component {
  render() {
    return (
      <div className={s.logo}>
        <Icon type="home" /> Land<font color="red">Exp</font>
      </div>
    );
  }
}

export default withStyles(s)(CityHeader);
