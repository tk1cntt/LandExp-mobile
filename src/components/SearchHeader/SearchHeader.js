import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';

import history from '../../history';
import s from './SearchHeader.css';

class SearchHeader extends React.Component {
  static propTypes = {
    cityLabel: PropTypes.string,
    actionType: PropTypes.string,
    handleOpenModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cityLabel: undefined,
    actionType: undefined,
  };

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
              <div className={s.citySelect}>
                Tìm {this.props.actionType === 'FOR_RENT' ? 'cho thuê' : 'mua'}{' '}
                tại {this.props.cityLabel}{' '}
                <Icon
                  type="down"
                  style={{ fontSize: '16px' }}
                  onClick={this.props.handleOpenModal}
                />
              </div>
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
