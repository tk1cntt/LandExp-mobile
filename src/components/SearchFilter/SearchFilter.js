import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TouchFeedback from 'rmc-feedback';
import { Icon } from 'antd';

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

  render() {
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
              <Tag title="Cầu Giấy" closable />
              <Tag title="Nam Từ Liêm" closable />
              <Tag title="Bắc Từ Liêm" closable />
              <Tag title="Hà Đông" closable />
              <Tag title="Cầu Giấy" closable />
              <Tag
                title="Thêm địa chỉ"
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

export default withStyles(s)(SearchFilter);
