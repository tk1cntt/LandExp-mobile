import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';

import history from '../../history';
import s from './SearchHeader.css';

class SearchHeader extends React.Component {
  gotoPage = link => () => {
    history.push(link);
  };

  render() {
    return (
      <div>
        <div className={s.logo}>
          <Icon type="home" /> Land<font color="red">Exp</font>
        </div>
        <div className={s.searchHeader}>
          <div className={s.searchBody}>
            <div className={s.searchBoxContainer}>
              <span className={s.title} />
              <a className={s.citySelect} href="/?op=true">
                Tìm mua tại Hà Nội{' '}
                <Icon type="down" style={{ fontSize: '16px' }} />
              </a>
              <div
                className={s.dummyNearby}
                onClick={this.gotoPage('/tim-kiem')}
                onKeyPress={() => {}}
                tabIndex={0}
                role="button"
              >
                <div className={s.text}>
                  <Icon className={s.searchIcon} type="search" />
                  <span className="default-text">
                    {' '}
                    Tìm kiếm theo địa phương, địa danh ...{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchHeader);
