import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio, Row, Col } from 'antd';
import Select from 'react-select';

import PostItem from './PostItem';
import s from './StepThree.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class StepThree extends React.Component {
  static propTypes = {
    updateHouse: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.body}>
        <div className={s.selection}>Step three</div>
      </div>
    );
  }
}

export default withStyles(s)(StepThree);
