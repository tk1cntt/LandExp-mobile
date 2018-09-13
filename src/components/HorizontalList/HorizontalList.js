import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getLandType, getMoney, encodeId } from 'constants/utils';

import history from '../../history';
import s from './HorizontalList.css';

class HorizontalList extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  };

  gotoPage = link => {
    history.push(link);
  };

  houseListForm() {
    const houstListDom = this.props.houseList.map(house => (
      <div key={`entity-${house.id}`} className={cx(s.ib)}>
        <a
          className={cx(s.hListItem, s.ib)}
          data-key={2099224}
          href={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}
        >
          <div className={cx(s.imageSection, s.ib)}>
            <img
              className={cx(s.listImg)}
              style={{
                backgroundImage: 'url("/images/item-1.png")',
              }}
              alt={house.title}
            />
          </div>
          <div className={cx(s.contentSection, s.ib)}>
            <div className={cx(s.listHeading)}>
              {getLandType(house.landType)}
            </div>
            <div className={cx(s.listSubheading)}>{house.projectName}</div>
            <div className={cx(s.listLocality)}>
              {house.districtType} {house.districtName}
            </div>
            {house.actionType === 'FOR_SELL' ? (
              <div className={cx(s.typeSell)}>BÁN</div>
            ) : (
              <div className={cx(s.typeRent)}>CHO THUÊ</div>
            )}
            <div className={cx(s.listContent)}>
              <span
                className={cx(s.listPrice)}
                dangerouslySetInnerHTML={{
                  __html: getMoney(house.money, house.actionType),
                }}
              />
            </div>
          </div>
        </a>
      </div>
    ));
    return houstListDom;
  }

  render() {
    return (
      <div className={s.cardContent}>
        <div className={s.title}>
          <div className={cx(s.hlTitle, s.ib)}>
            <div>
              <div className={s.cardTitle}>{this.props.title}</div>
              <div className={s.cardSubtitle}>{this.props.subtitle}</div>
            </div>
          </div>
        </div>
        <div className={s.horizontalList}>{this.houseListForm()}</div>
      </div>
    );
  }
}

HorizontalList.defaultProps = {
  houseList: [],
};

HorizontalList.propTypes = {
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

export default withStyles(s)(HorizontalList);
