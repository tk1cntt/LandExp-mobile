import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TouchFeedback from 'rmc-feedback';

import s from './CityFooter.css';

class CityFooter extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  handleSumbit = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
    console.log('Handle submit'); // eslint-disable-line
  };

  render() {
    return (
      <div className={s.footer}>
        <TouchFeedback>
          <button className={s.submit} onClick={this.handleSumbit}>
            Submit
          </button>
        </TouchFeedback>
      </div>
    );
  }
}

export default withStyles(s)(CityFooter);
