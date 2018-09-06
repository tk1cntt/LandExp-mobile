import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio } from 'antd';
import s from './ContactBody.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ContactBody extends React.Component {
  onChange = e => {
    console.log(`radio checked:${e.target.value}`); // eslint-disable-line
  };

  render() {
    return (
      <div className={s.body}>
        <div className="crf-cnfg slr-slctd small" data-uuid="95f2086c-b73f-4a5b-9487-fa17577616df">
          <div className={s.profileImg} />
          <div className="prfl-name-cnfg ib">
            <div className="prfl-name">Adesh Jain</div>
            <div className="prfl-type">Housing Select Agent</div>
            <div className="prfl-num">+91-XXXXXXXXXX</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ContactBody);
