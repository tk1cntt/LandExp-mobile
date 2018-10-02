import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './DistrictFilterHeader.css';

class DistrictFilterHeader extends React.Component {
  render() {
    return <div className={s.logo}>Tìm kiếm</div>;
  }
}

export default withStyles(s)(DistrictFilterHeader);
