import React from 'react';
import { Icon } from 'antd';
import history from '../../history';

class Logo extends React.Component {
  gotoPage = (link) => {
    history.push(link);
  }

  render() {
    return (
      <div className="logo" onClick={this.gotoPage.bind(this, '/')}>
        <Icon type="home" /> Land<font color="red">Exp</font>
      </div>
    );
  }
}

export default Logo;
