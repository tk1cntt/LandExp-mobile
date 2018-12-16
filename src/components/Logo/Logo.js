import React from 'react';
import { Icon } from 'antd';
import history from '../../history';

export default class Logo extends React.Component {
  gotoPage = () => {
    history.push("/");
  };

  render() {
    return (
      <div
        className="logo"
        onClick={this.gotoPage}
        // onKeyPress={() => {}}
        tabIndex={0}
        role="button"
      >
        <Icon type="home" /> Tin
        <font color="red">Vang</font>
      </div>
    );
  }
}
