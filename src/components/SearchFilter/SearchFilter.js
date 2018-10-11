import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TouchFeedback from 'rmc-feedback';
import { Icon } from 'antd';
import { queryString } from 'constants/utils';

import Tag from '../Tag';
import history from '../../history';
import s from './SearchFilter.css';

class SearchFilter extends React.Component {
  static propTypes = {
    visiable: PropTypes.bool,
  };

  static defaultProps = {
    visiable: true,
  };

  gotoPage = () => {
    history.go(-1);
  };

  onClose = () => {
    console.log('District closed'); // eslint-disable-line
  };

  addFilter = () => {
    console.log('Add filter'); // eslint-disable-line
    const link = '/tim-kiem';
    history.push(`${link}?${queryString(this.props.queryString)}`);
  };

  render() {
    const district = {
      id: this.props.queryString.districtId,
      label: this.props.queryString.districtLabel,
    };
    const tagDom = district.label ? (
      <Tag
        title={district.label}
        value={district.id}
        onClose={this.onClose}
        closable
      />
    ) : null;
    const clss = this.props.visiable
      ? cx(s.filter)
      : cx(s.filter, s.hideFilter);
    return (
      <div className={clss}>
        <div className={s.filterHeader}>
          <TouchFeedback>
            <div className={s.filterHeaderLeft}>
              <Icon
                type="arrow-left"
                style={{ fontSize: 20 }}
                onClick={this.gotoPage}
              />
            </div>
          </TouchFeedback>
          <div className={s.filterHeaderMiddle}>
            <div className={s.filterHeaderDefaultText}>
              {tagDom}
              <Tag
                title="Lọc lại"
                addable
                color="#b7a9cc"
                onClick={this.addFilter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchFilter.defaultProps = {
  queryString: {},
};

SearchFilter.propTypes = {
  queryString: PropTypes.object,
};

export default withStyles(s)(SearchFilter);
