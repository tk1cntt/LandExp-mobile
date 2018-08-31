import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './CityFooter.css';

class CityFooter extends React.Component {
  render() {
    return (
      <div className={s.footer}>
        <div className={s.submit}>Submit</div>
      </div>
    );
  }
}

export default withStyles(s)(CityFooter);
